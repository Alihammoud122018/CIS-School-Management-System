<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $token = $request->cookie('jwt');
        
        if ($token) {
            try {
                // Set token manually for JWTAuth
                JWTAuth::setToken($token);
            } catch (JWTException $e) {
                return response()->json(['error' => 'Token is invalid or expired'], 401);
            }
        }

        return $next($request);
    }
}
