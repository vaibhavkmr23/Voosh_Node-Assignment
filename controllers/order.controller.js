const db = require("../models");
const Orders = db.orders;

//Api Create Course
exports.addOrder = (req, res) => {
    // Validate Request
    if (!req.body.user_id && !req.body.sub_total && !req.body.phoneNumber) {
        res.status(400).send({
            message: "content cannot be empty"
        });
        return;
    }
    const order = new Orders({
        user_id: req.body.user_id,
        sub_total: req.body.sub_total,
        phoneNumber: req.body.phoneNumber,
    });

    order.save(order).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message: "some error occurred while Adding an order", err
        });
    });

};

exports.getOrderById = (req, res) => {
    const id = req.params.user_id;

    Orders.find({ user_id: id }).then((data) => {
        if (!data) {
            res.status(404).send({
                message: "No Order Found with given ID",
            });
        }
        else {
            res.send(data);
        }
    }).catch((err) => {
        res.status(500).send({
            message: "some error occurred while fetching the Orders", err
        });
    });
}