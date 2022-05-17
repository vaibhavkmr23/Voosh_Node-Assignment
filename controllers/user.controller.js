const db = require("../models");
const User = db.users;

exports.addUser = (req, res) => {
    // Validate Api call
    if (!req.body.phoneNumber || !req.body.password) {
        res.status(400).send({
            message: "Please provide a valid PhoneNumber and password"
        });
        return;
    }

    const filter = { phoneNumber: req.body.phoneNumber };

    User.findOne(filter, (err, user) => {
        if (!err && user === null) {
            //Add user to the DB

            const user = new User({
                name: req.body.name,
                phoneNumber: req.body.phoneNumber,
                password: req.body.password,
                isLoggedIn: false,
            });
            user.save(user).then((data) => {
                res.status(200).send(data);
            })
                .catch((err) => {
                    res.status(500).send({
                        message: "Something went wrong"
                    });
                })

        }
        else {
            res.status(400).send({
                message: " User Already exist"
            });
        }
    })
}


exports.Login = (req, res) => {
    // Validate Api call
    if (!req.body.phoneNumber || !req.body.password) {
        res.status(400).send({
            message: "Please provide a valid PhoneNumber and password"
        });
        return;
    }

    const filter = { phoneNumber: req.body.phoneNumber };

    User.findOne(filter, (err, user) => {
        if (user === null) {
            res.status(401).send({
                message: "Please enter correct PhoneNumber Or Register"
            })
            return;
        }
        else {
            if (user.password === req.body.password) {
                user.isLoggedIn = true;

                User.findOneAndUpdate(filter, user).then((data) => {
                    const token = jwt.sign({ _id: data._id }, "myprivateKey");
                    data.token = token;
                    res.send(data);
                }).catch((err) => {
                    res.status(500).send({
                        message: "Some error Occured",
                    });
                })
            }
            else {
                res.status(401).send({
                    message: "Incorrect password"
                })
            }
        }
    });
};