const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const {Users} = require("./../models/user");
const bcrypt= require("bcryptjs");


// configure passport
passport.use(new LocalStrategy({
		usernameField : "login",
		passwordField : "password"
	},
	function(login,password , callback){
		console.log("verificando usuario");

		console.log("login : ",login);
		console.log("Password : ", password);
		Users.findOne({login}).then((result) => {
			console.log(result);
			console.log(result.login);
			console.log(result.password);
			if(!validatePass(result.password , password)){
				console.log("senha invalida");
				callback(null, false , {message: "senha invalida"});
			}		
			console.log("usuario valido");
			callback(null,result);
		}).catch((e) => {
			console.log(e);
			console.log("usuario invalido");
			callback(null, false , {message: "usuario invalido"});
		})

	}
));

// Validate passwrod
function validatePass(senha , hash){
	return bcrypt.compareSync(hash,senha);
};

passport.serializeUser(function(user, cb) {
	console.log("serialize");
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
	console.log("deserializeUser");
  Users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});




module.exports = passport;