const express = require("express");
const path = require("path");
const _ = require("lodash");
const publicPath = path.join(__dirname, '..', '..', '/client');
const {
	Users
} = require("./../models/user");
const bcrypt = require("bcryptjs");
console.log("ola: ", publicPath);
var app = express();





// GET
exports.index = function(req, res) {
	// console.log("asjd");
	res.render(publicPath + '/index');
};

exports.logout = function(req, res) {
	req.logout();
	res.status(200).json({
		status: "logout"
	});
};


exports.getContatos = function(req, res) {
	var login = req.user.login;
	var contatos = _.pick(req.user, ['contatos'])
	console.log("contatos : ", contatos);
	res.status(200).json(contatos);
};


// POST

// adicionar usuario
exports.enviarCadastro = function(req, res) {
	var body = _.pick(req.body, ['login', 'password']);

	body.password = hash(body.password);
	body.contatos = [];
	console.log(body);

	var user = new Users(body);
	user.save().then((doc) => {
		console.log(doc);
		res.status(200).json({
			status: "sucesso"
		});
	}).catch((err) => {
		console.log(err);
		res.status(500).json({
			err: "Erro"
		});
	});
};


// adicionar contato
exports.enviarContato = function(req, res) {
	var body = _.pick(req.body, ['email', 'nome', 'endereco', 'obs', 'telefone']);
	Users.findOne({
		"login": req.user.login
	}).then((doc) => {
		console.log(doc.contatos);
		var x = null;
		for (x in doc.contatos) {

			if (doc.contatos[x].nome === body.nome) {
				console.log("nome ja existe");
				return res.status(500).json({
					err: "Contato já existe"
				});
			}
		}
		update(req, body, (e) => {
			if (e) {
				console.log(e);
				return res.status(500).json({
					err: "Erro"
				});
			}
			res.status(200).json({
				status: "Sucesso"
			});
		});


	}).catch((e) => {
		console.log(e);
		res.status(500).json({
			err: "Erro"
		});
	});
};




function hash(senha) {
	return bcrypt.hashSync(senha, 10);
};





function update(req, body, callback) {

	Users.update({
		login: req.user.login
	}, {
		$push: {
			contatos: {
				nome: body.nome,
				endereco: body.endereco,
				telefone: {
					fixo: body.telefone.fixo,
					celular: body.telefone.celular
				},
				email: body.email,
				obs: body.obs

			}
		}
	}).then((doc) => {
		console.log("Updated : ", doc);
		callback();

	}).catch((err) => {
		console.log(err);
		callback(err);
	});
};

// PATCH
exports.atualizarContato = function(req, res) {
	console.log("patch : ",req.body);
	var body = _.pick(req.body, ['email', 'endereco', 'obs', 'telefone', 'nome']);
	var atualizar = {
		email: body.email,
		endereco: body.endereco,
		obs: body.obs,
		fixo: body.telefone.fixo,
		celular: body.telefone.celular,
		nome: body.nome
	};
	var contato = req.body.contato;
	console.log(contato);


	Users.update({
		"login": req.user.login,
		"contatos.nome": contato
	}, {
		$set: {
			"contatos.$.email": atualizar.email,
			"contatos.$.endereco": atualizar.endereco,
			"contatos.$.obs": atualizar.obs,
			"contatos.$.nome": atualizar.nome,
			"contatos.$.telefone.celular": atualizar.celular,
			"contatos.$.telefone.fixo": atualizar.fixo
		}
	}).then((doc) => {
		console.log(doc);
		res.status(200).json({
			status: "Atualizado"
		});
	}).catch((e) => {
		console.log(e);
		res.status(500).json({
			err: "Erro ao atualizar"
		});
	});
};

// DELETE 
exports.deletarContato = function(req, res) {

	try {
		var login = req.user.login;
		var nome = req.body.nome;
		console.log("login : ",login);
		console.log("nome : ",req.data);
		Users.update({
			login:login
		}, {
			$pull: {
				contatos: {
					nome:nome
				}
			}
		}).then((doc) => {
			console.log(doc);

			res.status(200).json({
				status: "Deletado"
			});
		}).catch((err) => {
			console.log(err);
			res.status(500).json({
				err: "erro"
			});
		});
	}
	catch (err) {
		console.log("erro");
		res.status(500).json({
			err: "erro"
		});
	}
};
