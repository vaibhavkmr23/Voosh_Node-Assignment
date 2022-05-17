const auth = require("../middleware/auth");

module.exports = app => {
    var router = require("express").Router();
    var orders = require("../controllers/order.controller");

    router.post("/add-order", orders.addOrder);

    router.get("/:user_id", orders.getOrderById);

    app.use("/", auth, router );
}