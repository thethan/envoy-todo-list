var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.scripts([
        '../../../bower_components/angular/angular.min.js',
        '../../../bower_components/angular-animate/angular-animate.min.js',
        '../../../bower_components/angular-aria/angular-aria.min.js',
        '../../../bower_components/angular-messages/angular-messages.min.js',

        '../../../bower_components/angular-material/angular-material.min.js',
        '../../../bower_components/angular-ui-router/release/angular-ui-router.js',

    ], 'public/assets/js/vendor.js')
    .scripts([
        'config.js',
        'factory.js',
        'controllers/*',
    ]);
    mix.sass([
        '../../../bower_components/angular-material/angular-material.scss',
    ],'public/assets/css/vendor.css');
    mix.sass('app.scss');

    mix.version(['css/app.css', 'js/all.js']);
});
