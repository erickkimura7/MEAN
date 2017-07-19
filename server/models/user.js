
const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
	login:String,
	password:String
});

var Users = mongoose.model('User',UserSchema);

module.exports = {Users};