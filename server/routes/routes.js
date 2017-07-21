const express = require("express");
const path = require("path");
const _ = require("lodash");
const view = path.join(__dirname, '..','..', '/public',"/view/");
const {Users} = require("./../models/user");
const bcrypt = require("bcryptjs");
var app = express();





// GET
exports.index = function (req,res) {
	res.render(view+"index" , noAuth("Home"));
};

exports.menu = function (req,res) {
	res.render(view+"menu" ,Auth("Menu"));
};

exports.cadastrar = function (req,res) {
	res.render(view+"cadastro", noAuth("Cadastrar"));
};

exports.login = function (req,res) {
	res.render(view+"login" , noAuth("Login"));
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
	console.log(body.password);
	body.password = hash(body.password);
	console.log(body.password);
	var user = new Users(body);
	user.save().then((doc) => {
		console.log(doc);
		res.redirect("/login");
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




function hash (senha){
	return bcrypt.hashSync(senha, 10);
};




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
		title: title,
		links:[
		{ title:"Home",link:"/" },
		{ title:"Login",link:"/login" },
		{ title:"Cadastro",link:"/cadastro" }
		]
	};
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