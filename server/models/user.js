
const mongoose = require("mongoose");

var ContatosSchema = new mongoose.Schema({
	nome: {
		type:String,
		unique:true
	},
	endereco:String,
	telefone: {
		fixo:String,
		celular:String
	},
	email:String,
	observacoes:String
});

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
	contatos: [ContatosSchema]
	
});

var Users = mongoose.model('User',UserSchema);

module.exports = {Users};