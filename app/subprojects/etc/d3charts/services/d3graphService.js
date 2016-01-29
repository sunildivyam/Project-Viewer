angular.module('pvApp.d3charts.services')
.service('d3graphService', ['$q', '$http', '$timeout', function($q, $http, $timeout){
	var urls = {
		"graphCategories": "subprojects/data/d3charts/graph-categories.json",
		"graphAllData": "subprojects/data/d3charts/graph-all-data.json",
		"graphAllData6Cats": "subprojects/data/d3charts/graph-all-data-6cat.json",
		"lexGeneratedData": "subprojects/data/d3charts/lex-generated-data.json",
		"LEX_queryUrl": "http://someurl.com/data"
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
				"params": queryparams
			}
		}).then(function(response) {
			defferedObj.resolve(response);
		}, function() {
			defferedObj.resolve({errorMessage: "No Results Found or Some error occured"});
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
		lexRunQuery: lexRunQuery
	};
}]);