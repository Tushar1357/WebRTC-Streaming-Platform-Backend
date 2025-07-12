const {
  getRouters,
  createWebRtcTransport,
} = require("../services/mediasoup.service");
const { setStreamtoProducers, getProducersFromStream } = require("../utils/stream");

const handleConnections = (socket) => {
  socket.on("sfu-message", async (raw) => {
    let msg;
    try {
      msg = typeof raw === "string" ? JSON.parse(raw) : raw;
    } catch (err) {
      return socket.emit("sfu-error", "Malformed JSON");
    }

    try {
      switch (msg.action) {
        case "join": {
          const { streamKey } = msg.data;
          socket.join(streamKey);
          socket.to(streamKey).emit("sfu-message", {
            action: "new_user_joined",
            name: "Trial User",
          });
          break;
        }

        case "getRtpCapabilities": {
          const router = getRouters();
          socket.emit("sfu-message", {
            action: "rtpCapabilities",
            data: router.rtpCapabilities,
          });
          break;
        }

        case "createSendTransport": {
          const transport = await createWebRtcTransport();
          socket.sendTransport = transport;
          socket.emit("sfu-message", {
            action: "sendTransportCreated",
            data: {
              id: transport.id,
              iceParameters: transport.iceParameters,
              iceCandidates: transport.iceCandidates,
              dtlsParameters: transport.dtlsParameters,
            },
          });
          break;
        }

        case "connectSendTransport": {
          await socket.sendTransport.connect({ dtlsParameters: msg.data });
          break;
        }

        case "produce": {
          if (!socket.sendTransport)
            return socket.emit("sfu-error", "Send transport not ready");

          const producer = await socket.sendTransport.produce(msg.data);
          setStreamtoProducers(msg.data.streamKey, producer.id);

          socket.emit("sfu-message", {
            action: "produced",
            data: { producerId: producer.id },
          });

          socket.to(msg.data.streamKey).emit("sfu-message", {
            action: "new_producer_joined",
          });
          break;
        }

        case "createRecvTransport": {
          const transport = await createWebRtcTransport();
          socket.recvTransport = transport;
          socket.emit("sfu-message", {
            action: "recvTransportCreated",
            data: {
              id: transport.id,
              iceParameters: transport.iceParameters,
              iceCandidates: transport.iceCandidates,
              dtlsParameters: transport.dtlsParameters,
            },
          });
          break;
        }

        case "connectRecvTransport": {
          await socket.recvTransport.connect({ dtlsParameters: msg.data });
          break;
        }

        case "consume": {
          const producerIds = getProducersFromStream(msg.data.streamKey);
          if (!producerIds || !producerIds.length) {
            return socket
              .to(msg.data.streamKey)
              .emit("sfu-error", "No active producers");
          }

          for (const producerId of producerIds) {
            if (
              getRouters().canConsume({
                producerId,
                rtpCapabilities: msg.data.rtpCapabilities,
              })
            ) {
              const consumer = await socket.recvTransport.consume({
                producerId,
                rtpCapabilities: msg.data.rtpCapabilities,
                paused: false,
              });

              socket.emit("sfu-message", {
                action: "consumed",
                data: {
                  id: consumer.id,
                  producerId: consumer.producerId,
                  kind: consumer.kind,
                  rtpParameters: consumer.rtpParameters,
                },
              });
            }
          }
          break;
        }

        default:
          socket.emit("sfu-error", `Unknown action ${msg.action}`);
      }
    } catch (err) {
      console.error("SFU handler error:", err);
      socket.emit("sfu-error", err.message || "Internal error");
    }
  });
};

module.exports = handleConnections;
