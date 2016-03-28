angular.module('todoApp')
    .controller('AuthenticationController', AuthenticationController);

AuthenticationController.$inject = ['$scope', 'AuthService'];

function AuthenticationController($scope, AuthService) {
    
    $scope.submitLogin = function() {
        console.log($scope.email);
        return AuthService($scope.email, $scope.password);
    }

}