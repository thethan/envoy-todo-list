<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    protected $fillable = ['user_id', 'title', 'description', 'category_id'];

    public function assignCategory()
    {
        return $this->belongsTo('App/Category');
    }

    public function assignToUser()
    {
        return $this->belongsTo('App/User');
    }
}
