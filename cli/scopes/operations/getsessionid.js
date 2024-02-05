
const axios = require("axios");

async function getSessionID(Q_id) {
    try {
        let dictionary= {"Q_id" : Q_id};
        const response = await axios.post('http://localhost:9103/intelliq_api/userSession', dictionary);
        console.log(response.data.token);
    } catch (error) {
    console.error(error);
    }
    process.exit(0);
  }

module.exports = { getSessionID };