/*

TO DO

1) Reduce CSS duplication
   - Ideally just a single build - global.scss turns into /build/global.css
   - Can Autoprefixer output minified?
   - If it can, is it as good as cssmin?
   - Could Sass be used again to minify instead?
   - If it can, is it as good as cssmin?

2) Better JS dependency management
   - Require js?
   - Can it be like the Asset Pipeline where you just do //= require "whatever.js"

3) Is HTML minification worth it?

4) Set up a Jasmine test just to try it.

5) Can this Gruntfile.js be abstracted into smaller parts?
   - https://github.com/cowboy/wesbos/commit/5a2980a7818957cbaeedcd7552af9ce54e05e3fb

*/

module.exports = function(grunt) {

    // Utility to load the different option files
    // based on their names
    function loadConfig(path) {
        var glob = require('glob');
        var object = {};
        var key;

        glob.sync('*', {
            cwd: path
        }).forEach(function(option) {
            key = option.replace(/\.js$/, '');
            object[key] = require(path + option);
        });

        return object;
    }

    //grunt.log.write('gruntfile');

    // Initial config
    var config = {
        pkg: grunt.file.readJSON('package.json')
    }

    //grunt.log.write(JSON.stringify(grunt.file.readJSON('package.json')));

    grunt.loadNpmTasks('grunt-wiredep');

    // Load tasks from the tasks folder
    grunt.loadTasks('tasks');

    // Load all the tasks options in tasks/options base on the name:
    // watch.js => watch{}
    grunt.util._.extend(config, loadConfig('./tasks/options/'));



    grunt.initConfig(config);

   
    require('load-grunt-tasks')(grunt);

    // Default Task is basically a rebuild
    grunt.registerTask('default', ['uglify', 'sass', 'wiredep']);

  

    /**
     *
     * Dynamic sass mapping
     *
     */

    grunt.registerTask("custom-sass", "custom sass compiler", function() {


        grunt.file.expand("../sass/pages/*").forEach(function(dir) {
            var sass = grunt.config.get('sass') || {};

            var name = dir.substr(dir.lastIndexOf('/') + 1);

            sass[dir] = {

                files: {
                    ['../css/' + name + '.css']: ['' + dir + '/*.scss'], ['../css/global.css']: ['../sass/global/global.scss']
                },
                options: {
                    style: 'compressed'
                }
            }

            grunt.config.set('sass', sass);
        });

        grunt.task.run('sass');

    });



};
