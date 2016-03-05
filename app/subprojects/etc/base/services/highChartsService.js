angular.module('pvApp.services')
.service('highChartsService', ['$q', '$http', function($q, $http){
	if (typeof Highcharts === 'object') {
		return Highcharts;
	} else {
		console.log("High Charts Library is missing or is not loaded");
		return false;
	}

}]);