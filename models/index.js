const dbConfigUrl = require("../config/db.config");
const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.url = dbConfigUrl.url;
db.users = require("./users.model")(mongoose);
db.orders = require("./order.model")(mongoose);

module.exports = db;