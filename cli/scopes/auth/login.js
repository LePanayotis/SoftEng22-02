
const axios = require("axios");
const fs = require("fs");
const env = require("../../env");

async function loginFunction(user, passw) {
    try {
      const response = await axios.post('http://localhost:9103/intelliq_api/login', {username: user, password: passw} , { headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
      console.log("You have logged in!");
      fs.writeFileSync(env.tokenPath, response.data.token, function(err) {
        if(err) {
            return console.log(err);
        }
    });
    } catch (error) {
      console.error(error);
    }
    process.exit(0);
  }

module.exports = { loginFunction };