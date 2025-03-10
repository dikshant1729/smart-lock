require("dotenv").config();
const http = require("http");
const app = require("./app");
const { connectToDb } = require("./config/db");
const { initSocket } = require("./config/SocketController");
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

connectToDb();
initSocket(server);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
