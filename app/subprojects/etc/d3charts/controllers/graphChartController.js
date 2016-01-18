angular.module('pvApp.d3charts.controllers')
.controller('graphChartController', ['$scope', 'd3chartsService', function($scope, d3chartsService){
	d3chartsService.getGraphData().then (function(response) {
		$scope.graphCategories = response.data.categories;
		$scope.graphData = response.data.data;
	});

	$scope.selectCategory = function(event,id) {

	};

}]);