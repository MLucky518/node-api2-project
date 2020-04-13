const express = require("express");
const welcomeRouter = require("./posts/welcome-router");
const postRouter = require("./posts/post-router");
const cors = require("cors");



const server = express();
const port = 5000;

server.use(express.json());
server.use(cors());
server.use("/" , welcomeRouter);
server.use("/posts" , postRouter);



server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
  