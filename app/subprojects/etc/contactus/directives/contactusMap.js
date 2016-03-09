angular.module("pvApp.contactus.directives")
.directive('contactusMap', ['$timeout', function($timeout){

	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope: {
			width: "@",
			height: "@",
			currentLocation: "@"
		},
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		templateUrl: 'subprojects/pages/contactus/contactus-map.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function(scope, element, iAttrs, controller) {
			$timeout(function(){
				var $element = $(element);
				// scope.$watch('currentLocation', function(newValue, oldValue) {
				// 	if (typeof newValue==='string' && newValue!=="") {

				// 	}
				// });
			});
		}
	};
}]);