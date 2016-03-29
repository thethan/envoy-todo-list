angular.module('todoApp')
    .controller('AuthenticationController', AuthenticationController);

AuthenticationController.$inject = ['$rootScope', '$scope', '$state', 'AuthService'];

function AuthenticationController($rootScope, $scope, $state, AuthService) {
    $scope.errors = [];
    $scope.submitLogin = function (event) {
        console.log($scope.email);
        AuthService.login($scope.email, $scope.password)
            .then(function successCallback(response) {
                $rootScope.user = response.data;
                localStorage.setItem('api_token', $rootScope.user.api_token);
                $state.go('dashboard');
                window.location.href = '/';

            }, function errorCallback(response) {
                $rootScope.errors = response.data;
                $scope.errors = $rootScope.errors;
            });
    }


    $scope.$watch($rootScope.errors, function () {
        $scope.errors = $rootScope.errors;
    }, true);

}