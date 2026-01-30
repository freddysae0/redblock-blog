import { Cloud, CloudOff, MapPin, Wind } from 'lucide-react';
import { useEffect, useState } from 'react';

type WeatherOkResponse = {
    ok: true;
    data: {
        city: string;
        time: string;
        temperatureC: number;
        windSpeedKmh: number;
        comment: string;
    };
};

type WeatherErrorResponse = {
    ok: false;
    error: string;
};

type WeatherResponse = WeatherOkResponse | WeatherErrorResponse;

type WeatherState =
    | { status: 'loading' }
    | { status: 'ok'; data: WeatherOkResponse['data'] }
    | { status: 'error' };

export function WeatherBcn() {
    const [state, setState] = useState<WeatherState>({ status: 'loading' });

    useEffect(() => {
        const controller = new AbortController();

        const run = async () => {
            try {
                const res = await fetch('/api/weather/bcn', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    },
                    signal: controller.signal,
                });

                if (!res.ok) {
                    setState({ status: 'error' });
                    return;
                }

                const json = (await res.json()) as unknown;

                if (!isWeatherResponse(json)) {
                    setState({ status: 'error' });
                    return;
                }

                if (!json.ok) {
                    setState({ status: 'error' });
                    return;
                }

                setState({ status: 'ok', data: json.data });
            } catch {
                if (!controller.signal.aborted) {
                    setState({ status: 'error' });
                }
            }
        };

        void run();

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">Barcelona Weather</h4>

            {state.status === 'loading' && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Cloud className="w-4 h-4" />
                    <span>Loading...</span>
                </div>
            )}

            {state.status === 'error' && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CloudOff className="w-4 h-4" />
                    <span>Unavailable</span>
                </div>
            )}

            {state.status === 'ok' && (
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{state.data.city}</span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                        <div className="text-2xl font-semibold text-foreground">
                            {Math.round(state.data.temperatureC)}°C
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Wind className="w-4 h-4" />
                            <span>{Math.round(state.data.windSpeedKmh)} km/h</span>
                        </div>
                    </div>

                    <p className="text-sm text-muted-foreground">{state.data.comment}</p>
                </div>
            )}
        </div>
    );
}

function isWeatherResponse(value: unknown): value is WeatherResponse {
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    const record = value as Record<string, unknown>;

    if (typeof record.ok !== 'boolean') {
        return false;
    }

    if (record.ok === false) {
        return typeof record.error === 'string';
    }

    if (typeof record.data !== 'object' || record.data === null) {
        return false;
    }

    const data = record.data as Record<string, unknown>;

    return (
        typeof data.city === 'string' &&
        typeof data.time === 'string' &&
        typeof data.temperatureC === 'number' &&
        typeof data.windSpeedKmh === 'number' &&
        typeof data.comment === 'string'
    );
}
