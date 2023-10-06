<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{

    function register(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|min:3|max:255',
                'email' => 'required|email|max:255|unique:users',
                'password' => 'required|string|min:8|max:25|confirmed'
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Registration failed!',
                'errors' => $e->errors(),
            ], 422);
        }

        $user = User::create($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'A regisztráció sikeres, beléphetsz!',
            'user' => $user
        ], 201);
    }


    function login(Request $request) {

        $user = User::where('email', $request->email)->first();
    
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'A belépés sikertelen!',
            ], 401);
        }
    
        $token = $user->createToken($user['name'] . ' device_token')->plainTextToken;
    
        return response()->json([
            'status' => 'success',
            'message' => 'A belépés sikeres!',
            'token' => $token,
            'user' => $user,
        ], 201);
    }

     function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Logout successful!',
        ], 201);
    } 

    function profileupdate(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:3|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $request->user()->id,
            'password' => 'nullable|string|min:8|max:25'
        ]);

        $user = $request->user();

        $user->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'A profilod sikeresen frissült!',
            'user' => $user
        ], 201);
    }

}
