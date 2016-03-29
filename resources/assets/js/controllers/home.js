angular.module('todoApp')
    .controller('HomeController', HomeController);

HomeController.$inject = ['TodoService', '$scope', '$mdDialog', '$mdMedia'];

function HomeController(TodoService, $scope, $mdDialog, $mdMedia) {

    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

    initFunction();

    function initFunction() {
        TodoService.index().then(function successCallback(response) {
            $scope.todos = response.data;
        })

        TodoService.getUsers().then(function successCallback(response) {
            $scope.users = response.data;
        })

        TodoService.user().then(function successCallback(response) {
            $scope.userTodos = response.data;
        })
    }

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

                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true,
                locals : {
                    id : id,
                    categories: $scope.categories,
                    users:$scope.users
                }
            })
            .then(function () {
                TodoService.index().then(function successCallback(response) {
                    $scope.todos = response.data;
                })

                TodoService.user().then(function successCallback(response) {
                    $scope.userTodos = response.data;
                })
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });

    }

    $scope.newTodo = function (ev) {

        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;

        $mdDialog.show({
                controller: DialogController,
                templateUrl: '/html/dialog/template.html',

                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true,
                locals : {
                    id: null,
                    categories: $scope.categories,
                    users:$scope.users
                }
            })
            .then(function () {
                TodoService.index().then(function successCallback(response) {
                    $scope.todos = response.data;
                })

                TodoService.user().then(function successCallback(response) {
                    $scope.userTodos = response.data;
                })
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

function DialogController($scope, $mdDialog, TodoService, id, categories, users) {

    if(id){
        TodoService.get(id).then(function successCallback(response) {
            $scope.todo = response.data;
        })
    }
    
    
    $scope.categories = categories;
    $scope.users = users;

    $scope.hide = function () {
        $mdDialog.hide();
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.delete = function (id) {
        TodoService.delete(id).then(function succesCallback(response) {
            $mdDialog.hide();
        })
    };

    $scope.save = function (todo) {
        if(todo.id) {
            TodoService.update(todo.id, todo).then(function succesCallback(response) {
                $mdDialog.hide();
            })
        }else {
            TodoService.save(todo).then(function succesCallback(response) {
                $mdDialog.hide();
            })
        }

    };
}
