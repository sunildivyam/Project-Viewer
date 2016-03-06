angular.module('pvApp.directives')
.directive('dock', ['$timeout',function($timeout) {
	var dockClass = "dock";

	return {
		restrict: "AE",
		transclude: true,
		template: "<div class='dock-contents' ng-transclude=''>",
		scope: {
			dockPosition: "@",
			dataScope: "=",
			offSetX: "=",
			offsetY: "=",
			width: "=",
			height: "="
		},
		link: function(scope, element, attrs, ctrl, transclude) {
			$timeout(function(){
				var $element = $(element);

				$element.addClass(dockClass);
			});
		}
	};
}]);
