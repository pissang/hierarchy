{
    // appDir: './',
    baseUrl: '../',
    // optimize: 'none',

    paths: {
        'glmatrix': '../qtek/thirdparty/gl-matrix'
    },
    packages: [
        {
            name: 'zrender',
            location: '../zrender/src',
            main: 'zrender'
        },
        {
            name: 'echarts',
            location: '../echarts/src',
            main: 'echarts'
        },
        {
            name: 'qtek',
            location: '../qtek/src',
            main: 'qtek'
        }
    ],
    include: ['zrender/tool/vector', 'js/index'],

    out: '../release.js',

    onBuildWrite : function(moduleName, path, content){
        // Remove the text plugin and convert to a normal module
        // Or the text plugin will have some problem when optimize the project based on qtek which also has a text plugin
        // https://groups.google.com/forum/?fromgroups#!msg/requirejs/jiaDogbA1EQ/jKrHL0gs21UJ
        // http://stackoverflow.com/questions/10196977/how-can-i-prevent-the-require-js-optimizer-from-including-the-text-plugin-in-opt
        content = content.replace(/define\([\'\"]text\!(.*?)[\'\"]/g, "define('$1'");
        // in dependencies
        content = content.replace(/define\((.*?)\[(.*?)\]/g, function(str, moduleId, dependencies){
            dependencies = dependencies.split(",");
            for(var i = 0; i < dependencies.length; i++){
                if(dependencies[i]){
                    dependencies[i] = dependencies[i].replace(/[\'\"]text\!(.*?)[\'\"]/, "'$1'");
                }
            }
            return "define(" + moduleId + "[" + dependencies.join(",") + "]";
        })
        content = content.replace(/require\([\'\"]text\!(.*?)[\'\"]\)/g, "require('$1')");
        return content;
    }
}