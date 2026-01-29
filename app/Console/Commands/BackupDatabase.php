<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Process;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BackupDatabase extends Command
{
    protected $signature = 'backup:database';

    protected $description = 'Create a database backup into storage/app/backups.';

    public function handle(): int
    {
        $connectionName = Config::get('database.default');
        $connection = Config::get("database.connections.{$connectionName}");

        if (! is_array($connection)) {
            $this->error('Database connection is not configured.');

            return self::FAILURE;
        }

        $driver = (string) ($connection['driver'] ?? '');

        $backupDisk = Storage::disk('local');
        $backupDir = 'backups';
        $backupDisk->makeDirectory($backupDir);

        $timestamp = now('UTC')->format('Y-m-d_His');
        $databaseName = (string) ($connection['database'] ?? 'database');
        $safeDatabaseName = Str::slug($databaseName, '_');
        $fileName = "{$backupDir}/db_{$connectionName}_{$safeDatabaseName}_{$timestamp}.sql";
        $absolutePath = $backupDisk->path($fileName);

        $result = match ($driver) {
            'mysql', 'mariadb' => $this->runMysqlDump($connection, $absolutePath),
            'pgsql' => $this->runPostgresDump($connection, $absolutePath),
            'sqlite' => $this->runSqliteDump($connection, $absolutePath),
            default => null,
        };

        if ($result === null) {
            $this->error("Unsupported database driver: {$driver}");

            return self::FAILURE;
        }

        if ($result->failed()) {
            $this->error('Database backup failed.');
            $this->line($result->errorOutput());

            return self::FAILURE;
        }

        $this->info("Database backup created: {$fileName}");

        return self::SUCCESS;
    }
    private function runMysqlDump(array $connection, string $absolutePath)
    {
        $host = (string) ($connection['host'] ?? '127.0.0.1');
        $port = (string) ($connection['port'] ?? '3306');
        $username = (string) ($connection['username'] ?? '');
        $password = (string) ($connection['password'] ?? '');
        $database = (string) ($connection['database'] ?? '');

        return Process::timeout(3600)
            ->env(['MYSQL_PWD' => $password])
            ->run([
                'sh',
                '-lc',
                sprintf(
                    'mysqldump --single-transaction --quick --lock-tables=false -h %s -P %s -u %s %s > %s',
                    escapeshellarg($host),
                    escapeshellarg($port),
                    escapeshellarg($username),
                    escapeshellarg($database),
                    escapeshellarg($absolutePath),
                ),
            ]);
    }
    private function runPostgresDump(array $connection, string $absolutePath)
    {
        $host = (string) ($connection['host'] ?? '127.0.0.1');
        $port = (string) ($connection['port'] ?? '5432');
        $username = (string) ($connection['username'] ?? '');
        $password = (string) ($connection['password'] ?? '');
        $database = (string) ($connection['database'] ?? '');

        return Process::timeout(3600)
            ->env(['PGPASSWORD' => $password])
            ->run([
                'pg_dump',
                '--format=plain',
                '--no-owner',
                '--no-privileges',
                '--host',
                $host,
                '--port',
                $port,
                '--username',
                $username,
                '--file',
                $absolutePath,
                $database,
            ]);
    }
    private function runSqliteDump(array $connection, string $absolutePath)
    {
        $database = (string) ($connection['database'] ?? '');

        return Process::timeout(3600)
            ->run([
                'sh',
                '-lc',
                sprintf(
                    'sqlite3 %s .dump > %s',
                    escapeshellarg($database),
                    escapeshellarg($absolutePath),
                ),
            ]);
    }
}
