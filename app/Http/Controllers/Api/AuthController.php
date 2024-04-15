<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\auth\RegisterRequest;
use App\Models\User;
use Hash;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        return response()->json([
            'user' => $user,
            'token' => $user->createToken('laravel_token')->plainTextToken,
            'message' => 'Registration Successfull. And You can login with your credentials'
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);
        $user = User::where('email', $request->email)->first();
            
            if (! $user || ! Hash::check($request->password, $user->password)) {
                return response([
                    'message' => ['These Credentials do not match your records.']
                ], 404);
            }

        return response()->json([
            'user' => $user,
            'token' => $user->createToken('laravel_token')->plainTextToken,
            'message' => 'Login Successfull'
        ]);
           
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();

        return redirect()->route('login');
    }
    
}
