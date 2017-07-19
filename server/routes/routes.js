const express = require("express");
const path = require("path");
const _ = require("lodash");
const view = path.join(__dirname, '..','..', '/public',"/view/");
const {Users} = require("./../models/user");
var app = express();


var notAuth = {
		title: "Cadastro",
		links:[
		{ title:"Home",link:"/" },
		{ title:"Login",link:"/login" },
		{ title:"Cadastro",link:"/cadastro" }
		]
	};

function noAuth (title) {
	return {
		title: "Login",
		links:[
		{ title:"Home",link:"/" },
		{ title:"Login",link:"/login" },
		{ title:"Cadastro",link:"/cadastro" }
		]
	}
} ;

function Auth(title){
	return {
		title: title,
		links:[
		{ title:"Home",link:"/" },
		{ title:"Menu",link:"/menu" },
		{ title:"Novo Contato",link:"/novoContato" },
		{ title:"Logout",link:"/logout" }
		]
	};
};


// GET
exports.index = function (req,res) {
	res.render(view+"index" , notAuth("Home"));
};

exports.menu = function (req,res) {
	res.render(view+"menu" ,Auth("Menu"));
};

exports.cadastrar = function (req,res) {
	res.render(view+"cadastro", notAuth("Cadastrar"));
};

exports.login = function (req,res) {
	res.render(view+"login" , notAuth("Login"));
};



exports.novoContato = function (req,res) {
	res.render(view+"novoContato" , {
		title: "Novo Contato",
		links:[
		{ title:"Menu",link:"/menu" },
		{ title:"Novo Contato",link:"/novoContato" },
		{ title:"Logout",link:"/logout" }
		]
	});
};

exports.atualizarCadastro = function (req,res) {
	res.render(view+"atualizarCadastro" , {
		title: "Atualizar Cadastro",
		links:[
		{ title:"Menu",link:"/menu" },
		{ title:"Novo Contato",link:"/novoContato" },
		{ title:"Logout",link:"/logout" }
		]
	});
};


// POST

exports.enviarCadastro = function (req,res) {
	var body = _.pick(req.body, ['login','password']);
	var user = new Users(body);
	user.save().then((doc) => {
		console.log(doc);
		res.json
	}).catch((err) => {
		console.log(err);
		res.render(view+"cadastro", {
		title: "Cadastro",
		links:[
		{ title:"Home",link:"/" },
		{ title:"Login",link:"/login" },
		{ title:"Cadastro",link:"/cadastro" }
		]
	});
	});
};

// PATCH


// DELETE 
