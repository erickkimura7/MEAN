const express = require("express");
const passport = require("./passport/passport");
const path = require("path");
const publicPath = path.join(__dirname, '..','/views');
const bodyparser = require("body-parser");
const mongoose = require("./db/mongoose");
const {Users} = require("./models/user");
console.log(publicPath);


var app = express();


// setup mid
app.set('views',publicPath);
app.set('view engine', 'ejs');
// app.use(express.static(publicPath));
app.use(require('morgan')('combined')); 
app.use(require('cookie-parser')());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(express.static(path.join(__dirname, '..', '/public')));

// init passport

app.use(passport.initialize());
app.use(passport.session());

var routes = require("./routes/routes");




// GET
// not auth
app.get('/',notAuth,routes.index);
app.get('/login',notAuth,routes.login);
app.get('/cadastro',notAuth,routes.cadastrar);

// auth
app.get('/menu',isAuth,routes.menu);
app.get('/novoContato',isAuth,routes.novoContato);
app.get('/atualizarCadastro',isAuth,routes.atualizarCadastro);
app.get("/logout", isAuth,routes.logout);
app.get("/getContatos",isAuth,routes.getContatos);



// POST
app.post('/cadastro',routes.enviarCadastro);
// app.post('/contatos',addContato);
app.post('/login', passport.authenticate('local', { successRedirect: '/menu',
                                                    failureRedirect: '/login' }));



// PATCH
// app.patch('/contatos',atualizarContato);



// DELETE
app.delete('/contatos',routes.deletarContato);


// Page not found
app.get('*', function(req, res) {
  
  res.redirect('/');
});





// Verifica Autenticacao
function isAuth(req,res,next){
    if(req.isAuthenticated()){
        //if user is looged in, req.isAuthenticated() will return true 
        next();
    } else{

        res.redirect("/login");
    }
}


app.listen(8080, () => {
  console.log("Server Started");
});

function notAuth(req,res,next){
   if(req.isAuthenticated()){
        res.redirect("/menu");
        
    } else{
        next();
        
    }
}