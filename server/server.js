const express = require("express");
const passport = require("./passport/passport");
const path = require("path");
const publicPath = path.join(__dirname, '..','..', '/public');
const bodyparser = require("body-parser");
const mongoose = require("./db/mongoose");
const {Users} = require("./models/user");



var app = express();


// setup mid
app.set('view engine', 'ejs');
app.use(express.static(publicPath));
app.use(require('morgan')('combined')); 
app.use(require('cookie-parser')());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// init passport

app.use(passport.initialize());
app.use(passport.session());

var routes = require("./routes/routes");




// GET
app.get('/',routes.index);
app.get('/login',routes.login);
app.get('/cadastro',routes.cadastrar);
app.get('/novoContato',routes.novoContato);
//app.get('/atualizarCadastro',routes.atualizarCadastro);
//app.get("/logout", isAuth,routes.logout)



// POST
app.post('/cadastro',routes.enviarCadastro);
// app.post('/contatos',addContato);
app.post('/login', passport.authenticate('local', { successRedirect: '/',
                                                    failureRedirect: '/login' }));



// PATCH
// app.patch('/contatos',atualizarContato);



// DELETE
// app.delete('/contatos',deleteContato);


// Page not found
app.get('*', function(req, res) {
  var err = new Error();
  err.status = 404;
  res.send("Page not Found");
});





// Verifica Autenticacao
function isAuth(req,res,next){
    if(req.isAuthenticated()){
        //if user is looged in, req.isAuthenticated() will return true 
        next();
    } else{

        res.redirect("/");
    }
}


app.listen(8080, () => {
  console.log("Server Started");
});