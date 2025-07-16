
// Map<userId, Map<streamKey, Set<producerId>>>
const userProducersMap = new Map();

// streamKey -> Set<userId>
const streamKeyToUsersMap = new Map();

function addUserToStream(streamKey, userId) {
  if (!streamKeyToUsersMap.has(streamKey)) {
    streamKeyToUsersMap.set(streamKey, new Set());
  }
  streamKeyToUsersMap.get(streamKey).add(userId);
}

function removeUserFromStream(streamKey, userId) {
  if (streamKeyToUsersMap.has(streamKey)) {
    const users = streamKeyToUsersMap.get(streamKey);
    users.delete(userId);
    if (users.size === 0) {
      streamKeyToUsersMap.delete(streamKey);
    }
  }
}

function removeUserFromAllStreams(userId) {
  for (const [streamKey, users] of streamKeyToUsersMap.entries()) {
    users.delete(userId);
    if (users.size === 0) streamKeyToUsersMap.delete(streamKey);
  }
}

function getUsersInStream(streamKey) {
  return Array.from(streamKeyToUsersMap.get(streamKey) || []);
}


function setUserProducers(userId, streamKey, producerId) {
  if (!userProducersMap.has(userId)) {
    userProducersMap.set(userId, new Map());
  }

  const streamMap = userProducersMap.get(userId);

  if (!streamMap.has(streamKey)) {
    streamMap.set(streamKey, new Set());
  }

  streamMap.get(streamKey).add(producerId);
}

function getUserProducers(userId, streamKey) {
  const streamMap = userProducersMap.get(userId);
  if (!streamMap) return [];
  return Array.from(streamMap.get(streamKey) || []);
}

function removeUserProducers(userId) {
  userProducersMap.delete(userId);
}



module.exports = {
   addUserToStream,
  removeUserFromStream,
  removeUserFromAllStreams,
  getUsersInStream,
  setUserProducers,
  getUserProducers,
  removeUserProducers,
};
