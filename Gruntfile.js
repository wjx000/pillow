/**
 * 自动打包压缩
 * @param grunt
 */
module.exports = function(grunt) {
    /**
     * 与文件名对应
     * @type {string}
     */
    var packageName = 'package',
        version = '<%= '+ packageName +'.version %>',
        name = '<%= '+ packageName +'.name %>',
        author = '<%= '+ packageName +'.author %>',
        page = '<%= '+ packageName +'.page %>',
        description = '<%= '+ packageName +'.description %>',
        buildPath = 'build',
        srcPath = 'src',
        binPath = 'bin',
        cfgFile = packageName + '.json',
        JS = '.js',
        buildTime = grunt.template.today("yyyy-mm-dd H:MM:ss"),
        banner = [
            '/* ================================================================\n',
                ' * '+ name +'.js v'+ version +'\n',
                ' *\n',
                ' * '+ description +'\n',
                ' * Latest build : '+ buildTime +'\n',
                ' *\n',
                ' * ' + page + '\n',
                ' * ================================================================\n',
                ' * Copyright 2013 '+ author +'\n',
                ' *\n',
                ' * Licensed under the MIT License\n',
                ' * You may not use this file except in compliance with the License.\n',
                ' *\n',
                ' * ================================================================ */\n\n'
        ].join(''),
        tinyBanner = '/*! '+name + ' v' + version + ' ' + author + ' ' + buildTime + ' */\n';
    /**
     * 创建配置
     */
    function fileQuery(){
        var arr = [];
        var q = 'intro util/* notify/* event/* render/base/* render/elements/* tool/* outro';
        q.split(' ').forEach(function(i){
            arr.push(srcPath + '/' + i + JS);
        });
        return arr;
    }
    var config = {
        /**
         *  导入配置文件
         */
        package: grunt.file.readJSON(cfgFile),
        banner: banner,
        replace: {
            version: {
                src: 'src/outro.js',
                overwrite: true,
                replacements: [{
                    from: /exports.version\s*=\s*\'\d+.\d+.\d\'/g,
                    to: 'exports.version = "' + version + '"'
                }]
            }
        },
        concat: {
            options: {
                stripBanners: true,
                banner: banner,
            },
            build: {
                src: fileQuery(),
                dest : buildPath + '/' + name + JS
            },
            bin:{
                src :[buildPath + '/' + name + JS],
                dest : binPath + '/' + name + JS
            }
        },
        uglify: {
            options: {
                banner: tinyBanner,
                sourceMap: buildPath + '/' + name + ".map"
            },
            build: {
                src: buildPath + '/' + name + JS,
                dest: buildPath + '/' + name +'.min' + JS
            }
        },
        watch:{
            watch: {
                files: ['src/*','src/event/*','src/render/elements/*','src/render/base/*','src/tool/*'],
                tasks: ['replace','concat','uglify']
            }
        }
    };
    grunt.initConfig(config);
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.registerTask('default',['concat','uglify','replace','watch']);
};
/* vim: set sw=4 ts=4 et tw=80 : */

