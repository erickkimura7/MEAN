
const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
	login: {
		type:String,
		unique:true,
		require:true
	},
	password:{
		type:String,
		require:true
	}
	
});

var Users = mongoose.model('User',UserSchema);

module.exports = {Users};