<?php

namespace App\Http\Controllers;

use App\Services\Weather\BcnWeatherService;
use Illuminate\Http\JsonResponse;

class WeatherController extends Controller
{
    public function bcn(BcnWeatherService $weatherService): JsonResponse
    {
        $result = $weatherService->getCurrent();

        if ($result === null) {
            return response()->json([
                'ok' => false,
                'error' => 'WEATHER_UNAVAILABLE',
            ], 503);
        }

        return response()->json([
            'ok' => true,
            'data' => $result,
        ]);
    }
}
