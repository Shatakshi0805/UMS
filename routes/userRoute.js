const express = require("express");
const userRoute = express();
const bodyParser = require("body-parser");
const multer =  require("multer");
const path = require("path");
const userController = require("../controllers/userController");

userRoute.set("view engine", "ejs");
userRoute.set("views", "./views/user");

userRoute.use(bodyParser.json());
userRoute.use(bodyParser.urlencoded({extended: true}));

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "../public/userImages"));
    },
    filename: function (req, file, cb) {
        const name = Date.now() + "-" + file.originalname;
        cb(null, name);
    }
});

const upload = multer({storage: storage});

userRoute.get("/register", userController.loadRegister);

userRoute.post("/register", upload.single("image"), userController.registerUser);

module.exports = userRoute;