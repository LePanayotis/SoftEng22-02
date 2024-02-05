const http = require('http')
const app = require('./app')

//Create and start server at localhost port 9103
const port = 9103;
const server = http.createServer(app);
server.listen(port);


module.exports = server