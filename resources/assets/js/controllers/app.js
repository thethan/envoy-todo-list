angular.module('todoApp')
    .controller('AppController', AppController);

AppController.$inject = ['$rootScope','$scope'];

function AppController($rootScope, $scope ) {
    $scope.errors = [];

    $scope.$watch($rootScope.errors, function() {
        $scope.errors = $rootScope.errors;
        console.log($scope.errors);
    }, true);
}