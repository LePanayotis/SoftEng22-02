
const axios = require("axios");

async function healthCheck() {
    try {
      const response = await axios.get('http://localhost:9103/intelliq_api/admin/healthcheck', {headers : {'format': 'json'}});
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    process.exit(0);
  }

module.exports = { healthCheck };