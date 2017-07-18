const express = require("express");
var app = express();


exports.index = function (req,res) {
	res.send("Index");
};

exports.menu = function (req,res) {
	res.send("Menu");
};

exports.cadastrar = function (req,res) {
	res.send("Menu");
};

exports.enviarCadastro = function (req,res) {
	res.send("Menu");
};