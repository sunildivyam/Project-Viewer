angular.module('pvApp.highcharts.directives')
    .directive('dataExplorer', [function() {
    	return {
    		restrict: "AE",
    		link: function(scope, element, attrs, controller) {
    			var $element = $(element);
    		}
    	};
    }]);
