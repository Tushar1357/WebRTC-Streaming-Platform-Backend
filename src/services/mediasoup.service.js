const mediasoup = require("mediasoup");
const { mediaCodecs } = require("../config/mediasoup.config");

let worker, router;

const initiateMediasoup = async () => {
  try {
    worker = await mediasoup.createWorker();
    router = await worker.createRouter({ mediaCodecs });
  } catch (error) {
    console.log("Error while initiating mediasoup", error?.message);
  }
};

const getRouters = () => router;

const createWebRtcTransport = async () => {
  const webRtcTransportOptions = {
    listenIps: [
      {
        ip: "0.0.0.0",
        announcedIp: "127.0.0.1",
      },
    ],
    enableUdp: true,
    enableTcp: true,
    preferUdp: true,
    initialAvailableOutgoingBitrate: 1000000,
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  };

  const transport = await getRouters().createWebRtcTransport(webRtcTransportOptions);

  return transport
};

module.exports = { initiateMediasoup, getRouters, createWebRtcTransport };
