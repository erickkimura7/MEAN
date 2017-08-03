angular.module('myApp').controller('loginController', ['$scope', '$location', 'AuthService',
  function($scope, $location, AuthService) {

    $scope.login = function() {

      // initial values
      $scope.error = false;
      $scope.disabled = true;
      $scope.usuario = "";

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function() {
          $location.path('/');
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        // handle error
        .catch(function() {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });

    };

  }
]);
angular.module('myApp').controller('logoutController', ['$scope', '$location', 'AuthService',
  function($scope, $location, AuthService) {

    $scope.logout = function() {

      // call logout from service
      AuthService.logout()
        .then(function() {
          $location.path('/login');
        });

    };

  }
]);

angular.module('myApp').controller('pegarContatos', ['$scope', '$location', 'AuthService',
  function($scope, $location, AuthService) {

    $scope.contatos = function() {

      // call logout from service
      AuthService.getContatos(function(resposta) {
        $scope.contatos = resposta;
      });
    };

  }
]);


angular.module('myApp').controller('registerController', ['$scope', '$location', 'AuthService',
  function($scope, $location, AuthService) {
    $scope.register = function() {
      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      AuthService.register($scope.registerForm.username, $scope.registerForm.password)
        // handle success
        .then(function() {
          $location.path('/login');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        // handle error
        .catch(function() {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

  }
]);


angular.module('myApp').controller('Contatos', ['$scope', '$location', 'AuthService',
  function($scope, $location, AuthService) {
    $scope.estado = "semnada";
    $scope.ultimoSel = "";

    AuthService.getContatos(function(res) {
      console.log("pa", res);
      $scope.contatos = res;
      $scope.gam();
    });
    $scope.gam = function() {
      AuthService.getUser(function(usuario) {
        if (usuario) {
          console.log("aksjdkajsdkjsdkjask: ", usuario);
          var no = usuario.usuario;
          $scope.usuario = toTitleCase(no);

        }

      });
    };

    function toTitleCase(str) {
      return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }


    // atualizar 
    $scope.atualizar = function() {
      AuthService.getContatos(function(res) {
        console.log("atualizar: ", res);
        $scope.contatos = res;
      });
    };
    $scope.atualizar1 = function(callback) {
      AuthService.getContatos(function(res) {
        console.log("atualizar: ", res);
        $scope.contatos = res;
        callback();
      });
    };

    // estado normal 
    $scope.normal = function() {
      $scope.addErr = null;
      $scope.estado = "normal";
      console.log("Estado : Normal");
    };


    //estado novo
    $scope.estadonovo = function() {
       $scope.addErr = null;
      $scope.estado = "novo";
      console.log("estado : novo");
    };
    
    $scope.confirm = function(){
      BootstrapDialog.confirm('Are you sure you want to do this?');
    };

    // implementar add contato
    $scope.addContato = function() {
      console.log("aaaui");
      if (typeof $scope.novo.fixo == undefined) {
        $scope.novo.telefone.fixo = "";
      }
      if (typeof $scope.novo.celular == undefined) {
        $scope.novo.telefone.celular = "";
      }
      if (typeof $scope.novo.email == undefined) {
        $scope.novo.email = "";
      }
      if (typeof $scope.novo.endereco == undefined) {
        $scope.novo.endereco = "";
      }
      if (typeof $scope.novo.obs == undefined) {
        $scope.novo.obs = "";
      }
      console.log("aui");
      var dados = {
        nome: $scope.novo.nome,
        email: $scope.novo.email,
        endereco: $scope.novo.endereco,
        telefone: {
          fixo: $scope.novo.fixo,
          celular: $scope.novo.celular
        },
        obs: $scope.novo.obs
      }
      console.log(dados);
      AuthService.addContato(dados, function(res) {
        console.log("err:", res);
        if (res) {
          $scope.addErr = res;
        }
        else {
          
          $scope.atualizar();
          $scope.show($scope.novo);
          $scope.novo = null;
        }

      });
    };

    //show contatos

    $scope.show = function(id) {
      console.log("ola :", id);
      $scope.id = id;
      $scope.atual = id;
      $scope.normal();
       $scope.addErr = null;
    };

    // Edit row
    $scope.showEdit = function(r) {
      $scope.estado = "edit";
      $scope.active = r;
      $scope.contatos.selected = angular.copy(r);
      $scope.nomeatual = r.nome;
    };


    //reset 
    $scope.reset = function() {
      $scope.contatos.selected = {};
      $scope.active = null;
      $scope.normal();
      console.log("reset");
    };

    // implementar remove contato
    $scope.remove = function(id) {
      var nome = id.nome;
      console.log("Nome: ", nome);
      AuthService.removeContatos(nome, function(x) {
        console.log("Remove : ", x);
        $scope.atualizar();
      });
    };

    // implementar atualiza contato
    $scope.patch = function() {
      console.log("Verificar : ", $scope.nomeatual);
      var data = {
        contato: $scope.nomeatual,
        nome: $scope.contatos.selected.nome,
        email: $scope.contatos.selected.email,
        endereco: $scope.contatos.selected.endereco,
        telefone: {
          fixo: $scope.contatos.selected.telefone.fixo,
          celular: $scope.contatos.selected.telefone.celular
        },
        obs: $scope.contatos.selected.obs
      };

      AuthService.patchContatos(data, function(res) {

        var teste = {
          contato: $scope.nomeatual,
          email: $scope.contatos.selected.email,
          endereco: $scope.contatos.selected.endereco,
          nome: $scope.contatos.selected.nome,
          obs: $scope.contatos.selected.obs,
          telefone: {
            celular: $scope.contatos.selected.telefone.celular,
            fixo: $scope.contatos.selected.telefone.fixo
          },

        };
        console.log("ultimo", $scope.ultimoSel);
        $scope.reset();
        $scope.atualizar1(function() {
          console.log("show: ", teste);
          $scope.atual = teste;
          $scope.show(teste);
        });

      });




    };


  }
]);

