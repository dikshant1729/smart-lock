const { Server } = require("socket.io");
const lockModel = require("../models/lock.model");

var io;
const activeUsers = new Map();

const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            allowedHeaders: ["*"],
            origin: ["http://localhost:5147", "http://localhost:3000"],
        },
    });

    io.on("connect", (socket) => {
        console.log("New Socket Connection", socket.id);
        var _code;

        socket.on("event:init", async (code) => {
            if (activeUsers.get(code)) {
                io.emit("event:regen_code");
            } else {
                activeUsers.set(code, socket.id);
                const lock = await lockModel.findOne({ pairingCode: code });
                if (!lock) {
                    await lockModel.create({ pairingCode: code });
                } else {
                    await lockModel.findOneAndUpdate(
                        { pairingCode: code },
                        { active: true }
                    );
                }
                _code = code;
            }
        });

        var clientData;

        socket.on("event:open", (code, data) => {
            if(activeUsers.get(code)===socket.id){
                clientData = data;
                io.emit("event:run");
            }
        });

        socket.on("event:match", (data)=> {
            //ML model run
        })

        socket.on("disconnect", async () => {
            activeUsers.delete(_code);
            await lockModel.findOneAndUpdate(
                { pairingCode: _code },
                { active: false }
            );
            console.log(`User disconnected: ${socket.id}`);
        });
    });
};

const get_io = () => {
    return io;
};

module.exports = { initSocket, get_io };
