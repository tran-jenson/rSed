var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    id: String,
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    password: String,
    address: {type: mongoose.Schema.Types.ObjectId, ref: "Address"},
    phone: Number,
    orderHistory: [{type: mongoose.Schema.Types.ObjectId, ref: "Order"}],
    preferences: {type: mongoose.Schema.Types.ObjectId, ref: "Preference"},
},{
    versionKey: false
});

module.exports = mongoose.model("User", UserSchema);