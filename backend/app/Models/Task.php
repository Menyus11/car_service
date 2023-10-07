<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'plate_number',
        'service_date',
        'service_time',
        'aircondition_service',
        'brake_service',
        'carwash',
        'oil_change',
        'tire_service',
    ];

    function user()
    {
        return $this->belongsTo(User::class);
    }
}
