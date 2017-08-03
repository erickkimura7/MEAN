
const mongoose = require("mongoose");

var ContatosSchema = new mongoose.Schema({
	nome: {
		type:String
	},
	endereco:String,
	telefone: {
		fixo:String,
		celular:String
	},
	email:String,
	obs:String
});

var UserSchema = new mongoose.Schema({
	login: {
		type:String,
		unique:true,
		require:true,
		minlength:1
	},
	password:{
		type:String,
		require:true
	},
	contatos: [ContatosSchema]
	
});

var Users = mongoose.model('User',UserSchema);

module.exports = {Users};