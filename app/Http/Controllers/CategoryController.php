<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\Request;

use App\Http\Requests;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();

        return response()->json($categories, 200);
    }
    
    public function show()
    {

    }

    public function store()
    {

    }

    public function update()
    {

    }

    public function delete()
    {

    }
}
