const mongoose = require("mongoose");

const connectToDb = async () => {
    try {
        await mongoose.connect(
            process.env.DB_URI.replace("<db_password>", process.env.DB_PASSWORD)
        );
        console.log("Connected to database");
    } catch (error) {
        console.log(error);
    }
};

module.exports = { connectToDb };
