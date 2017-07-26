const express = require("express");
const path = require("path");
const _ = require("lodash");
const publicPath = path.join(__dirname, '..','..','/public','/view');
const {Users} = require("./../models/user");
const bcrypt = require("bcryptjs");
console.log("ola: ",publicPath);
var app = express();





// GET
exports.index = function (req,res) {
	console.log("asjd");
	res.render("index" , noAuth("Home"));
};

exports.menu = function (req,res) {
	res.render("menu" ,Auth("Menu"));
};

exports.cadastrar = function (req,res) {
	res.render("cadastro", noAuth("Cadastrar"));
};

exports.login = function (req,res) {
	res.render("login" , noAuth("Login"));
};

exports.logout = function (req,res) {
	req.logout();
	res.redirect("/");
};



exports.novoContato = function (req,res) {
	res.render("novoContato" , {
		title: "Novo Contato",
		links:[
		{ title:"Menu",link:"/menu" },
		{ title:"Novo Contato",link:"/novoContato" },
		{ title:"Logout",link:"/logout" }
		]
	});
};

exports.atualizarCadastro = function (req,res) {
	res.render("atualizarCadastro" , {
		title: "Atualizar Cadastro",
		links:[
		{ title:"Menu",link:"/menu" },
		{ title:"Novo Contato",link:"/novoContato" },
		{ title:"Logout",link:"/logout" }
		]
	});
};

exports.getContatos = function(req,res){
	var login = req.user.login;
	var contatos = _.pick(req.user, ['contatos'])
	console.log(login);
	res.send(contatos);
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
		res.render("cadastro", {
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
exports.deletarContato = function(req,res) {
	
	try{
		var login = req.user.login;
		var nome = req.body.nome;
		Users.update({login},{
		$pull: {contatos: {nome}}
	}).then((doc) => {
		console.log(doc);
		res.send(doc);
	}).catch((err) => {
		console.log("err");
		res.send("erro");
	});
	}catch(err){
		console.log("erro");
		res.send("erro");
	}
	
};



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
		{ title:"Menu",link:"/menu" },
		{ title:"Novo Contato",link:"/novoContato" },
		{ title:"Logout",link:"/logout" }
		]
	};
};