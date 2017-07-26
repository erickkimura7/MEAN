var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "view/main.html"
    })
    .when("/red", {
        templateUrl : "view/main1.html"
    })
    .when("/green", {
        templateUrl : "view/main.html"
    })
    .when("/blue", {
        templateUrl : "view/main.html"
    });
});