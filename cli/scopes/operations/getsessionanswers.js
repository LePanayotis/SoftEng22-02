
const axios = require("axios");
const fs = require("fs");
const env = require("../../env");
const json2csv = require('json2csv').parse;

async function getSessionAnswers(q_id, session, format) {
  let tokenValue;
    try{
            tokenValue = fs.readFileSync(env.tokenPath, 'utf8');
    } catch (error) {
         console.error(`An error occurred while trying to read from ${env.tokenPath}: ${error}`);
    }
    try {
      const response = await axios.get('http://localhost:9103/intelliq_api/getsessionanswers/' + q_id + '/' + session, {"data": {
            "token": tokenValue
            }
          });
      if (format == "json"){ 
          console.log(response.data.answers);
      }
      else if (format == "csv"){
        const csv = json2csv(response.data.answers);
        console.log(csv); 
      }
      else {
        console.log("Please choose json or csv format");
      };
    } catch (error) {
      console.error(error);
    }
    process.exit(0);
  }

module.exports = { getSessionAnswers };