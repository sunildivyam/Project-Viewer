angular.module("pvApp.highcharts.services")
.service('configService', [function(){
	var config = {
		DEFAULT_CHART_TYPE: "line"
	};

	function getConfig() {
		return config;
	}

	return {
		getConfig: getConfig
	};
}]);