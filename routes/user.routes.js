module.exports = app => {
    var router = require("express").Router();
    var users = require("../controllers/user.controller");

    router.post("/add-user", users.addUser);

    router.post("/login-user", users.Login);

    app.use("/", router);
}