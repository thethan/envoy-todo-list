angular.module('todoApp')
    .service('TodoService', TodoService);

TodoService.$inject = ['$http', '$state', '$rootScope'];

function TodoService($http, $state, $rootScope) {

    var service = {
        getCategories: getCategories,
        index : index,
        get: get,
        save: save,
        update: update,
        delete: deleteTodo,
        user: user,
        completed:completed
    }

    function getCategories() {
        return $http({
            method: 'GET',
            url: 'api/categories'+getApiToken(),
            headers : { 'Content-Type': 'application/json' }
        });

    }
    
    function index() {

        return $http({
            method: 'GET',
            url: 'api/todos'+getApiToken(),
            headers : { 'Content-Type': 'application/json' }
        });


    }

    function user() {
        return $http({
            method: 'GET',
            url: 'api/todos/user'+getApiToken(),
            headers : { 'Content-Type': 'application/json' }
        });
    }
    
    function get(id) {
        return $http({
            method: 'GET',
            url: 'api/todos/'+id+getApiToken(),
            headers : { 'Content-Type': 'application/json' }

        });
    }

    function save(data) {
        return $http({
            method: 'POST',
            url: 'api/todos'+getApiToken(),
            data: data,
            headers : { 'Content-Type': 'application/json' }

        });
    }

    function update(id, data) {
        return $http({
            method: 'POST',
            url: 'api/todos/'+id+getApiToken(),
            data: data,
            headers : { 'Content-Type': 'application/json' }

        });
    }

    function completed(id, value) {
        return $http({
            method: 'POST',
            url: 'api/todos/'+id+getApiToken(),
            headers : { 'Content-Type': 'application/json' },
            data:{
                "_method":"PUT",
                "completed":value
            }

        });
    }

    function deleteTodo(id){
        return $http({
            method: 'POST',
            url: 'api/todos/'+id+getApiToken(),
            headers : { 'Content-Type': 'application/json' }

        });
    }

    function getApiToken() {
        var api_token = localStorage.getItem('api_token');
        if($rootScope.user){
            api_token = $rootScope.user.api_token;
        }

        return "?api_token="+api_token;
    }
    
    return service;
    
}