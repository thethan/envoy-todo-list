angular.module('todoApp')
    .service('AuthService', AuthService);

AuthService.$inject = ['$http', '$state', '$rootScope'];

function AuthService($http, $state, $rootScope) {

    var service = {
        isAuthenticated : isAuthenticated,
        login: login
    }
    
    function isAuthenticated() {
        var api_token = localStorage.getItem('api_token');
        if($rootScope.user){
            api_token = $rootScope.user.api_token;
        }
        return $http({
            method: 'GET',
            url: 'authenticated?api_token='+api_token,
            headers : { 'Content-Type': 'application/json' }
        }).then(function successCallback(response) {
                console.log('success');
                return true;
            }, function errorCallback(response) {
            console.log('error');
            $state.go('login');

            return false;
        });
    }
    
    function login($email, $password) {
        return $http({
            method: 'POST',
            url: 'login',
            data: {
                "email":$email,
                "password":$password,
                "_method":"PUT"
            },
            headers : { 'Content-Type': 'application/json' }

        });
    }
    
    return service;
    
}