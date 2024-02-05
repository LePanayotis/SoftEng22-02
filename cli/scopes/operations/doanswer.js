
const axios = require("axios");


async function doAnswer(Q_id, qst_id, session, option_id) {
    try {
      const response = await axios.post('http://localhost:9103/intelliq_api/doanswer/' + Q_id + '/' + qst_id + '/' + session + '/' + option_id);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    process.exit(0);
  }

module.exports = { doAnswer };