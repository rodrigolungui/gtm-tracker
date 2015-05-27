module.exports = function(grunt) {
  'use strict';

  var paths = {
    dist: './dist',
    src: './src/gtm-tracker.js'
  };

  grunt.initConfig({
    pkg: require('./package'),

    build: (function() {
      var build = { };

      build.scripts = ['jshint', 'uglify'];

      return build;
    })(),

    jshint: {
      files: paths.src
    },

    uglify: {
      main: {
        options: {
          beautify: false
        },
        files: {
          'dist/gtm-tracker.min.js': 'src/gtm-tracker.js'
        }
      }
    },

    watch: {
      options: {
        interrupt: true,
        spawn: false
      },
      js: {
        files: [paths.src],
        tasks: ['uglify']
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerMultiTask('build', function() {
    grunt.task.run(this.data);
  });
};