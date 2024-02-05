
const axios = require("axios");
const fs = require("fs");
const env = require("../../env");

async function resetAll() {
    let tokenValue;
    try{
            tokenValue = fs.readFileSync(env.tokenPath, 'utf8');
    } catch (error) {
         console.error(`An error occurred while trying to read from ${env.tokenPath}: ${error}`);
    }
    try {
      const response = await axios.post('http://localhost:9103/intelliq_api/admin/resetall', {
            "token": tokenValue
          });
      console.log("Your database has been reseted");
    } catch (error) {
      console.error(error);
    }
    process.exit(0);
  }

module.exports = { resetAll };