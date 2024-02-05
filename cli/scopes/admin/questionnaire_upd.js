
const axios = require("axios");
const fs = require("fs");
const env = require("../../env");


async function questionnaireUpd(file) {
    try {
        const data = fs.readFileSync(file, 'utf8');
        const dictionary = JSON.parse(data);       
        const tokenValue = fs.readFileSync(env.tokenPath, 'utf8');
        dictionary["token"] = tokenValue;
        const response = await axios.post('http://localhost:9103/intelliq_api/admin/questionnaire_upd', dictionary);
        console.log(response.data);
    } catch (error) {
    console.error(error);
    }
    process.exit(0);
  }

module.exports = { questionnaireUpd };