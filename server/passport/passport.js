const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;


// configure passport
passport.use(new LocalStrategy(
	function(login,password , callback){
		Users.find().then((err,result) => {
			console.log(result);
		});
		console.log("login");
		Users.findByLogin(login , function(err,user){
			if(err){
				console.log("ERoo");
				return callback(err);
			}
			if(!user){
				console.log("usuario nao encontrado");
				return callback(null,false);
			}
			console.log("User pass : ",user.senha);
			console.log("Pass : ",password);
			if(user.senha != password){
				console.log("senha errada");
				return callback(null,false);
			}
			console.log("foi ",user)
			return callback(null,user);

		});
	}
));

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