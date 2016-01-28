angular.module('pvApp.d3charts.controllers')
.controller('forceChartController', ['$scope', '$timeout', 'd3chartsService', function($scope, $timeout,d3chartsService){
	function limitData(data, limit) {
		var newData = {};
			newData.nodes = data.nodes.slice(0,limit);
			newData.links = data.links.slice(0,limit);
			return newData;
	}

	// d3chartsService.getLexData(8, function(index) {$scope.nodesLoadProgress=index;}).then (function(response) {
	// 	$scope.forceGraphData = response.data;
	// });

d3chartsService.getForceGraphData().then (function(response) {
	$scope.forceGraphData = limitData(response.data, 20);
});
	$scope.nodesToAdd =10;

	$scope.addNodes = function() {
		var attemptsToProcess = 10;
		var timer = setInterval(function() {
			d3chartsService.getLexData(parseInt($scope.nodesToAdd), function(index) {$scope.nodesLoadProgress=index;}).then (function(response) {

				$timeout(function() {
					$scope.$emit('onNodesAdd', response.data);
				});

				attemptsToProcess--;
				if (attemptsToProcess<=0) {
					clearInterval(timer);
					timer = null;
				}
			});
		}, 10);
	};
}]);