(function() {
angular.module('myApp',[]).controller('myCtrl', function ($scope,$http){
	$http.get("/getContatos", function(response){
		$scope.contatos = response.data;
	})
});

})();
