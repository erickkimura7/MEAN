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
app.get('/',routes.index);

// auth
app.get("/logout",routes.logout);
app.get("/contatos",routes.getContatos);
app.get('/status',isAuth1);

app.get('/usuario', (req,res) => {
    console.log("asjdkjasd" ,req.user.login);
    res.status(200).json({
        usuario:req.user.login
    });
});


// POST
app.post("/contato",routes.enviarContato);
app.post('/cadastro',routes.enviarCadastro);
// app.post('/contatos',addContato);
app.post('/login', (req,res,next) => {
    passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { 
        return res.status(200).json({
            err:info
            }); 
        
    }
    // req / res held in closure
    req.logIn(user, function(err) {
      if (err) { 
          return next(err); 
      }
      return res.status(200).json({
          status:"Deu certo !"
      });
    });

  })(req, res, next);
});



// PATCH
app.patch('/contato',routes.atualizarContato);



// DELETE
app.post('/delcontato',routes.deletarContato);


// Page not found
app.get('*', function(req, res) {
  
  res.redirect('/');
});


function isAuth1(req,res,next){
    if(req.isAuthenticated()){
        //if user is looged in, req.isAuthenticated() will return true 
        res.status(200).json({
            status:"ok"
        });
    } else{

        res.status(401).json({
            err:"Erro"
        });
    }
}


// Verifica Autenticacao
function isAuth(req,res,next){
    if(req.isAuthenticated()){
        //if user is looged in, req.isAuthenticated() will return true 
        next();
    } else{

        res.status(401).json({
            err:"Nao logado"
        });
    }
}


app.listen(process.env.PORT, () => {
  console.log("Server Started");
});

