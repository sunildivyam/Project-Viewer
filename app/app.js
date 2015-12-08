'use strict';
var routeControllers = angular.module("routeControllers", []);

var routeApp = angular.module("routeApp", ["ngRoute", "routeControllers"]).
config(["$routeProvider", function($routeProvider) {
	$routeProvider.
	when("/home", {
		templateUrl: "views/home.html",
		controller: "homeController"
	}).
	when("/products", {
		templateUrl: "views/products.html",
		controller: "productsController"
	}).
	when("/contactus", {
		templateUrl: "views/contactus.html",
		controller: "contactusController"
	}).
	when("/aboutus", {
		templateUrl: "views/aboutus.html",
		controller: "aboutusController"
	}).
	otherwise({
		redirectTo: "/home"
	});
}]);
