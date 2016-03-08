angular.module('pvApp.highcharts.services')
.service('dataExplorerService', ['$q', '$http', function($q, $http){
	var _localCache = {
		"_chartTypes": {
			"url": "subprojects/data/dataexplorer/chart-types.json",
			"data": []
		},
		"_chartData": {
			"url": "subprojects/data/dataexplorer/chart-data.json",
			"data": {}
		}
	};

	function isCached(data) {
		if (typeof data !== "array" || typeof data !== "object" || (typeof data === 'array' && data.length===0) || (typeof data === 'object' && Object.keys(data)===0)) {
			return false;
		}
		return true;
	}

	function getFromCacheOrAjax(localCacheObj, forced) {
		var defferedObj = $q.defer();

		if (forced===true || !isCached(localCacheObj.data)) {
			$http.get(localCacheObj.url).then(function(response) {
				localCacheObj.data = response.data || (typeof response.data==="array" ? [] : {});
				defferedObj.resolve(localCacheObj.data);
			}, function(error) {
				localCacheObj.data = [];
				defferedObj.resolve(localCacheObj.data);
			});
		} else {
			defferedObj.resolve(localCacheObj.data);
		}
		return defferedObj.promise;
	}

	function getChartTypes(forced) {
		return getFromCacheOrAjax(_localCache._chartTypes, forced);
	}

	function getChartData(forced) {
		return getFromCacheOrAjax(_localCache._chartData, forced);
	}

	return {
		getChartTypes: getChartTypes,
		getChartData: getChartData
	};
}]);



/*
chart types




*/