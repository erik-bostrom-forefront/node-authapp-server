import express, { json } from "express";
import cors from "cors";
import _ from './config/loadConfig.js'; // eslint-disable-line no-unused-vars
import userRoute from './routes/userRoute.js';
import { connectToServer } from "./db/conn.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(json());
app.use(userRoute);

 
app.listen(port, () => {
    connectToServer(function(err) {
        if (err) console.error(err);
    });    
    console.log(`Server is running on port ${port}`);
});