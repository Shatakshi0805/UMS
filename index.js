const express = require("express");
const app = express();
const mongoose = require("mongoose");

const userRoute = require("./routes/userRoute");

mongoose.connect("mongodb://127.0.0.1:27017/user_management_system")
.then(() => console.log("DB is connected!"))
.catch ((err) => console.log(err));

app.use("/", userRoute)

app.listen(8000, function () {
    console.log("Server is Up!");
})