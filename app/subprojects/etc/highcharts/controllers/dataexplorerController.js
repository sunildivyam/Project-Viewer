angular.module('pvApp.highcharts.controllers')
.controller('dataexplorerController', ['$scope', 'dataExplorerService','configService', function($scope, dataExplorerService, configService){
	$scope.config = configService.getConfig();

	$scope.config.chartTypes = [];
	$scope.currentChartType = $scope.config.DEFAULT_CHART_TYPE;
	$scope.chartData = undefined;

	//Initial Promises to be resolved.
	$scope.chartTypepromise = dataExplorerService.getChartTypes();
	$scope.chartDataPromise = dataExplorerService.getChartData(/*params*/);

	$scope.chartTypepromise.then(function(chartTypes) {
		$scope.config.chartTypes = chartTypes;
	});

	$scope.chartDataPromise.then(function(chartData) {
		$scope.chartData = chartData;
	});

	$scope.onChartTypeChange = function(selectedChart) {
		$scope.currentChartType =selectedChart;
		$scope.chartData.series[0].type = selectedChart;

		$scope.$apply();
	};
}]);