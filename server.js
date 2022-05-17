//  initialisation of express
const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const PORT = 9000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const db = require("./models");

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(" Database Connection established:");
}).catch((err) => {
    console.log(" Database Connection failed :");
    process.exit();
});

// app.get("/", (req, res) => {
//     res.status(200);
//     res.json({ messaage: "welcome to Voosh" });
// })


require("./routes/order.routes")(app);
require("./routes/user.routes")(app);

app.listen(PORT, () => {
    console.log(`Connection Established on Port ${PORT}`);
});