<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Auth::viaRequest('custom-token', function (Request $request) {
            $header = $request->header('Authorization');
            $token = Str::of($header)->explode(' ')[1];
            $decodedToken = base64_decode(decrypt($token));
            [$email, $password] = explode(':', $decodedToken);

            $user = User::query()->where('email', $email)->first();
            if (is_null($user)) {
                throw new AccessDeniedHttpException;
            }

            if (!Hash::check($password, $user->password)) {
                throw new AccessDeniedHttpException;
            }

            return $user;
        });
    }
}
