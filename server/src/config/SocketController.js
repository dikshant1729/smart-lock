const { Server } = require("socket.io");

var io;

const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            allowedHeaders: ["*"],
            origin: ["http://localhost:5147", "http://localhost:3000"],
        },
    });

    io.on("connect", (socket) => {
        console.log("New Socket Connection", socket.id);

        socket.on("message", () => {}); //
    });
};

const get_io = () => {
    return io;
};

module.exports = { initSocket, get_io };
