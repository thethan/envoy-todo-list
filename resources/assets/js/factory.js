angular.module('todoApp')
    .service('AuthService', AuthService);

AuthService.$inject = ['$http', '$state', '$rootScope'];

function AuthService($http, $state, $rootScope) {

    var service = {
        isAuthenticated : isAuthenticated,
        login: login
    }
    
    function isAuthenticated() {
        return false;
    }
    
    function login($email, $password) {
        return $http({
            method: 'PUT',
            url: '/login',
            data: {
                "email":$email,
                "password":$password
            }
        }).then(function successCallback(response) {
            $rootScope.user = response.data;
            $state.transitionTo("dashboard");

        }, function errorCallback(response) {

        });
    }
    
    return service;
    
}