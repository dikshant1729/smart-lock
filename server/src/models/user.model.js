const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    locks: {
        type: [
            {
                name: String,
                id: mongoose.Schema.ObjectId,
            },
        ],
    },
});

module.exports = mongoose.model("user", userSchema);
