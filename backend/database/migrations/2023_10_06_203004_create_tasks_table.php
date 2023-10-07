<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->biginteger('user_id');
            $table->string('plate_number');
            $table->string('service_date');
            $table->integer('service_time');
            $table->integer('aircondition_service');
            $table->integer('brake_service');
            $table->integer('carwash');
            $table->integer('oil_change');
            $table->integer('tire_service');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
};
