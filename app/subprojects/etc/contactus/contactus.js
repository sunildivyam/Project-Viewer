angular.module('pvApp.contactus.controllers', []);
angular.module('pvApp.contactus.services', []);
angular.module('pvApp.contactus.directives', []);

angular.module('pvApp.contactus', [
	'pvApp.contactus.controllers',
	'pvApp.contactus.services',
	'pvApp.contactus.directives'
])

.config(["$urlRouterProvider", "$stateProvider", "$locationProvider", "stateHelperProvider", function($urlRouterProvider, $stateProvider, $locationProvider, stateHelperProvider) {
	//create child states if required
	// stateHelperProvider.createStates([
	// {
	// 	name: 'contactus.state1',
	// 	url: '/state1',
	// 	templateUrl: "subprojects/pages/contactus/state1-landing.html",
	// 	controller: 'state1Controller'
	// }]);
}])

.run(["$rootScope", "$state", "$stateParams", "$templateCache",  function($rootScope, $state, $stateParams, $templateCache) {

	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
}]);

