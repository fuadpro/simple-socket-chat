const express = require("express");
const { createServer } = require("http");
const { join } = require("path");

const initSocket = require("./socket/init");

const app = express();
const httpServer = createServer(app);
initSocket(httpServer);

app.use(express.static(join(__dirname, "../public")));
app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

httpServer.listen(process.env.PORT || 3002, () => {
  console.log(`app is running on port ${process.env.PORT || 3002}`);
});
