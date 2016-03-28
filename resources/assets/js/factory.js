angular.module('todoApp')
    .service('AuthService', AuthService);

AuthService.$inject = ['$http'];

function AuthService($http) {

    var service = {
        isAuthenticated : isAuthenticated
    }
    
    function isAuthenticated() {
        
    }

    return service;
    
}