const streamToRoom = new Map();

const streamToProducers = new Map();

const streamToConsumers = new Map();

const setStreamToRoom = (streamKey, socketRoom) => {
  if (streamToRoom.has(streamKey)) {
    return streamToRoom.get(streamKey);
  }
  streamToRoom.set(streamKey, socketRoom);
  return socketRoom;
};

const setStreamtoProducers = (streamKey, producerId) => {
  if (!streamToProducers.has(streamKey)) {
    streamToProducers.set(streamKey, []);
  }
  streamToProducers.get(streamKey).push(producerId);
};


const getProducersFromStream = (streamKey) => streamToProducers.get(streamKey);

module.exports = {
  setStreamToRoom,
  setStreamtoProducers,
  getProducersFromStream,
};
