angular.module('todoApp', [ 'ngMaterial', 'ui.router'])
    .config(config)
    .run(checkAuth);


function config($mdIconProvider, $stateProvider, $urlRouterProvider) {

    $mdIconProvider
        .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
        .iconSet('device', 'img/icons/sets/device-icons.svg', 24)
        .iconSet('communication', 'img/icons/sets/communication-icons.svg', 24)

    // Now set up the states
    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "/html/auth/login.html",
            controller: "AuthenticationController",
            authenticate: false
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
        console.log(toState.authenticate, AuthService.isAuthenticated());
        console.log(toState);
        if (toState.authenticate === true && !AuthService.isAuthenticated().value === false){
            console.log('ethan');
            $state.go("login");
            event.preventDefault();
        }
        
    })
}