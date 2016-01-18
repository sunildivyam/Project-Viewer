angular.module('pvApp.d3charts.services')
.service('d3chartsService', ['$q', '$http', function($q, $http){
	var urls = {
		"graphData": "subprojects/data/d3charts/graph-data.json"
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

	return {
		getGraphData: fetchGraphData
	};
}]);