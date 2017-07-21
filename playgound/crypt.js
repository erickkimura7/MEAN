const bcrypt= require("bcryptjs");


var hash = bcrypt.hashSync("ola",10);

console.log("hash : ",hash);
console.log("senha : ola");
if (bcrypt.compare("ola",hash)){
	console.log("certo");
} else{
	console.log("Errado");
}