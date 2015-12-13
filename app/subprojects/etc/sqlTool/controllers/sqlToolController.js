angular.module('pvApp.sqlTool.controllers')
.controller('sqlToolController', ['$scope', '$templateCache', function($scope, $templateCache){
	$scope.table = {
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
	};
}]);