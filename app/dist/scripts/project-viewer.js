/* project-viewer.js | Created on 17/02/2016 */

angular.module("pvApp.services", []);
angular.module("pvApp.controllers", []);
angular.module("pvApp.directives", []);
angular.module("pvApp.filters", []);
angular.module("pvApp.providers", []);

angular.module("pvApp", [
	"ui.router",
	"ui.router.stateHelper",
	"pvApp.services",
	"pvApp.controllers",
	"pvApp.directives",
	"pvApp.filters",
	"pvApp.providers",
	"pvApp.sqlTool",
	"pvApp.d3charts"
])

.config(["$urlRouterProvider", "$stateProvider", "$locationProvider", "stateHelperProvider", function($urlRouterProvider, $stateProvider, $locationProvider, stateHelperProvider) {

	stateHelperProvider.createStates([
	{
		name: 'home',
		url: '/home',
		templateUrl: "subprojects/pages/base/landing.html",
		controller: "homeController"
	},{
		name: 'sqltool',
		url: '/sqltool',
		templateUrl: "subprojects/pages/sqlTool/landing.html",
		controller: "sqlToolController"
	},{
		name: 'd3charts',
		url: '/d3charts',
		templateUrl: "subprojects/pages/d3charts/landing.html",
		controller: "d3chartsController"
	}]);
}])

.run(["$rootScope", "$state", "$stateParams", "$templateCache",  function($rootScope, $state, $stateParams, $templateCache) {
	// $templateRequest('subprojects/pages/base/landing.html').then(function(response) {
	// 	$templateCache.put('home.html', response);
	// });

	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
}]);;angular.module('pvApp.d3charts.controllers', []);
angular.module('pvApp.d3charts.services', []);
angular.module('pvApp.d3charts.directives', []);

angular.module('pvApp.d3charts', [
	'pvApp.d3charts.controllers',
	'pvApp.d3charts.services',
	'pvApp.d3charts.directives'
])

.config(["$urlRouterProvider", "$stateProvider", "$locationProvider", "stateHelperProvider", function($urlRouterProvider, $stateProvider, $locationProvider, stateHelperProvider) {

	stateHelperProvider.createStates([
	{
		name: 'd3charts.graphchart',
		url: '/graphchart',
		templateUrl: "subprojects/pages/d3charts/graph-chart-landing.html",
		controller: 'graphChartController'
	},{
		name: 'd3charts.forcechart',
		url: '/forcechart',
		templateUrl: "subprojects/pages/d3charts/force-chart-landing.html",
		controller: 'forceChartController'
	}]);
}])

.run(["$rootScope", "$state", "$stateParams", "$templateCache",  function($rootScope, $state, $stateParams, $templateCache) {

	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
}]);

;angular.module('pvApp.sqlTool.controllers', []);
angular.module('pvApp.sqlTool.services', []);
angular.module('pvApp.sqlTool.directives', []);

angular.module('pvApp.sqlTool', [
	'pvApp.sqlTool.controllers',
	'pvApp.sqlTool.services',
	'pvApp.sqlTool.directives'
])

.config(["$urlRouterProvider", "$stateProvider", "$locationProvider", "stateHelperProvider", function($urlRouterProvider, $stateProvider, $locationProvider, stateHelperProvider) {

	stateHelperProvider.createStates([
	{
		name: 'sqltool.tables',
		url: '/tables?dbid&tableid',
		templateUrl: "subprojects/pages/sqlTool/tables.html",
		controller: 'tablesController'
	},{
		name: 'sqltool.state2',
		url: '/state2',
		templateUrl: "subprojects/pages/sqlTool/state2.html"
	}]);
}])

.run(["$rootScope", "$state", "$stateParams", "$templateCache",  function($rootScope, $state, $stateParams, $templateCache) {
	// $templateRequest('subprojects/pages/sqlTool/sql-table.html').then(function(response) {
	// 	$templateCache.put('sql-table.html', response);
	// });

	// $templateRequest('subprojects/pages/sqlTool/tables-list.html').then(function(response) {
	// 	$templateCache.put('tables-list.html', response);
	// });

	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
}]);

