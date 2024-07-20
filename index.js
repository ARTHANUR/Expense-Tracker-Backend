import express from "express";
import mongoose from "mongoose";
import router from "./route/expenseRouter.js"
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
app.use("/expense" , router);
const MONGOURL = "mongodb+srv://sarthanur:12345@crudproject.lysxqfb.mongodb.net/"



mongoose.connect(MONGOURL).then(() => {
    app.listen(5555,()=>{
        console.log("server is running at 5555");
    })
}).catch((error) => {
    console.log(error.message);
})

