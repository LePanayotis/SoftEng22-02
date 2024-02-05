
const axios = require("axios");
const fs = require("fs");
const env = require("../../env");

async function logoutFunction() {
    try {
      const response = await axios.post('http://localhost:9103/intelliq_api/logout');
      console.log(response.data);
        fs.writeFileSync(env.tokenPath, "", function(err) {
        if(err) {
            return console.log(err);
        }
    });

    } catch (error) {
      console.error(error);
    }
    process.exit(0);
  }

module.exports = { logoutFunction };