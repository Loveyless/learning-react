const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  res.end(fs.readFileSync('index.html'));
});

server.listen(3079, () => {
  console.log('Server is running on port 3079');
});