(function(){module.exports=function(s){return s.initConfig({pkg:s.file.readJSON("package.json"),coffee:{compile:{files:{"js/vex.js":"coffee/vex.coffee","js/vex.dialog.js":"coffee/vex.dialog.coffee"}}},watch:{coffee:{files:["vex.coffee"],tasks:["coffee","uglify"]}},uglify:{vex:{src:"js/vex.js",dest:"js/vex.min.js",options:{banner:"/*! vex.js <%= pkg.version %> */\n"}},vexDialog:{dest:"js/vex.dialog.min.js",src:"js/vex.dialog.js",options:{banner:"/*! vex.dialog.js <%= pkg.version %> */\n"}},vexCombined:{dest:"js/vex.combined.min.js",src:["js/vex.js","js/vex.dialog.js"],options:{banner:"/*! vex.js, vex.dialog.js <%= pkg.version %> */\n"}}},compass:{dist:{options:{sassDir:"sass",cssDir:"css"}}}}),s.loadNpmTasks("grunt-contrib-watch"),s.loadNpmTasks("grunt-contrib-uglify"),s.loadNpmTasks("grunt-contrib-coffee"),s.loadNpmTasks("grunt-contrib-compass"),s.registerTask("default",["coffee","uglify"])}}).call(this);