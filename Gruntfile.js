module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig ({

        jshint: {
            all: [
                'Gruntfile.js',
                'angular/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['build', 'build/js']
        },

        'angular-builder': {
            options: {
                mainModule: 'app'
            },
            app: {
                src: 'angular/**/*.js',
                dest: 'build/js/scripts.js'
            }
        },

        concat: {
            'test-assets': {
                src: 'styles/*.css',
                dest: 'build/css/styles.css'
            }
        },

        replace: {
            replaceHtml: {
                src: ['index.html'],
                dest: 'build/',
                replacements: [{
                    from: /<script([^<]*)<\/script>/g,
                    to: ''
                }, {
                    from: /<link([^<]*)>/g,
                    to: ''
                }, {
                    from: '<!-- Angular js file -->',
                    to: '<script src="js/angular.js"></script>'
                }, {
                    from: '<!-- Develop js file -->',
                    to: '<script src="js/scripts.js"></script>'
                }, {
                    from: '<!-- Develop css file -->',
                    to: '<link rel="stylesheet" type="text/css" href="css/styles.css">'
                }]
            }
        },

        uglify: {
            dist: {
                options: {
                    compress: {},
                    mangle: true
                },
                files: {
                    'build/js/scripts.js': 'build/js/scripts.js'
                }
            }
        },
        // todo remove the copy angular later
        copy: {
            main: {
                expand: true,
                cwd: 'node_modules/angular/',
                src: 'angular.js',
                dest: 'build/js/',
                flatten: true,
                filter: 'isFile'
            }
        }

    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks ('grunt-contrib-jshint');
    grunt.loadNpmTasks ('grunt-contrib-clean');
    grunt.loadNpmTasks ('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks ('grunt-angular-builder');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Test tasks below can also be executed with the command line option `--build debug` to generate debug builds.


    grunt.registerTask ('release', ['clean', 'jshint', 'concat', 'replace', 'angular-builder', 'uglify', 'copy']);
    grunt.registerTask ('debug', ['clean', 'concat', 'replace', 'angular-builder', 'copy']);

};