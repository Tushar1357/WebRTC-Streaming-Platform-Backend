const sendResponse = (res, statusCode, status, message, data) => {
  try {
    const msg = {
      statusCode,
      status,
      message,
    };

    if (data){
      msg['data'] = data;
    }

    res.json(msg)
  } catch (error) {
    console.error("Error while sending resposne");
  }
};


module.exports = {sendResponse}