;angular.module('pvApp.controllers')
.controller('appController', ['$rootScope', '$scope', function($rootScope, $scope){
	
}]);;angular.module('pvApp.controllers')
.controller('homeController', ['$scope', function($scope){
	
}]);;angular.module('pvApp.d3charts.controllers')
.controller('d3chartsController', ['$scope', '$templateCache', function($scope, $templateCache){

}]);;angular.module('pvApp.d3charts.controllers')
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
}]);;angular.module('pvApp.d3charts.controllers')
.controller('graphChartController', ['$scope', 'd3graphService', 'd3graphFactory', 'd3LexService', function($scope, d3graphService, d3graphFactory, d3LexService){
	$scope.currentNode = undefined;
	$scope.queryParams="";

	d3graphService.getGraphCategories().then (function(response) {
		$scope.graphCategories = response.data;

		// to create Dummy data
		//console.log(JSON.stringify(d3graphFactory.createVertexData(60,$scope.graphCategories,4)));
		/////////////////
	});
	// d3graphService.getAllNodeVerticesAndEdgesData().then (function(response) {
	// 	$scope.graphData = response.data;
	// });
	$scope.getCategoryColorCode = function(category) {
		function intToRGB(i){
		    var c = (i & 0x00FFFFFF)
		        .toString(16)
		        .toUpperCase();

		    return "00000".substring(0, 6 - c.length) + c;
		}
		return "#" + intToRGB(category.id*234435);
	};

	$scope.selectCategory = function(event,category) {
		$scope.currentCategory = category;
		//$scope.moveCategoryToTop($scope.graphCategories, category);
	};

	$scope.getCategoryByName = function(name) {
		var foundCategories= $scope.graphCategories.filter(function(category,index) {
			return category.label===name;
		});

		if (foundCategories!==undefined && foundCategories.length) {
			return foundCategories[0];
		} else {
			return undefined;
		}
	};

	$scope.moveCategoryToTop = function(categories, categoryToMove) {
		$scope.currentCategory = categoryToMove;
		var index = categories.indexOf(categoryToMove);
		if (index<=0)
			return;
		categories.splice(index,1);
		categories.splice(0,0,categoryToMove);
	};

	$scope.$watch('currentCategory', function(newValue, oldValue) {
		if (newValue===undefined || newValue=== null) {
			return;
		}

		d3graphService.getNodesByCategory(newValue).then(function(data) {
			d3LexService.parseRawToGraph(data,true).then(function(graph) {
				$scope.graphData = graph;
				$scope.$emit('onGraphUpdate', graph);
			});
		});
	});

	$scope.$watch('currentNode', function(node) {
		if (node===undefined || node=== null) {
			return;
		}
		d3graphService.lexNodesAndEdgesByNodeId(node.id).then (function(response) {
			if (response && response.data && response.data.result && response.data.result.data) {
				var data = response.data.result.data;
				d3LexService.parseRawToGraph(data).then(function(graph) {
					$scope.graphData = graph;
					$scope.$emit('onGraphUpdate', graph);
				});
			}
		});

				// var data,
				// 	queryParams = "g.V(" + node.id + ").out()";
				// d3graphService.lexRunQuery(queryParams).then (function(response) {
				// 	if (response && response.data && response.data.result && response.data.result.data) {
				// 		data = response.data.result.data;
				// 		queryParams = "g.V(" + node.id + ").outE()";
				// 		d3graphService.lexRunQuery(queryParams).then (function(response) {
				// 			if (response && response.data && response.data.result && response.data.result.data) {
				// 				data = data.concat(response.data.result.data);
				// 				d3LexService.parseRawToGraph(data).then(function(graph) {
				// 					$scope.graphData = graph;
				// 					$scope.$emit('onGraphUpdate', graph);
				// 				});
				// 			}
				// 		});
				// 	}
				// });
		// d3graphService.getChildrenOfNode(node).then(function(data) {
		// 	d3LexService.parseRawToGraph(data).then(function(graph) {
		// 		$scope.graphData = graph;
		// 		$scope.$emit('onGraphUpdate', graph);
		// 	});
		// });
	});

	$scope.runQuery = function(event) {
		if ($scope.queryParams!==undefined && $scope.queryParams.trim()!=="") {
			d3graphService.lexRunQuery($scope.queryParams).then (function(response) {
				if (response && response.data && response.data.result && response.data.result.data) {
					d3LexService.parseRawToGraph(response.data.result.data).then(function(graph) {
						$scope.graphData = graph;
						$scope.$emit('onGraphUpdate', graph);
					});
				}
			});
		}
	};
}]);;angular.module('pvApp.d3charts.directives')
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
;angular.module('pvApp.d3charts.directives')
    .directive('graphChart', [function() {
    	var force, color;

    	function initGraph(config) {
    		force = d3.layout.force()
                .charge(-1000)
                .gravity(0.15)
                .linkDistance(200)
                .size([config.width, config.height]);
            color = d3.scale.category20();
    	}

        function renderForceGraph(svg, data, config, scope, clearBeforePaint, forceStart) {
            if (clearBeforePaint===true) {
            	svg.selectAll('*')
                .remove();
            }

            force.nodes(data.nodes)
                .links(data.edges);
            if (forceStart===true) {
            	force.start();
            } else{
            	force.resume();
            }

            var link = svg.selectAll('.link')
                .data(data.edges)
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
                    return scope.getCategoryColorCode(scope.getCategoryByName(d.label));
                })
                .on("dblclick", nodeDblclick)
                .on("mouseover", nodeOnMouseOver)
                .on("mouseout", nodeOnMouseOut)
                .call(force.drag);

            var text = svg.selectAll('.node-text')
                .data(data.nodes)
                .enter()
                .append('text')
                .attr('class', 'node-text')
                .attr('x', -(config.radius) / 2)
                .attr('y', 0)
                .text(function(d) {
                    return d.properties.person_name;
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
            //Set up tooltip
			var tip = d3.tip()
			    .attr('class', 'd3-tip')
			    .offset([-10, 0])
			    .html(function (d) {
			    	var emailid=d.properties && d.properties.person_emailId && d.properties.person_emailId.length && d.properties.person_emailId[0].value,
			    	html = [
			    	'<h3>Node Information</h3>',
			    	'<div class="category">CATEGORY: ' + d.label + '</div>',
			    	'<div class="email">EMAIL: ' + emailid + '</div>',
			    	'<div>All other information....</div>'
			    	].join("");
			    	return  html;
				});
			svg.call(tip);
			//
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

            var drag = force.drag()
    			.on("dragstart", dragstart);
			function dragstart(d) {
			  d3.select(this).classed("fixed", d.fixed = true);
			}

			function nodeDblclick(d) {
				tip.hide(d);
				//d3.select(this).style('fill', '#ff0000');
				scope.currentNode = d;
				scope.$apply();
			}

			function nodeOnMouseOver(d) {
				tip.show(d);
			}

			function nodeOnMouseOut(d) {
				tip.hide(d);
			}
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
            templateUrl: 'subprojects/pages/d3charts/graph-chart.html',
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
                    radius: parseInt(attrs.radius) || 40,
                    arrowSize: parseInt(attrs.arrowSize) || 5
                };
                var $element = $(element),
                    $svg = d3.select(element[0]).select('.chart-container')
                    .append('svg')
                    .attr('width', config.width)
                    .attr('height', config.height);

                initGraph(config);
                $scope.$on('onGraphUpdate', function(event,data) {
                    if (!data) return;
                    renderForceGraph($svg, data, config, $scope, true, true);
                });

                $scope.$on('onNodesAdd', function(event, data){
                	if (!data) return;
                    renderForceGraph($svg, data, config, $scope, false, true);
                });
            }
        };
    }]);
