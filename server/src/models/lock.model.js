const mongoose = require("mongoose");

const lockSchema = new mongoose.Schema({
    pairingCode: {
        type: Number,
        length: 6,
        required: true,
    },
    password: {
        type: String,
        default: null,
    },
    active: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model("lock", lockSchema);
