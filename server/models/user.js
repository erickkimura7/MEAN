
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
	},
	contatos: [
		{
			nome:String,
			endereco:String,
			telefone: {
				fixo:String,
				celular:String
			},
			email:String,
			observacoes:String
		}
	]
	
});

var Users = mongoose.model('User',UserSchema);

module.exports = {Users};