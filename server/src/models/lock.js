const mongoose = require("mongoose");

const lockSchema = new mongoose.Schema({
    id: {
        type: String,
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
    email: {
        type: String,
        default: null,
    },
}, { timestamps: true });



const lock = mongoose.model("lock", lockSchema);

module.exports = lock;