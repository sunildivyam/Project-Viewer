/* Gruntfile Config */

module.exports = function(grunt) {
	grunt.initConfig({
		scriptsRootPath: 'app/subprojects/etc',

		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: {

			},
			cwd: '<%=scriptsRootPath%>',
			files: [
				'Gruntfile.js',
				'/**/*.js',
				'/**/**/*.js'
			]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default', ['jshint']);
	grunt.registerTask('test', ['jshint']);
};