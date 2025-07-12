const Stream = require("../database/models/Stream/stream.model")

const setProducerByKey = async (streamKey, producerId) => {
  try{
    if (!streamKey){
      throw new Error("Invalid stream key")
    }

    const [result] = await Stream.update({
      producerId,
      status: 'active',
      startedAt: new Date(Date.now())
    },{
      where: {
        streamKey
      }
    })

    if (result) return true;
    return false;
  }
  catch(error){
    console.log("Error while setting producer key",error?.message)
    throw new Error("Error while setting producer key")
  }
}

const getProducerByKey = async (streamKey) => {
  try{
    if (!streamKey){
      throw new Error("Invalid stream key")
    }

    const exists = await Stream.findOne({where: {streamKey}})

    return exists?.producerId || null;

  }catch(error){
    console.log("Error while getting producer key",error?.message)
    throw new Error("Error while getting producer key")
  }
}

module.exports = {setProducerByKey, getProducerByKey}