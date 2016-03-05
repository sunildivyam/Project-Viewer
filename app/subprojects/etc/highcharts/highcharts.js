angular.module('pvApp.highcharts.controllers', []);
angular.module('pvApp.highcharts.services', []);
angular.module('pvApp.highcharts.directives', []);

angular.module('pvApp.highcharts', [
	'pvApp.highcharts.controllers',
	'pvApp.highcharts.services',
	'pvApp.highcharts.directives'
])

.config(["$urlRouterProvider", "$stateProvider", "$locationProvider", "stateHelperProvider", function($urlRouterProvider, $stateProvider, $locationProvider, stateHelperProvider) {

	stateHelperProvider.createStates([
	{
		name: 'highcharts.dataexplorer',
		url: '/dataexplorer',
		templateUrl: "subprojects/pages/highcharts/dataexplorer-landing.html",
		controller: 'dataexplorerController'
	},{
		name: 'highcharts.highchart',
		url: '/highchart',
		templateUrl: "subprojects/pages/highcharts/highchart-landing.html",
		controller: 'highchartController'
	}]);
}])

.run(["$rootScope", "$state", "$stateParams", "$templateCache",  function($rootScope, $state, $stateParams, $templateCache) {

	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
}]);