;angular.module('pvApp.d3charts.directives')
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
}]);;angular.module('pvApp.d3charts.services')
.service('d3LexService', ['$q', '$http', '$timeout', function($q, $http, $timeout){
	var graph={},
	_VERTEX = "vertex",
	_EDGE = "edge";

	// Utility method : Copy Array or Object;

	function copy(src) {
        return JSON.parse(JSON.stringify(src));
    }

	// Adds the Unique Nodes to the graph and Regenerates the
	function parseGraph(rawGraphDataToAdd, initGraph) {
		var defferedObj = $q.defer();

		$timeout(function(){
			if (initGraph===true) {
				graph = {};
			}

			var rawGraphData = copy(rawGraphDataToAdd);
			var rawGraph = {
				nodes: [],
				edges: []
			};

			if (rawGraphData===undefined) return;
			rawGraphData.forEach(function(dataItem, index) {
				if (dataItem.type===_VERTEX) {
					rawGraph.nodes.push(dataItem);
				} else if (dataItem.type===_EDGE){
					rawGraph.edges.push(dataItem);
				}
			});
			//Adds Unique Nodes to the graph
			addNodes(rawGraph.nodes);
			//Adds Links to the graph
			addLinks(rawGraph.edges);
			defferedObj.resolve(graph);
		});
		return defferedObj.promise;
	}

	// Finds the node in the graph by node id
	function findNode(nodeId) {
		var foundNode;
		if (graph!==undefined && graph.nodes!==undefined && graph.nodes.length && nodeId!==undefined) {
			var nodesCount = graph.nodes.length;
			for (var index=0; index<nodesCount; index++) {
				if (graph.nodes[index].id === nodeId) {
					foundNode = graph.nodes[index];
					break;
				}
			}
		}
		return foundNode;
	}

	//Add unique nodes to the graph and ignores the rest
	function addNodes(nodes) {
		graph.nodes =graph.nodes || [];
		if (nodes!==undefined && nodes.length) {
			nodes.forEach(function(node, index) {
				if (findNode(node.id)===undefined) {
					graph.nodes.push(node);
				}
			});
		}
	}

	// Finds the Link inVertex and outVertex in Nodes and returns their indices as sourceIndex and targetIndex
	function getIndexOfSourceAndTarget(link) {
		var foundIndices={};
		if (graph!==undefined && graph.nodes!==undefined && graph.nodes.length) {
			var nodesCount = graph.nodes.length;
			for (var index=0; index<nodesCount; index++) {
				if (graph.nodes[index].id === link.inV) {
					foundIndices.sourceIndex = index;
				}
				if (graph.nodes[index].id === link.outV) {
					foundIndices.targetIndex = index;
				}
				if (foundIndices.sourceIndex!==undefined && foundIndices.targetIndex!==undefined) {
					break;
				}
			}
		}
		return foundIndices;
	}

	//parses the raw links to graph links and Add to the graph
	function addLinks(links) {
		graph.edges =graph.edges || [];
		if (links!==undefined && links.length) {
			links.forEach(function(link, index) {
				var indexOfSourceAndTarget= getIndexOfSourceAndTarget(link);
				if (indexOfSourceAndTarget!==undefined && indexOfSourceAndTarget.sourceIndex!==undefined && indexOfSourceAndTarget.targetIndex!==undefined) {
					link.source =indexOfSourceAndTarget.sourceIndex;
					link.target = indexOfSourceAndTarget.targetIndex;
					graph.edges.push(link);
				}
			});
		}
	}

	function getGraph() {
		return graph;
	}

	return {
		parseRawToGraph: parseGraph,
		getGraph: getGraph
	};
}]);;angular.module('pvApp.d3charts.services')
.service('d3chartsService', ['$q', '$http', function($q, $http){
	var urls = {
		"graphData": "subprojects/data/d3charts/graph-data.json",
		"forceGraphData": "subprojects/data/d3charts/force-graph-data.json",
		"forceGraphData1": "subprojects/data/d3charts/force-graph-data1.json"
	},
	forceData;

	function createLexData(numberOfRecords, callback) {
		var defferedObj = $q.defer();

		if (numberOfRecords===undefined || isNaN(numberOfRecords)) {
			defferedObj.resolve({"data":{"nodes": [], "links": []}});
		}

		var catCount = numberOfRecords/4,
			categories = [{'id': 1, 'name':'country'}, {'id': 1, 'name':'company'}, {'id': 1, 'name':'technology'}, {'id': 1, 'name':'domain'}],
			nodes=[];

		categories.forEach(function(category, index) {
			for (var i = 0; i<catCount;i ++) {
				var itemObj = {
		            "id": 880680,
		            "label": "person",
		            "type": "vertex",
		            "category": {'id': 1, 'name':'country'},
		            "properties": {
		                "person_emailId": [
			                {
			                    "id": "1241x-ivjc-4qt",
			                    "value": "barbara.clancey@ipgdirect.com"
			                }
		                ],
		                "person_salary": [
			                {
			                    "id": "125mt-ivjc-6bp",
			                    "value": "54000.0"
			                }
		                ],
		                "person_department": [
			                {
			                    "id": "1258l-ivjc-f0l",
			                    "value": "DEVELOPMENT"
			                }
		                ],
		                "person_age": [
			                {
			                    "id": "124ud-ivjc-7wl",
			                    "value": "44"
			                }
		                ],
		                "person_isInternal": [
			                {
			                    "id": "124g5-ivjc-9hh",
			                    "value": "false"
			                }
		                ]
		            }
	    		};
				itemObj.id = 1+i;
				itemObj.label = category.name + (i+1);
				itemObj.category = category;
				nodes.push(itemObj);

				if (typeof callback === 'function') {
					callback((index+1) * (i+1));
				}
			}
		});

		defferedObj.resolve({"data":{"nodes": nodes, "links": []}});
		return defferedObj.promise;
	}

	function fetchGraphData() {
		var defferedObj =$q.defer();
		$http.get(urls.graphData).then(function(response) {
			defferedObj.resolve(response);
		}, function() {
			defferedObj.resolve({errorMessage: "No Results Found"});
		});

		return defferedObj.promise;
	}

	function fetchForceGraphData() {
		var defferedObj =$q.defer();
		$http.get(urls.forceGraphData).then(function(response) {
			forceData = response.data;
			// getPrioritisedData();
			// response.data = forceData;
			defferedObj.resolve(response);
		}, function() {
			defferedObj.resolve({errorMessage: "No Results Found"});
		});

		return defferedObj.promise;
	}

	function getNodeIndexByName(nodes, name) {
		var foundNodeIndex;
		if (nodes!==undefined && nodes.length) {
			for (var i =0; i<nodes.length; i++) {
				if (nodes[i].name===name) {
					foundNodeIndex = i;
					break;
				}
			}
		}
		return foundNodeIndex;
	}

	function getPrioritisedData(categories) {
		categories=[201,202,203];
		var newNodes=[], newLinks=[];
		forceData.originalNodes.filter(function(node, nodeIndex) {
			var newNode = {
				name: node.name,
				group: node.group
			};

			if (node.vertices!==undefined && node.vertices.length) {
				node.vertices.filter(function(vertex, vertexIndex) {
					var newLink={};
					newLink.source = nodeIndex;
					newLink.target = getNodeIndexByName(forceData.originalNodes, vertex);
					newLinks.push(newLink);
				});
			}
			newNodes.push(newNode);
		});

		forceData.nodes = newNodes;
		forceData.links = newLinks;
	}
	return {
		getGraphData: fetchGraphData,
		getForceGraphData: fetchForceGraphData,
		getLexData: createLexData
	};
}]);;angular.module('pvApp.d3charts.services')
.service('d3graphFactory', ['$q', '$http', function($q, $http){
		/*
	 *This creates Vertex Data JSON of specified Number of Nodes, equally for each category
	*/
	function createVertexData(numberOfRecords, categories, numberOfEdgesToCreate) {
		var result = {
			data: [],
			edges: [],
			meta: {}
		};

		if (numberOfRecords===undefined || isNaN(numberOfRecords)) {
			return result;
		}

		var catCount = parseInt(numberOfRecords/categories.length),
			nodes=[];

		categories.forEach(function(category, index) {
			for (var i = 0; i<catCount;i ++) {
				var indx = parseInt(index*catCount + i);
				var itemObj = {
		            "id": 100 + indx,
		            //"index": indx,
		            "label": category.label,
		            "type": "vertex",
		            "properties": {
		            	"person_name": "NODE-" + indx,
		                "person_emailId": [
			                {
			                    "id": "1241x-ivjc-4qt",
			                    "value": "barbara.clancey@ipgdirect.com"
			                }
		                ],
		                "person_salary": [
			                {
			                    "id": "125mt-ivjc-6bp",
			                    "value": "54000.0"
			                }
		                ],
		                "person_department": [
			                {
			                    "id": "1258l-ivjc-f0l",
			                    "value": "DEVELOPMENT"
			                }
		                ],
		                "person_age": [
			                {
			                    "id": "124ud-ivjc-7wl",
			                    "value": "44"
			                }
		                ],
		                "person_isInternal": [
			                {
			                    "id": "124g5-ivjc-9hh",
			                    "value": "false"
			                }
		                ]
		            }
	    		};

				nodes.push(itemObj);
			}
		});

		result.edges = createEdgesForAllVertex(nodes,categories,numberOfEdgesToCreate);
		result.data = nodes;
		return result;
	}

	function getNodesByCategory(vertexNodes, category) {
		return vertexNodes.filter(function(node, index) {
			return node.label===category.label;
		});
	}
	/*
	 *This creates Specified Number of Edges from toCategory types of vertexNodes
	*/
	function createEdgesForVertex(targetVertexNodes, sourceVertexNode, toCategory, numberOfEdgesToCreate) {
		var edges = [];
		var availableTargetNodes = getNodesByCategory(targetVertexNodes,toCategory),
			availableTargetNodesCount= availableTargetNodes.length;

		if (numberOfEdgesToCreate>availableTargetNodesCount) {
			numberOfEdgesToCreate = availableTargetNodesCount;
		}
		var linkCount = 1;

		for (var index = 0; index<availableTargetNodes.length && linkCount<=numberOfEdgesToCreate; index++ ) {
			var node = availableTargetNodes[index],
			edge = {
                "id": "126f9-ivjc-2dx-35s" + index,
                "label": "EMAILS_TO",
                "type": "edge",
                "inVLabel": node.label,
                "outVLabel": sourceVertexNode.label,
                "inV": sourceVertexNode.id,
                "outV": node.id,
                "properties":  {
                    "Date": "02-13-2001 14:10:00 +0530",
                    "ccBcc": "TO",
                    "email_messageId": "802872"
                }
        	};
        	edges.push(edge);
        	linkCount++;
		}
		return edges;
	}

	function nodeOfcategory(node, index) {
		var createdEdges = createEdgesForVertex(targetVertexNodes, node, categories[i+1], numberOfEdgesToCreate);
		edges = edges.concat(createdEdges);
	}

	/*
	 *This creates All Edges of All Nodes except the last Category
	*/
	function createEdgesForAllVertex(targetVertexNodes, categories, numberOfEdgesToCreate) {
		var edges = [];
		for (var i = 0; i<categories.length-1; i++) {
			var nodesOfcategory = getNodesByCategory(targetVertexNodes,categories[i]);
			nodesOfcategory.forEach(nodeOfcategory);
		}
		return edges;
	}
	return {
		createVertexData: createVertexData
	};
}]);;angular.module('pvApp.d3charts.services')
.service('d3graphService', ['$q', '$http', '$timeout', function($q, $http, $timeout){
	var urls = {
		"graphCategories": "subprojects/data/d3charts/graph-categories.json",
		"graphAllData": "subprojects/data/d3charts/graph-all-data.json",
		"graphAllData6Cats": "subprojects/data/d3charts/graph-all-data-6cat.json",
		"lexGeneratedData": "subprojects/data/d3charts/lex-generated-data.json",
		"LEX_queryUrl": "http://10.203.100.224:8182/"
	},
	graphAllData;
	fetchAllNodeVerticesAndEdgesData();
	function fetchGraphCategories() {
		var defferedObj =$q.defer();
		$http.get(urls.graphCategories).then(function(response) {
			defferedObj.resolve(response);
		}, function() {
			defferedObj.resolve({errorMessage: "No Results Found"});
		});

		return defferedObj.promise;
	}

	function fetchAllNodeVerticesAndEdgesData() {
		var defferedObj =$q.defer();
		if (graphAllData!==undefined) {
			defferedObj.resolve({"data":graphAllData});
		} else {
			$http.get(urls.graphAllData6Cats).then(function(response) {
				graphAllData = {
					nodes: response.data.data,
					edges: response.data.edges
				};
				defferedObj.resolve(response);
			}, function() {
				defferedObj.resolve({errorMessage: "No Results Found"});
			});
		}
		return defferedObj.promise;
	}

	function getNodesByCategory(category) {
		var defferedObj = $q.defer(),
		vertexNodes = graphAllData && graphAllData.nodes;

		$timeout(function(){
			defferedObj.resolve(vertexNodes.filter(function(node, index) {
				return node.label===category.label;
			}));
		}, 300);

		return defferedObj.promise;
	}

	function getChildrenOfNode(node) {
		var defferedObj = $q.defer(),
		edges = graphAllData && graphAllData.edges;

		$timeout(function(){
			var data=[];

			edges.filter(function(edge, index) {
				if (edge.inV===node.id) {
					var targetNode = findNodeById(edge.outV);
					if (targetNode!==undefined) {
						data.push(targetNode);
						data.push(edge);
					}
				}
			});
			defferedObj.resolve(data);
		}, 300);

		return defferedObj.promise;
	}

	function findNodeById(nodeId) {
		var nodes = graphAllData && graphAllData.nodes,
			nodesCount=nodes.length, foundNode;
		for (var index=0; index<nodesCount;index++) {
			if (nodes[index].id === nodeId) {
				foundNode = nodes[index];
				break;
			}
		}
		return foundNode;
	}

	function getAllData() {
		return graphAllData;
	}


////**** Actual URL Hits
	function lexRunQuery(queryparams) {
		var defferedObj =$q.defer();
		$http({
			method: 'POST',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			url: urls.LEX_queryUrl,
			data: {
				"gremlin": queryparams
			}
		}).then(function(response) {
			defferedObj.resolve(response);
		}, function() {
			defferedObj.resolve({errorMessage: "No Results Found or Some error occured"});
		});

		return defferedObj.promise;
	}

	function lexNodesAndEdgesByNodeId(nodeId) {
		var defferedObj = $q.defer(),
			nodesQuery = "g.V(" + nodeId + ").out()",
			edgesQuery = "g.V(" + nodeId + ").outE()",
			nodesPromise = lexRunQuery(nodesQuery).then(function(response) {
				return response;
			}),
			edgesPromise =lexRunQuery(edgesQuery).then(function(response) {
				return response;
			});
			$q.all([nodesPromise,edgesPromise]).then(function(response) {
				var mergedResponse;
				if (response && response.length===2) {
					mergedResponse = response[0];
					mergedResponse.data.result.data = mergedResponse.data.result.data.concat(response[1].data.result.data);
				}
				defferedObj.resolve(mergedResponse);
			});
		return defferedObj.promise;
	}
////***

	return {
		getGraphCategories: fetchGraphCategories,
		getAllNodeVerticesAndEdgesData: fetchAllNodeVerticesAndEdgesData,
		getNodesByCategory: getNodesByCategory,
		getAllData: getAllData,
		getChildrenOfNode: getChildrenOfNode,
		lexRunQuery: lexRunQuery,
		lexNodesAndEdgesByNodeId: lexNodesAndEdgesByNodeId
	};
}]);;angular.module('pvApp.sqlTool.controllers')
.controller('sqlToolController', ['$scope', '$templateCache','sqlToolService', function($scope, $templateCache, sqlToolService){
	sqlToolService.getDatabases().then(function(response) {
		$scope.currentDatabases = response.data;
	});
}]);;angular.module('pvApp.sqlTool.controllers')
.controller('tablesController', ['$scope', function($scope){
	$scope.currentTables = [
		{
			"id"			: "1",
			"name"			: "courses",
			"columns"		: [
				{
					"id"			: "1",
					"name"			: "id",
					"description"	: "Course Unique ID",
					"dataType"		: "numeric",
					"primaryKey"	: true
				},
				{
					"id"			: "2",
					"name"			: "name",
					"description"	: "Course Name",
					"dataType"		: "varChar",
					"primaryKey"	: false
				}
			]
		},
		{
			"id"			: "2",
			"name"			: "modules",
			"columns"		: [
				{
					"id"			: "1",
					"name"			: "id",
					"description"	: "Course Unique ID",
					"dataType"		: "numeric",
					"primaryKey"	: true
				},
				{
					"id"			: "2",
					"name"			: "name",
					"description"	: "Course Name",
					"dataType"		: "varChar",
					"primaryKey"	: false
				}
			]
		},
		{
			"id"			: "3",
			"name"			: "programs",
			"columns"		: [
				{
					"id"			: "1",
					"name"			: "id",
					"description"	: "Course Unique ID",
					"dataType"		: "numeric",
					"primaryKey"	: true
				},
				{
					"id"			: "2",
					"name"			: "name",
					"description"	: "Course Name",
					"dataType"		: "varChar",
					"primaryKey"	: false
				}
			]
		},
		{
			"id"			: "1",
			"name"			: "courses",
			"columns"		: [
				{
					"id"			: "1",
					"name"			: "id",
					"description"	: "Course Unique ID",
					"dataType"		: "numeric",
					"primaryKey"	: true
				},
				{
					"id"			: "2",
					"name"			: "name",
					"description"	: "Course Name",
					"dataType"		: "varChar",
					"primaryKey"	: false
				}
			]
		},
		{
			"id"			: "2",
			"name"			: "modules",
			"columns"		: [
				{
					"id"			: "1",
					"name"			: "id",
					"description"	: "Course Unique ID",
					"dataType"		: "numeric",
					"primaryKey"	: true
				},
				{
					"id"			: "2",
					"name"			: "name",
					"description"	: "Course Name",
					"dataType"		: "varChar",
					"primaryKey"	: false
				}
			]
		},
		{
			"id"			: "3",
			"name"			: "programs",
			"columns"		: [
				{
					"id"			: "1",
					"name"			: "id",
					"description"	: "Course Unique ID",
					"dataType"		: "numeric",
					"primaryKey"	: true
				},
				{
					"id"			: "2",
					"name"			: "name",
					"description"	: "Course Name",
					"dataType"		: "varChar",
					"primaryKey"	: false
				}
			]
		}
	];
}]);;angular.module('pvApp.sqlTool.directives')
.directive('sqlTable', [function(){
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

		}
	};
}]);;angular.module('pvApp.sqlTool.directives')
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
}]);;angular.module('pvApp.sqlTool.services')
.service('sqlToolService', ['$http', '$q', function($http, $q){
	var urls = {
		"databasesUrl": "subprojects/data/sqlTool/databases.json",
		"tablesUrl": "subprojects/data/sqlTool/tables.json"
	};

	function fetchDatabases() {
		var defferedObj =$q.defer();
		$http.get(urls.databasesUrl).then(function(response) {
			defferedObj.resolve(response);
		}, function() {
			defferedObj.resolve({errorMessage: "No Results Found"});
		});

		return defferedObj.promise;
	}

	return {
		getDatabases: fetchDatabases
	};
}]);