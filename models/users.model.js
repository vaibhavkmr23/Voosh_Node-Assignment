module.exports = (mongoose) =>{
    const User = mongoose.model(
        "user",
        mongoose.Schema({
            name: { type: String, required: true},
            phoneNumber: { type: Number, required: true},
            password: { type: String, required: true},
            isLoggedIn: Boolean,
            token: String,
        }, { timestamps: true })
    );
    return User;
}