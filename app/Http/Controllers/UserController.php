<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
 
Route::post('/sanctum/token', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
        'device_name' => 'required',
    ]);
 
    $user = User::where('email', $request->email)->first();
 
    if (! $user || ! Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }
 
    return $user->createToken($request->device_name)->plainTextToken;
});

// namespace App\Http\Controllers;
// use App\Models\User;
// use Hash;
// use Illuminate\Http\Request;

// class UserController extends Controller
// {
//    function index (Request $request) 
//    {
//         $user = User::where('email', $request->email)->first();
    
//             if (! $user || ! Hash::check($request->password, $user->password)) {
//                 return response([
//                     'message' => ['These Credentials do not match your records.']
//                 ], 404);
//             }
//             $token = $user->createToken('my-app-token')->plainTextToken;

//             $response = [
//                 'user' => $user,
//                 'token' => $token,
//             ];

//         return response($response, 201);

//    }
// } 
