<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Process;
use Illuminate\Support\Facades\Storage;

it('registers backup scheduled tasks at the expected times', function () {
    $contents = file_get_contents(base_path('bootstrap/app.php'));

    expect($contents)->toContain("->command('backup:database')->timezone('UTC')->dailyAt('15:01')");
    expect($contents)->toContain("->command('backup:storage')->timezone('UTC')->weeklyOn(1, '15:01')");
});

it('runs database backup command', function () {
    Storage::fake('local');
    Process::fake();

    Artisan::call('backup:database');

    Process::assertRan(function ($process) {
        $command = $process->command;

        if (! is_array($command)) {
            return false;
        }

        return in_array($command[0], ['pg_dump', 'sh'], true);
    });

    expect(Storage::disk('local')->exists('backups'))->toBeTrue();
});

it('runs storage backup command', function () {
    Storage::fake('local');
    Process::fake();

    Artisan::call('backup:storage');

    Process::assertRan(function ($process) {
        $command = $process->command;

        if (! is_array($command)) {
            return false;
        }

        return $command[0] === 'tar';
    });

    expect(Storage::disk('local')->exists('backups'))->toBeTrue();
});
