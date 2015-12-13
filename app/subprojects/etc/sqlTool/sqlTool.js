angular.module('pvApp.sqlTool.controllers', []);
angular.module('pvApp.sqlTool.services', []);
angular.module('pvApp.sqlTool.directives', []);

angular.module('pvApp.sqlTool', [
	'pvApp.sqlTool.controllers',
	'pvApp.sqlTool.services',
	'pvApp.sqlTool.directives'
])

.config(["$urlRouterProvider", "$stateProvider", "$locationProvider", "stateHelperProvider", function($urlRouterProvider, $stateProvider, $locationProvider, stateHelperProvider) {

	stateHelperProvider.createStates([
	{
		name: 'sqltool.tables',
		url: '/tables?dbid&tableid',
		templateUrl: "subprojects/pages/sqlTool/tables.html"
	},{
		name: 'sqltool.state2',
		url: '/state2',
		templateUrl: "subprojects/pages/sqlTool/state2.html"
	}]);
}])

.run(["$rootScope", "$state", "$stateParams", "$templateCache","$templateRequest",  function($rootScope, $state, $stateParams, $templateCache,$templateRequest) {
	$templateRequest('subprojects/pages/sqlTool/sql-table.html').then(function(response) {
		$templateCache.put('sql-table.html', response);
	});

	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
}]);

