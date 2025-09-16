const http = require('http');

const port = 3057;

// Create HTTPS server instead of HTTP
const httpServer = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('hello word Unauthorized access, please start through the game page (over HTTPS)\n');
  } else if (req.url === '/1HLzZI6Z4nVsj8So') {

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('hello' + '\n');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Unauthorized access, please start through the game page (over HTTPS)\n');
  }
});

httpServer.listen(port, () => {
  console.log(`HTTPS Server is running on port ${port}`);
});