angular.module('pvApp.sqlTool.controllers')
.controller('tablesController', ['$scope', function($scope){
	$scope.currentTables = [
		{
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
		},
		{
			"id"			: "2",
			"name"			: "modules",
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
		},
		{
			"id"			: "3",
			"name"			: "programs",
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
		},
		{
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
		},
		{
			"id"			: "2",
			"name"			: "modules",
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
		},
		{
			"id"			: "3",
			"name"			: "programs",
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
		}
	];
}]);