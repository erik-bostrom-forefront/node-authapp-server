const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config( {path: "./config/config.env"} );
const port = process.env.PORT || 5000;

console.log(process.env.PORT);
console.log(process.env.DATABASE_URL);

app.use(cors());
app.use(express.json());
app.use(require("./routes/userRoute"));
const dbo = require("./db/conn");
 
app.listen(port, () => {
    dbo.connectToServer(function (err) {
        if (err) console.error(err);
    });
    console.log(`Server is running on port ${port}`);
});