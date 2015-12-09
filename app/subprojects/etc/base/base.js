'use strict';

angular.module("pvApp.services", []);
angular.module("pvApp.controllers", []);
angular.module("pvApp.directives", []);
angular.module("pvApp.filters", []);
angular.module("pvApp.providers", []);

angular.module("pvApp", [
	"ui-router",
	"ui.router.stateHelper",
	"pvApp.services",
	"pvApp.controllers",
	"pvApp.directives",
	"pvApp.filters",
	"pvApp.providers"
])

.config(["$urlRouterProvider", "$stateProvider", "$locationProvider", "stateHelperProvider", function($urlRouterProvider, $stateProvider, $locationProvider, stateHelperProvider) {
	stateHelperProvider.createStates([
	{
		name: 'home',
		url: '/home',
		template: "<h1>df skjfhskjdfhskjf</h1>"
	},{
		name: 'sqltool',
		url: '/sqltool',
		template: "<h1>df skjfhskjdfhskjf</h1>"
	}]);
}])

.run("$rootScope", "$state", "$stateParams", [function($rootScope, $state, $stateParams) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
}]);