<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['user_id', 'title', 'description', 'category_id'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function assignCategory()
    {
        return $this->belongsTo('App/Category');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function assignToUser()
    {
        return $this->belongsTo('App/User');
    }
}
