console.log("loading Script");
var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope,$http) {
   $scope.send = function() {
         var data = {
            login:$scope.user.login,
            password:$scope.user.senha
         };


         $http.post('/cadastro',data)
            .success(function(data,status,headers,config){
               console.log(data);
               $window.location.href = '/login';
            })
            .error(function(data,status,headers,config) {
               console.log("erro");
            });

   }
});