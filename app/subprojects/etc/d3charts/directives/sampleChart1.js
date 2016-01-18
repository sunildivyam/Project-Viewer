angular.module('pvApp.d3charts.directives')
.directive('sampleChart1', [function(){

	function renderBarChart(svg, data, config) {
		   // remove all previous items before render
	    svg.selectAll('*').remove();

	    // If we don't pass any data, return out of the element
	    if (!data) return;

	    // setup variables
	    var width = svg.node().offsetWidth - config.margin,
	        // calculate the height
	        height = data.length * (config.barHeight + config.barPadding),
	        // Use the category20() scale function for multicolor support
	        color = d3.scale.category20(),
	        // our xScale
	        xScale = d3.scale.linear()
	          .domain([0, d3.max(data, function(d) {
	            return d.score;
	          })])
	          .range([0, width]);

	    // set the height based on the calculations above
	    svg.attr('height', height);

	    //create the rectangles for the bar chart
	    svg.selectAll('rect')
	      .data(data).enter()
	        .append('rect')
	        .attr('height', config.barHeight)
	        .attr('width', 140)
	        .attr('x', Math.round(config.margin/2))
	        .attr('y', function(d,i) {
	          return i * (config.barHeight + config.barPadding);
	        })
	        .attr('fill', function(d) { return color(d.score); })
	        .transition()
	          .duration(1000)
	          .attr('width', function(d) {
	            return xScale(d.score);
	          });
	}
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		templateUrl: 'subprojects/pages/d3charts/sample-chart1.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, element, attrs, controller) {
			var config = {
				margin: parseInt(attrs.margin) || 20,
				barHeight: parseInt(attrs.barHeight) || 20,
				barPadding: parseInt(attrs.barPadding) || 5,
			};

			$scope.data = [
				{name: 'Sunil', score: 99},
				{name: 'Praveen', score: 58},
				{name: 'James', score: 80},
				{name: 'Thomas', score: 95},
				{name: 'Karry', score: 40}
			];

			var $element = $(element),
				$svg = d3.select(element[0]).select('.chart-container')
					.append('svg')
					.attr('width', 500)
					.attr('height', 300);


			$scope.$watch('data', function() {
				renderBarChart($svg, $scope.data, config);
			}, true);
		}
	};
}]);