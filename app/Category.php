<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'categories';

    protected $fillable = ['title'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function todos()
    {
        return $this->hasMany('App\Todo');
    }
}
