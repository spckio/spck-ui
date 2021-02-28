
module.exports = function(grunt) {

  grunt.initConfig({
    webfont: {
      icons: {
        src: 'fonts/svg/*.svg',
        dest: 'dist',
        options: {
          font: 'spck-ui-icons',
          syntax: 'bootstrap',
          stylesheets: ['css'],
          htmlDemo: false,
          embed: true,
          types: 'ttf,woff',
          templateOptions: {
            classPrefix: 'sp-icon-'
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-webfont');


  grunt.registerTask('default', ['webfont']);

};
