import http from "http";
import { promises as fs } from "fs";

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

const ROOT = process.env.ROOT || "./www";

const servePage = async (req, res) => {
     
     const address = req.client.localAddress;
     
     if(req.method !== "GET") {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'text/plain');

          res.end(http.STATUS_CODES[res.statusCode]);
          return;
     }

     let url = req.url;
     if(url === "/") {
          url = "/index.html";
     }

     try {
          const data = await fs.readFile(`${ROOT}${url}`, { encoding: 'utf8' });
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html');

          res.end(data);
     } catch (err) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html');

          try {
               const notFoundPage = await fs.readFile(`${ROOT}/404.html`, { encoding: 'utf8' });
               res.end(notFoundPage);
           } catch (innerErr) {
               res.end('<h1>404 - Not Found</h1>'); // Fallback in case the 404.html file is missing
           }
     }
}

const server = http.createServer(servePage);

server.listen(PORT, HOST, ()=> console.log(`Server running at http://${HOST}:${PORT}/`));
