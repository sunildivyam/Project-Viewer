angular.module('pvApp.d3charts.controllers')
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
	}

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
}]);