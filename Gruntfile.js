/* Gruntfile Config */

module.exports = function(grunt) {
	grunt.initConfig({
		scriptsRootPath: 'app/subprojects/etc',
		distScriptsPath: 'app/dist/scripts',
		distReportsPath: 'app/dist/reports',
		externalScriptsPath: 'app/bower_components',

		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: {
				reporterOutput: '<%=distReportsPath%>/jshint-report.txt',
				force: true
			},
			files: [
				'Gruntfile.js',
				'<%=scriptsRootPath%>/**/*.js',
				'<%=scriptsRootPath%>/**/**/*.js'
			]
		},
		concat: {
			distProjectJS : {
				options: {
					banner: '/* <%=pkg.name%>.js | Created on <%=grunt.template.today("dd/mm/yyyy")%> */\n',
					separator: ';'
				},
				src: [
					'<%=scriptsRootPath%>/*/*.js',
					'<%=scriptsRootPath%>/*/*/*.js'
				],
				dest: '<%=distScriptsPath%>/<%=pkg.name%>.js'
			},
			distExternalJS : {
				options: {
					banner: '/* <%=pkg.name%>-externals.js | Created on <%=grunt.template.today("dd/mm/yyyy")%> */\n',
					separator: ';'
				},
				src: [
					'<%=externalScriptsPath%>/jquery/dist/jquery.js', 	//JQuery
					'<%=externalScriptsPath%>/angular/angular.js',	// Angular JS
					'<%=externalScriptsPath%>/angular-ui-router/release/angular-ui-router.js',// Angular UI Router
					'<%=externalScriptsPath%>/angular-ui-router.stateHelper/statehelper.js',// Angular UI Router State Helper
					'<%=externalScriptsPath%>/tinyscrollbar/jquery.tinyscrollbar.js',	// tiny Scrollbar Plugin
					'<%=externalScriptsPath%>/d3/d3.js',	// D3 JS
					'<%=externalScriptsPath%>/d3-tip/index.js'	// D3 tip (tooltip) Plugin
				],
				dest: '<%=distScriptsPath%>/<%=pkg.name%>-externals.js'
			}
		},
		uglify: {
			options: {
				compress: true,
				mangle: true
			},
			distProjectJS: {
				options: {
					banner: '/* <%=pkg.name%>.min.js | Created on <%=grunt.template.today("dd/mm/yyyy")%> */\n'
				},
				files: {
					'<%=distScriptsPath%>/<%=pkg.name%>.min.js': ['<%=concat.distProjectJS.dest%>']
				}
			},
			distExternalJS: {
				options: {
					banner: '/* <%=pkg.name%>-externals.min.js | Created on <%=grunt.template.today("dd/mm/yyyy")%> */\n'
				},
				files: {
					'<%=distScriptsPath%>/<%=pkg.name%>-externals.min.js': ['<%=concat.distExternalJS.dest%>']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
	grunt.registerTask('test', ['jshint']);
	grunt.registerTask('minifyexternaljs', ['concat:distExternalJS','uglify:distExternalJS']);
	grunt.registerTask('minifyprojectjs', ['concat:distProjectJS','uglify:distProjectJS']);
	grunt.registerTask('minify', ['concat','uglify']);

};