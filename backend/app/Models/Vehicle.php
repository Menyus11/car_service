<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'plate_number',
        'brand',
        'type',
    ];

    function user()
    {
        return $this->belongsTo(User::class);
    }

    function setPlateNumberAttribute($data)
    {
        $this->attributes['plate_number'] = mb_strtoupper($data);
    } 

    function setBrandAttribute($data)
    {
        $this->attributes['brand'] = mb_convert_case($data, MB_CASE_TITLE, "UTF-8");
    }

    function setTypeAttribute($data)
    {
        $this->attributes['type'] = mb_convert_case($data, MB_CASE_TITLE, "UTF-8");
    }
}
