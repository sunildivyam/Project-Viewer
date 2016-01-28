angular.module('pvApp.d3charts.directives')
    .directive('forceChart', [function() {
    	var force, color;

    	function initGraph(config) {
    		force = d3.layout.force()
                .charge(-1000)
                .gravity(0.05)
                .linkDistance(150)
                .size([config.width, config.height]);
            color = d3.scale.category20();
    	}

        function renderForceGraph(svg, data, config, clearBeforePaint, forceStart) {
            if (clearBeforePaint===true) {
            	svg.selectAll('*')
                .remove();
            }

            var prevNodes = force.nodes() || [],
            	prevLinks = force.links() || [];
            data.nodes =prevNodes.concat(data.nodes);
            data.links=prevLinks.concat(data.links);

            force.nodes(data.nodes)
                .links(data.links);
            if (forceStart===true) {
            	force.start();
            } else{
            	force.resume();
            }

            var link = svg.selectAll('.link')
                .data(data.links)
                .enter()
                .append('line')
                .attr('class', 'link')
                .style('stroke-width', 1)
                .attr("marker-end", function(d) { return "url(#" + "suit" + ")"; });
            var node = svg.selectAll('.node')
                .data(data.nodes)
                .enter()
                .append('circle')
                .attr('class', 'node')
                .attr('r', config.radius)
                .style('fill', function(d) {
                    if (d.group) {
						return color(d.group);
                    }else if(d.category && d.category.id) {
                    	return color(d.category.id*50);
                    } else {
                    	return color(100);
                    }
                })
                .call(force.drag);

            var text = svg.selectAll('.node-text')
                .data(data.nodes)
                .enter()
                .append('text')
                .attr('class', 'node-text')
                .attr('x', -(config.radius) / 2)
                .attr('y', 0)
                .text(function(d) {
                    return d.label;
                });
            var marker = svg.selectAll("marker")
                .data(["suit", "licensing", "resolved"])
                .enter().append("marker")
                .attr("id", function(d) {
                    return d;
                })
                .attr("viewBox", "-" + config.arrowSize + ' -' + config.arrowSize + " " + config.arrowSize * 2 + " " + config.arrowSize * 2)
                .attr("refX", config.arrowSize + config.radius)
                .attr("refY", 0)
                .attr("markerWidth", config.arrowSize * 2)
                .attr("markerHeight", config.arrowSize * 2)
                .attr("orient", "auto")
                .append("path")
                .attr("d", "M-" + config.arrowSize + ",-" + config.arrowSize + ' L ' + config.arrowSize + ",0 L -" + config.arrowSize + ',' + config.arrowSize + " Z");
            force.on('tick', function() {
                link.attr('x1', function(d) {
                        return d.source.x;
                    })
                    .attr('y1', function(d) {
                        return d.source.y;
                    })
                    .attr('x2', function(d) {
                        return d.target.x;
                    })
                    .attr('y2', function(d) {
                        return d.target.y;
                    });
                node.attr('cx', function(d) {
                        return d.x;
                    })
                    .attr('cy', function(d) {
                        return d.y;
                    });
                text.attr("transform", function(d) {
                    return "translate(" + d.x + "," + d.y + ")";
                });
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
            templateUrl: 'subprojects/pages/d3charts/force-chart.html',
            // replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function($scope, element, attrs, controller) {
                var config = {
                    margin: parseInt(attrs.margin) || 20,
                    barHeight: parseInt(attrs.barHeight) || 100,
                    barPadding: parseInt(attrs.barPadding) || 5,
                    nodeSize: parseInt(attrs.nodeSize) || 150,
                    width: parseInt(attrs.width) || 1400,
                    height: parseInt(attrs.height) || 550,
                    radius: parseInt(attrs.radius) || 50,
                    arrowSize: parseInt(attrs.arrowSize) || 10
                };
                var $element = $(element),
                    $svg = d3.select(element[0]).select('.chart-container')
                    .append('svg')
                    .attr('width', config.width)
                    .attr('height', config.height);

                initGraph(config);
                $scope.$watch('forceGraphData', function(data) {
                    if (!data) return;
                    renderForceGraph($svg, data, config, true, true);
                });

                $scope.$on('onNodesAdd', function(event, data){
                	if (!data) return;
                    renderForceGraph($svg, data, config, false, true);
                });
            }
        };
    }]);
