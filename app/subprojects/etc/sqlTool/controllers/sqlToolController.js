angular.module('pvApp.sqlTool.controllers')
.controller('sqlToolController', ['$scope', '$templateCache','sqlToolService', function($scope, $templateCache, sqlToolService){
	sqlToolService.getDatabases().then(function(response) {
		$scope.currentDatabases = response.data;
	});
}]);