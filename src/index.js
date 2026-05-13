import './load-env.js';
import http from 'node:http';

const port = Number(process.env.PORT || process.env.port || 8787);

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(
      JSON.stringify({
        ok: true,
        service: 'scaffold',
        runtime: 'node',
        public_url: process.env.PUBLIC_URL || `http://127.0.0.1:${port}`,
      }),
    );
    return;
  }
  res.writeHead(404, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ ok: false, error: 'not_found' }));
});

server.listen(port, () => {
  process.stderr.write(`scaffold listening on ${port}\n`);
});
