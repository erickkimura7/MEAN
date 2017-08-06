angular.module('myApp').factory('AuthService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    // create user variable
    var user = null;

    // return available functions for use in the controllers
    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register,
      getContatos:getContatos,
      addContato:addContato,
      removeContatos:removeContatos,
      patchContatos:patchContatos,
      getUser:getUser
    });
function isLoggedIn() {
  if(user) {
    return true;
  } else {
    return false;
  }
}

function getUserStatus(callback) {
  return $http.get('/status')
  // handle success
  .success(function (data) {
    if(data.status){
      
      user = true;
      callback();
    } else {
      user = false;
      callback();
    }
    // console.log(user);
  })
  // handle error
  .error(function (data) {
    user = false;
    // console.log(user);
    callback();
  });
}

function getUser(callback){
    return $http.get('/usuario')
    .success(function(data) {
        callback(data);
    })
    .error(function(data) {
        callback();
    });
}


      
function login(username, password) {

  // create a new instance of deferred
  var deferred = $q.defer();

  // send a post request to the server
  $http.post('/login',
    {login: username, password: password})
    // handle success
    .success(function (data, status) {
      if(status === 200 && data.status){
        user = true;
        deferred.resolve();
      } else {
        user = false;
        deferred.reject();
      }
    })
    // handle error
    .error(function (data) {
      user = false;
      deferred.reject();
    });

  // return promise object
  return deferred.promise;

}

function logout() {

  // create a new instance of deferred
  var deferred = $q.defer();

  // send a get request to the server
  $http.get('/logout')
    // handle success
    .success(function (data) {
      user = false;
      deferred.resolve();
    })
    // handle error
    .error(function (data) {
      user = false;
      deferred.reject();
    });

  // return promise object
  return deferred.promise;

}




function getContatos(callback) {

  return $http.get('/contatos')
  // handle success
  .success(function (data) {
    if(data.contatos){
      // console.log(data.contatos);
      callback(data.contatos);
    } else {
      callback();
    }
  })
  // handle error
  .error(function (data) {
    callback();
  });

}
function addContato(dados,callback) {
  // console.log("addcontatos");
   $http.post('/contato', dados)
  // handle success
  .success(function (data) {
    if(data.status){
      // console.log(data.status);
      callback();
    } else {
      callback(data.err);
    }
  })
  // handle error
  .error(function (data) {
    callback(data.err);
  });

}
function removeContatos(variavel,callback) {
  // console.log("removendo : ",variavel);
  var data = {
    "nome":variavel
  };
  
  // console.log(data);
   $http.post('/delcontato',data)
  // handle success
  .success(function (data) {
    if(data.status){
      // console.log(data.status);
      callback(data.contatos);
    } else {
      callback();
    }
  })
  // handle error
  .error(function (data) {
    callback();
  });

}
function patchContatos(data,callback) {

  return $http.patch('/contato',data)
  // handle success
  .success(function (data) {
    if(data.contatos){
      callback(data.contatos);
    } else {
      callback();
    }
  })
  // handle error
  .error(function (data) {
    callback();
  });

}
      
function register(username, password) {

  // create a new instance of deferred
  var deferred = $q.defer();

  // send a post request to the server
  $http.post('/cadastro',
    {login: username, password: password})
    // handle success
    .success(function (data, status) {
      if(status === 200 && data.status){
        deferred.resolve();
      } else {
        deferred.reject();
      }
    })
    // handle error
    .error(function (data) {
      deferred.reject();
    });

  // return promise object
  return deferred.promise;

}

}]);

