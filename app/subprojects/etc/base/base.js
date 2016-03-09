
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
	"pvApp.sqlTool",
	"pvApp.d3charts",
	"pvApp.highcharts",
	"pvApp.contactus"
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
	},{
		name: 'd3charts',
		url: '/d3charts',
		templateUrl: "subprojects/pages/d3charts/landing.html",
		controller: "d3chartsController"
	},{
		name: 'highcharts',
		url: '/highcharts',
		templateUrl: "subprojects/pages/highcharts/landing.html",
		controller: "highchartsController"
	},{
		name: 'contactus',
		url: '/contactus',
		templateUrl: "subprojects/pages/contactus/landing.html",
		controller: "contactusController"
	}]);
}])

.run(["$rootScope", "$state", "$stateParams", "$templateCache",  function($rootScope, $state, $stateParams, $templateCache) {
	// $templateRequest('subprojects/pages/base/landing.html').then(function(response) {
	// 	$templateCache.put('home.html', response);
	// });

	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
}]);