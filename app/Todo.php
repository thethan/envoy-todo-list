<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Todo extends Model
{
    use SoftDeletes;
    
    protected $dates = ['deleted_at'];
    /**
     * @var array
     */
    protected $fillable = ['user_id', 'title', 'description', 'category_id'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category()
    {
        return $this->belongsTo('App\Category');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function assignToUser()
    {
        return $this->belongsTo('App\User');
    }
}
