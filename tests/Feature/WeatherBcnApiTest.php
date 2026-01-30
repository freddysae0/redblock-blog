<?php

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

it('returns current Barcelona weather', function () {
    Cache::flush();

    Http::fake([
        'api.open-meteo.com/*' => Http::response([
            'current' => [
                'time' => '2022-01-01T15:00',
                'temperature_2m' => 18.4,
                'wind_speed_10m' => 11.9,
            ],
        ], 200),
    ]);

    $response = $this->getJson('/api/weather/bcn');

    $response->assertOk();
    $response->assertJsonPath('ok', true);
    $response->assertJsonPath('data.city', 'Barcelona');
    $response->assertJsonPath('data.time', '2022-01-01T15:00');
    $response->assertJsonPath('data.temperatureC', 18.4);
    $response->assertJsonPath('data.windSpeedKmh', 11.9);
    $response->assertJsonPath('data.comment', 'Pleasant and breezy');
});

it('returns 503 when weather provider fails', function () {
    Cache::flush();

    Http::fake([
        'api.open-meteo.com/*' => Http::response([], 500),
    ]);

    $response = $this->getJson('/api/weather/bcn');

    $response->assertStatus(503);
    $response->assertJsonPath('ok', false);
    $response->assertJsonPath('error', 'WEATHER_UNAVAILABLE');
});
