angular.module('pvApp.sqlTool.directives')
.directive('tablesList', ['$timeout', function($timeout){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: 'subprojects/pages/sqlTool/sql-table.html',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, element, iAttrs, controller) {
			var linktext ='<b>ME</b>';
			linktext = encodeURIComponent(linktext);
			$("#mailtolink").attr('href','mailto:me@me.com?subject=Me&body=' + linktext);

			$scope.$watch('currentTables', function(newValue, oldValue, scope) {
				if (newValue!==undefined && newValue!==null) {
					$(element).find('.tables-list').tinyscrollbar({
						trackSize: 100,
						thumbSize: 5
					});
				}
			});
		}
	};
}]);