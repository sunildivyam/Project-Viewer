'use strict';

angular.module("pvApp.services", []);
angular.module("pvApp.controllers", []);
angular.module("pvApp.directives", []);
angular.module("pvApp.filters", []);
angular.module("pvApp.providers", []);

angular.module("pvApp", [
	"ui.router",
	"ui.router.stateHelper",
	"pvApp.services",
	"pvApp.controllers",
	"pvApp.directives",
	"pvApp.filters",
	"pvApp.providers",
	"pvApp.sqlTool"
])

.config(["$urlRouterProvider", "$stateProvider", "$locationProvider", "stateHelperProvider", function($urlRouterProvider, $stateProvider, $locationProvider, stateHelperProvider) {

	stateHelperProvider.createStates([
	{
		name: 'home',
		url: '/home',
		templateUrl: "subprojects/pages/base/landing.html",
		controller: "homeController"
	},{
		name: 'sqltool',
		url: '/sqltool',
		templateUrl: "subprojects/pages/sqlTool/landing.html",
		controller: "sqlToolController"
	}]);
}])

.run(["$rootScope", "$state", "$stateParams", "$templateCache",  function($rootScope, $state, $stateParams, $templateCache) {
	// $templateRequest('subprojects/pages/base/landing.html').then(function(response) {
	// 	$templateCache.put('home.html', response);
	// });

	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
}]);