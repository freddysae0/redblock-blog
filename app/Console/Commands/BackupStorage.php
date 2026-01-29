<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Process;
use Illuminate\Support\Facades\Storage;

class BackupStorage extends Command
{
    protected $signature = 'backup:storage';

    protected $description = 'Create a storage backup into storage/app/backups.';

    public function handle(): int
    {
        $backupDisk = Storage::disk('local');
        $backupDir = 'backups';
        $backupDisk->makeDirectory($backupDir);

        $timestamp = now('UTC')->format('Y-m-d_His');
        $fileName = "{$backupDir}/storage_{$timestamp}.tar.gz";
        $absolutePath = $backupDisk->path($fileName);

        $storagePath = storage_path();

        $result = Process::timeout(3600)->run([
            'tar',
            '-czf',
            $absolutePath,
            '-C',
            $storagePath,
            '.',
        ]);

        if ($result->failed()) {
            $this->error('Storage backup failed.');
            $this->line($result->errorOutput());

            return self::FAILURE;
        }

        $this->info("Storage backup created: {$fileName}");

        return self::SUCCESS;
    }
}
