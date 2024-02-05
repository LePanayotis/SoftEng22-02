
const axios = require("axios");
const fs = require("fs");
const env = require("../../env");
const json2csv = require('json2csv').parse;


async function questionFunction(Q_id, qst_id, format) {
  let tokenValue;
    try{
            tokenValue = fs.readFileSync(env.tokenPath, 'utf8');
    } catch (error) {
         console.error(`An error occurred while trying to read from ${env.tokenPath}: ${error}`);
    }
    try {
      const response = await axios.get("http://localhost:9103/intelliq_api/question/" + Q_id + "/" + qst_id, { "data": {
            "token": tokenValue
          }
        });
        if (format == "json"){ 
            console.log(response.data);
        }
        else if (format == "csv"){
            const fields = ['questionnaireID', 'qID', 'qtext', 'required', 'type'];
            
            const question_data = json2csv(response.data, {fields});

            console.log(question_data);

            //const fields2 = ['qID', 'qtext', 'type', 'required'];

            const option_data = json2csv(response.data.options);
            console.log(option_data);
            //response.data.questions = csv_question;
            //const csv = json2csv(response.data);
            //console.log(csv); 
        }
      else {
        console.log("Please choose json or csv format");
      }
    } catch (error) {
      console.error(error);
    }
    process.exit(0);
  }

module.exports = { questionFunction };