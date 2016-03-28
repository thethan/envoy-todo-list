<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTodoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('todos', function ($table) {
            $table->string('id')->unique();
            $table->integer('user_id');
            $table->string('title');
            $table->text('description');
            $table->integer('category_id');
            $table->boolean('completed')->default(0);

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');

            $table->timestamps();

        });

        Schema::create('categories', function ($table) {
            $table->string('id')->unique();
            $table->string('title');
            $table->integer('category_id');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('todos', function(Blueprint $table){
            $table->dropForeign('todos_user_id_foreign');
            $table->dropForeign('todos_category_id_foreign');

        });

        Schema::drop('categories');
    }
}
