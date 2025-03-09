require("dotenv").config();
const app = require("./app");
const { connectToDb } = require("./config/db");
const PORT = process.env.PORT || 5000;

connectToDb();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
