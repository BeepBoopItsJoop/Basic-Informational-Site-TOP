import express from "express";
import path from "path";

const app = express();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

const PAGE_DIR = process.env.PAGEROOT || "www";

app.get("*", (req, res) => {
     const url = (req.path === '/') ? "/index" : req.path;
     const absFilePath = path.join(path.resolve(PAGE_DIR), `${url}.html`);

     res.sendFile(absFilePath, (err) => {
          if(err) {
               res.status(404);
               const absFilePath404 = path.resolve(PAGE_DIR, "404.html");
               res.sendFile(absFilePath404, (innerErr) => {
                    if(innerErr) {
                         res.send("<h1>404 - Not Found</h1>")
                    }
               });
          }
     });
});

app.listen(PORT, () => console.log(`My first Express app - listening on port ${PORT}!`));
