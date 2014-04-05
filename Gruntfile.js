/* jshint strict: true, devel: true  */

module.exports = function(grunt) {
    "use strict";
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        devPath: "application/development",
        prodPath: "application/deploy",
        concat: {
            js: {
                options: {
                    separator: ';'
                },
                src: [
                    'javascript/*.js'
                ],
                dest: 'public/js/main.min.js'
            }
        },
        //====================================================================
        uglify: {
            options: {
                mangle: false
            },
            js: {
                files: {
                    'public/js/main.min.js': ['public/js/main.min.js']
                }
            }
        },
        //====================================================================
        less: {
            style: {
                files: {
                    "<%= devPath %>/css/style.css": "<%= devPath %>/less/style.less"
                }
            }
        },
        //=====================================================================
        jshint: {
            files: ['Gruntfile.js', '<%= devPath %>/js/app/**/*.js', 'test/**/*.js']
        },
        //=====================================================================
        watch: {
            js: {
                files: ['<%= jshint.files %>'],
                tasks: ['jshint']
            },
            css: {
                files: ['<%= devPath %>/less/*.less'],
                tasks: ['less:style']
            },
            all: {
                options: {
                    livereload: true
                },
                files: ['<%= devPath %>/index.html', '<%= devPath %>/css/**/*.css', '<%= devPath %>/js/app/**/*.js']
            }
        },
        //===================================================================
        express: {
            all: {
                options: {
                    port: 9000,
                    hostname: "localhost",
                    bases: ['./application/development/'],
                    livereload: true
                }
            }
        }
    });

    //REGISTER TASKS
    grunt.registerTask('watchFiles', ['watch']);
    grunt.registerTask('server', ['express', 'watch']);
};