angular.module('pvApp.d3charts.controllers', []);
angular.module('pvApp.d3charts.services', []);
angular.module('pvApp.d3charts.directives', []);

angular.module('pvApp.d3charts', [
	'pvApp.d3charts.controllers',
	'pvApp.d3charts.services',
	'pvApp.d3charts.directives'
])

.config(["$urlRouterProvider", "$stateProvider", "$locationProvider", "stateHelperProvider", function($urlRouterProvider, $stateProvider, $locationProvider, stateHelperProvider) {

	stateHelperProvider.createStates([
	{
		name: 'd3charts.graphchart',
		url: '/graphchart',
		templateUrl: "subprojects/pages/d3charts/graph-chart-landing.html",
		controller: 'graphChartController'
	},{
		name: 'd3charts.chart2',
		url: '/chart2',
		templateUrl: "subprojects/pages/d3charts/chart2.html"
	}]);
}])

.run(["$rootScope", "$state", "$stateParams", "$templateCache",  function($rootScope, $state, $stateParams, $templateCache) {

	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
}]);

