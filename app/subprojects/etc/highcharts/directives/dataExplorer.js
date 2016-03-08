angular.module('pvApp.highcharts.directives')
    .directive('dataExplorer', ['$timeout', 'highChartsService', function($timeout, highChartsService) {
    	var _hc = highChartsService;
    	return {
    		restrict: "AE",
    		link: function(scope, element, attrs, controller) {
    			$timeout(function(){
    				var $element = $(element),
	    				$chartContainer = $($element.find('.chart-container')),
	    				chart;

					scope.$watch('chartData', function(newValue, oldValue) {
						if (newValue!==undefined || newValue!==null) {
							chart = $chartContainer.highcharts(newValue);
						}
					}, true);
    			});
    		}
    	};
    }]);
