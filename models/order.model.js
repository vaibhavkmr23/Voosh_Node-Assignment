module.exports = (mongoose) => {
    const Order = mongoose.model(
        "orders",
        mongoose.Schema({
            user_id: String,
            sub_total: Number,
            phoneNumber: Number,
        }, { timestamps: true })
    );
    return Order;
};