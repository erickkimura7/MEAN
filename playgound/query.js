var mongoose = require("./../server/db/mongoose");
var {Users} = require("./../server/models/user.js");


console.log("Connected to DB");

// Nome completo, endereço, telefone (fixo e celular), email, e observações


// criar um usuario

/*
var data = {
	login: "erick",
	password:"123abc"
};

var user = new Users(data);

user.save().then((doc) => {
	console.log(doc);
}).catch((err) => {
	console.log(err);
});


// adicionar um contato


Users.update({login:"erick"} , {
	$push: {
		contatos: {
			nome:"Jao",
			endereco:"OLAOLA",
			telefone: {
				fixo:"5421212",
				celular:"212545"
			},
			email:"asdkhak@gmail.com",
			observacoes: "sdfnmsdnfm,sdf"

		}
	}
}).then((doc) => {
	console.log("Updated : ",doc);
}).catch((err) => {
	console.log(err);
});


*/

// remover contatos

/*
Users.remove({login:"erick"}, (doc) => {
	console.log(doc);
}).catch((err) => {
	console.log(err);
});
*/

// pegar contatos

Users.findOne({login:"erick"}).then((doc) => {
	// console.log(doc);
	console.log(doc.contatos);

}).catch((err) => {
	console.log(err);
});