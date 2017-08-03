var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider,$locationProvider){
  $locationProvider.hashPrefix('');
  $routeProvider
  .when('/',{
    templateUrl: 'pages/main.html',
//    controller: 'mainController'
      access: {restricted: false}
  })
  .when('/login', {
      templateUrl: 'pages/login.html',
      controller: 'loginController',
      access: {restricted: false}
    })
   .when('/logout', {
      controller: 'logoutController',
      access: {restricted: true}
    })
   .when('/register', {
      templateUrl: 'pages/register.html',
      controller: 'registerController',
      access: {restricted: false}
    })
   .when('/contatos',{
    templateUrl: 'pages/contatos.html',
    controller: 'Contatos',
    access: {restricted: true}
  })
   .when('/sobre',{
    templateUrl: 'pages/sobre.html',
//    controller: 'mainController',
      access: {restricted: false}
  })

});

myApp.filter('searchFor', function(){

	// All filters must return a function. The first parameter
	// is the data that is to be filtered, and the second is an
	// argument that may be passed with a colon (searchFor:searchString)

	return function(arr, searchString){

		if(!searchString){
			return arr;
		}

		var result = [];

		searchString = searchString.toLowerCase();

		// Using the forEach helper method to loop through the array
		angular.forEach(arr, function(contatos){

			if(contatos.nome.toLowerCase().indexOf(searchString) !== -1){
				result.push(contatos);
			}

		});

		return result;
	};
});

myApp.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      AuthService.getUserStatus(function(){
          console.log("call");
        if(!AuthService.isLoggedIn()){
            $rootScope.logado='nao';
            $rootScope.deslogado='';
            console.log("deslogado");
        }else{
            $rootScope.logado='';
            $rootScope.deslogado='nao';
            console.log("logado");
        }
          
        if (next.access.restricted && !AuthService.isLoggedIn()){
          $location.path('/login');
          $route.reload();
        }
      });
  });
});


