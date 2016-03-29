<?php

namespace App\Http\Controllers;

use App\Category;
use App\Todo;
use App\User;
use App\Http\Requests\TodoRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Http\Requests;

class TodosController extends Controller
{

    /**
     * @return mixed
     */
    public function index()
    {
        $todos = Todo::all();

        return response()->json($todos, 200);
    }

    /**
     * @param $id
     * @return mixed
     */
    public function show($id)
    {
        $todo = Todo::find($id);

        return response()->json($todo, 200);
    }

    /**
     * @return mixed
     */
    public function user()
    {
        $user = Auth::guard('api')->user();

        return response()->json($user->todos, 200);
    }

    /**
     * @param TodoRequest $todoRequest
     * @return mixed
     */
    public function store(TodoRequest $todoRequest)
    {
        $request = $todoRequest->except(['category_name', 'api_token']);

        if($todoRequest->get('category_name')){
            $category = new Category(['title' => $todoRequest->get('category_name')]);
            $category->save();
            $request['category_id'] = $category->id;
        }

        $todo = new Todo($request);
        $todo->save();

        return response()->json(null, 204);

    }

    /**
     * @param TodoRequest $todoRequest
     * @param $id
     * @return mixed
     */
    public function update(TodoRequest $todoRequest, $id)
    {
        $request = $todoRequest->except(['_method', 'category_name', 'api_token']);

        if($todoRequest->get('category_name')){
            $category = new Category(['title' => $todoRequest->get('category_name')]);
            $category->save();
            $request['category_id'] = $category->id;
        }

        $todo =  Todo::find($id);
        foreach ($request as $key => $value){
            $todo->$key = $value;
        }
        $todo->save($request);
        return response()->json(null, 204);
    }

    /**
     * @param $id
     * @return mixed
     */
    public function delete($id)
    {
        $todo = Todo::find($id);
        $todo->delete();

        return response()->json(null, 204);
    }

    /**
     * @param Request $request
     * @param $id
     * @return mixed
     */
    public function completed(Request $request, $id)
    {
        $todo = Todo::find($id);
        $todo->completed = $request->get('completed');
        $todo->save();

        return response()->json(null, 204);

    }


}
