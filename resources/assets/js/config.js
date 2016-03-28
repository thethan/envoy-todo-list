angular.module('todoApp', [ 'ngMaterial', 'ui.router'])
    .config(config)
    .run(checkAuth);

function config($stateProvider, $urlRouterProvider) {

    //
    // Now set up the states
    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "/html/auth/login.html",
            controller: "AuthenticationController",
        })
        .state('dashboard', {
            url: "/",
            templateUrl : "/html/auth/home.html",
            controller: "HomeController",
            authenticate: true
        });
    
    $urlRouterProvider
        .otherwise("/login");
}

function checkAuth($rootScope, $state, AuthService) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
        if (toState.authenticate && !AuthService.isAuthenticated()){
            $state.transitionTo("login");
            event.preventDefault();
        }
    })
}