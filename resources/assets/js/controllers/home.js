angular.module('todoApp')
    .controller('HomeController', HomeController);

HomeController.$inject = ['TodoService', '$scope', '$mdDialog', '$mdMedia'];

function HomeController(TodoService, $scope, $mdDialog, $mdMedia) {

    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

    TodoService.index().then(function successCallback(response) {
        $scope.todos = response.data;
    })

    TodoService.user().then(function successCallback(response) {
        $scope.userTodos = response.data;
    })

    TodoService.getCategories().then(function successCallback(response) {
        $scope.categories = response.data;
    });

    $scope.toggle = function (id, value) {
        value = value ? 0 : 1; // do the opposite
        TodoService.completed(id, value);

        changeCompleted(id, value);

    }

    $scope.checkCompleted = function (value) {
        return parseInt(value) ? true : false; // do the opposite
    }

    $scope.assignTodo = function (ev, id) {

        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;

        $mdDialog.show({
                controller: DialogController,
                templateUrl: '/html/dialog/template.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                locals : {
                    todo : TodoService.get(id),
                    categories: $scope.categories
                }
            })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });

    }


    function changeCompleted(id, value) {
        for (var i = 0; i < $scope.userTodos.length; i++) {
            if ($scope.userTodos[i].id == id) {
                $scope.userTodos[i].completed = value;
            }
        }
    }
}

function DialogController($scope, $mdDialog) {
    $scope.hide = function () {
        $mdDialog.hide();
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.answer = function (answer) {
        $mdDialog.hide(answer);
    };
}
