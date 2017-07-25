var mongoose = require("mongoose");
var m = require("./../server/db/mongoose");
var {Users} = require("./../server/models/user.js");


console.log("Connected to DB");

// Nome completo, endereço, telefone (fixo e celular), email, e observações


// criar um usuario


/*var data = {
	login: "erick",
	password:"123abc"
};

var user = new Users(data);

user.save().then((doc) => {
	console.log(doc);
}).catch((err) => {
	console.log(err);
});*/


// adicionar um contato


/*Users.findOne({login:"erick"}).then((doc) => {
	console.log(doc.contatos);
	for(x in doc.contatos){
		
		if(doc.contatos[x].nome === "Jaoo"){
			console.log("nome ja existe");
			return 0;
		}
	}

	update();


}).catch((e) => {
	console.log(e);
});*/

function update (){
	Users.update({login:"erick"} , {
	$push: {
		contatos: {
			nome:"Jaoo",
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
	close();
}).catch((err) => {
	console.log(err);
	close();
});
};


// remover contatos

Users.update({login:"erick"},{
	$pull: {contatos: {nome : "Jao"}}
}).then((doc) => {
	console.log(doc);
}).catch((err) => {
	console.log(err);
});


// deletar usuario


/*Users.remove({login:"erick"}, (doc) => {
	console.log(doc);
}).catch((err) => {
	console.log(err);
});
*/

// pegar contatos

/*Users.findOne({login:"erick"}).then((doc) => {
	// console.log(doc);
	console.log(doc.contatos);

}).catch((err) => {
	console.log(err);
});*/

function close(){

	console.log("Close connection");
	mongoose.connection.close();
};


