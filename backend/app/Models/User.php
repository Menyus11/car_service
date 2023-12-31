<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    function setPasswordAttribute($data)
    {
        $this->attributes['password'] = bcrypt($data);
    }

    function setNameAttribute($data)
    {
        $this->attributes['name'] = mb_convert_case($data, MB_CASE_TITLE, "UTF-8");
    }

    function vehicles()
    {
        return $this->hasMany(Vehicle::class);
    }

    function tasks()
    {
        return $this->hasMany(Task::class);
    }

}
