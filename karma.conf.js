module.exports = function (config) {
  config.set({

    basePath: './',

    logLevel: config.LOG_DEBUG,

    files: [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/uikit/js/uikit.js',
      'bower_components/uikit/js/components/autocomplete.js',
      'bower_components/uikit/js/components/notify.js',
      'src/spck-ui.js',
      'src/spck-ui.spec.js'
    ],

    exclude: [
    ],

    reporters: ['progress', 'coverage'],

    preprocessors: {
      'spck-ui.js': ['coverage']
    },

    autoWatch: false,

    frameworks: ['jasmine'],

    browsers: ['PhantomJS'],

    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-coverage'
    ]
  });
};
