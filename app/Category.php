<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'categories';

    public function todos()
    {
        return $this->hasMany('App/Todo');
    }
}
