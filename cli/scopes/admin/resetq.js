
const axios = require("axios");
const fs = require("fs");
const env = require("../../env");


async function resetQ(q_id) {
    let tokenValue;
    try{
            tokenValue = fs.readFileSync(env.tokenPath, 'utf8');
    } catch (error) {
         console.error(`An error occurred while trying to read from ${env.tokenPath}: ${error}`);
    }
    try {
      const response = await axios.post('http://localhost:9103/intelliq_api/admin/resetq/'+ q_id, { "token": tokenValue});
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    process.exit(0);
  }

module.exports = { resetQ };