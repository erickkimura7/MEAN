var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http) {
   $scope.send = function() {
   		var data = {
   			login:$scope.user.login,
   			passwrod:$scope.user.senha
   		};

   		$http.post('/cadastro',data)
   			.success(function(data,status,headers,config){
   				console.log(data);
   			})
   			.error(function(data,status,headers,config) {
   				console.log("erro");
   			});

   }
});