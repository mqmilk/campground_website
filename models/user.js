const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    /*
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    */
});

//no duplicate username..., 
userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

module.exports = User;


