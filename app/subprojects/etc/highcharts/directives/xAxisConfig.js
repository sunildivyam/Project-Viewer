angular.module('pvApp.highcharts.directives')
    .directive('axisXConfig', ['$timeout',function($timeout) {

    	return {
    		restrict: "AE",
    		templateUrl: "subprojects/pages/highcharts/x-axis-config.html",
    		link: function(scope, element, attrs, controller) {
	    		$timeout(function(){
	    			var $element = $(element);
	    			$element.find(".x-axis-categories").dropkick({
					  mobile: true
					});
    			});

    		}
    	};
    }]);
