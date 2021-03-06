<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::group(['middleware' => 'web'], function () {

    Route::get('/', function () {
        return view('welcome');
    });


});

Route::put('login', 'Auth\AuthController@loginJson');

Route::group(['middleware' => 'auth:api'], function () {

    Route::get('/authenticated', function () {
        return response(null, 204);
    });

    Route::group(['prefix' => 'api'], function () {

        Route::get('categories', 'CategoryController@index');

        Route::get('users', 'UsersController@index');

        Route::get('todos', 'TodosController@index');

        Route::get('todos/user', 'TodosController@user');

        Route::get('todos/{id}', 'TodosController@show');

        Route::post('todos', 'TodosController@store');

        Route::put('todos/{id}', 'TodosController@update');

        Route::put('todos/{id}/completed', 'TodosController@completed');

        Route::delete('todos/{id}', 'TodosController@delete');

    });

});
