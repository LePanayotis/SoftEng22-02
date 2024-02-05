const http = require('http')
const front_app = require('./front_app');

const front_port = 80;


const front_server = http.createServer(front_app);

front_server.listen(front_port);