<?php

namespace App\Services\Weather;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Throwable;

class BcnWeatherService
{
    public function getCurrent(): ?array
    {
        return Cache::remember('weather:bcn:current', now()->addMinutes(10), function (): ?array {
            try {
                $response = Http::timeout(5)->get('https://api.open-meteo.com/v1/forecast', [
                    'latitude' => 41.3874,
                    'longitude' => 2.1686,
                    'current' => 'temperature_2m,wind_speed_10m',
                    'timezone' => 'UTC',
                ]);

                if (! $response->ok()) {
                    return null;
                }

                $data = $response->json();

                if (! is_array($data)) {
                    return null;
                }

                $current = $data['current'] ?? null;

                if (! is_array($current)) {
                    return null;
                }

                $time = $current['time'] ?? null;
                $temperature = $current['temperature_2m'] ?? null;
                $windSpeed = $current['wind_speed_10m'] ?? null;

                if (! is_string($time) || ! is_numeric($temperature) || ! is_numeric($windSpeed)) {
                    return null;
                }

                $temperatureFloat = (float) $temperature;
                $windSpeedFloat = (float) $windSpeed;

                return [
                    'city' => 'Barcelona',
                    'time' => $time,
                    'temperatureC' => $temperatureFloat,
                    'windSpeedKmh' => $windSpeedFloat,
                    'comment' => $this->comment($temperatureFloat, $windSpeedFloat),
                ];
            } catch (Throwable) {
                return null;
            }
        });
    }

    private function comment(float $temperatureC, float $windSpeedKmh): string
    {
        $tempLabel = match (true) {
            $temperatureC < 5 => 'Freezing',
            $temperatureC < 12 => 'Cold',
            $temperatureC < 18 => 'Cool',
            $temperatureC < 25 => 'Pleasant',
            $temperatureC < 30 => 'Warm',
            default => 'Hot',
        };

        $windLabel = match (true) {
            $windSpeedKmh >= 30 => 'very windy',
            $windSpeedKmh >= 18 => 'windy',
            $windSpeedKmh >= 8 => 'breezy',
            default => 'calm',
        };

        if ($windLabel === 'calm') {
            return $tempLabel;
        }

        return $tempLabel.' and '.$windLabel;
    }
}
