angular.module('pvApp.d3charts.services')
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
}]);