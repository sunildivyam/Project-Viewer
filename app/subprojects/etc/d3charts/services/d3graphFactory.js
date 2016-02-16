angular.module('pvApp.d3charts.services')
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
}]);