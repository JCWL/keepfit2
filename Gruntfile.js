module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            // define the files to lint
            files: ['gruntfile.js', 'src/js/**/*.js', 'test/**/*.js'],
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                // more options here if you want to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            allInOne: { //所有JS文件全部合并成一份文件
                src: ['src/js/**/*.js'],
                dest: 'dest/src-concated/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                // 此处定义的banner注释将插入到输出文件的顶部
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd hh:MM:ss") %> by <%= pkg.author %> */\n'
            },
            buildConcatAllInOne: { // 把concat合并过的文件压缩
                options: {
                    mangle: true,
                    compress: {
                        drop_console: true
                    },
                    report: "min" //输出压缩率，可选的值有 false(不输出信息)，gzip
                },
                files: {
                    'dest/src-concated/<%= pkg.name %>.min.js': ['<%= concat.allInOne.dest %>']
                }
            },
            buildsrc: { //按照原来的目录结构压缩所有JS文件
                options: {
                    mangle: true,
                    compress: {
                        drop_console: true
                    },
                    report: "min" //输出压缩率，可选的值有 false(不输出信息)，gzip
                },
                files: [{
                    expand: true,
                    cwd: 'src/js', //js目录
                    src: '**/*.js', //所有js文件
                    dest: 'dest/src-min', //输出到此目录下
                    ext: '.min.js' //指定扩展名
                }]
            }
        },
        watch: {
            javascript: {
                files: ['src/js/*.js'],
                tasks: [ 'jshint', 'minall'],
                options: {
                    spawn: true,
                    interrupt: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('minall', ['concat', 'uglify']);
    grunt.registerTask('unittest', ['connect', 'qunit']);
    grunt.registerTask('test', ['jshint', 'qunit']);
    grunt.registerTask('full', ['jshint', 'qunit', 'concat', 'uglify']);
    grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};