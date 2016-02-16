/* Gruntfile Config */

module.exports = function(grunt) {
	grunt.initConfig({
		scriptsRootPath: 'app/subprojects/etc',
		distScriptsPath: 'app/dist/scripts',
		distReportsPath: 'app/dist/reports',
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
			options: {
				banner: '/* <%=pkg.name%>.js | Created on <%=grunt.template.today("dd/mm/yyyy")%> */\n',
				separator: ';'
			},
			dist : {
				src: [
					'<%=scriptsRootPath%>/**/*.js',
					'<%=scriptsRootPath%>/**/**/*.js'
				],
				dest: '<%=distScriptsPath%>/<%=pkg.name%>.js'
			}
		},
		uglify: {
			options: {
				banner: '/* <%=pkg.name%>.min..js | Created on <%=grunt.template.today("dd/mm/yyyy")%> */\n',
				compress: true,
				mangle: true
			},
			dist: {
				files: {
					'<%=distScriptsPath%>/<%=pkg.name%>.min.js': ['<%=concat.dist.dest%>']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
	grunt.registerTask('test', ['jshint']);
	grunt.registerTask('minify', ['concat','uglify']);
};