angular.module('pvApp.highcharts.services')
.service('dataExplorerService', ['$q', '$http', function($q, $http){
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
}]);