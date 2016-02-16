angular.module('pvApp.sqlTool.services')
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