<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('demographics', function (Blueprint $table) {
            $table->id();
            $table->string('nik', 16)->unique()->comment('Nomor Induk Kependudukan');
            $table->string('nama')->comment('Nama lengkap');
            $table->date('tanggal_lahir')->comment('Tanggal lahir');
            $table->enum('jenis_kelamin', ['Laki-laki', 'Perempuan'])->comment('Jenis kelamin');
            $table->enum('pendidikan', ['SD', 'SLTP', 'SLTA', 'S1', 'S2', 'S3'])->comment('Tingkat pendidikan');
            $table->enum('agama', ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'])->comment('Agama');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('nik');
            $table->index('nama');
            $table->index('jenis_kelamin');
            $table->index('agama');
            $table->index('pendidikan');
            $table->index('tanggal_lahir');
            $table->index(['jenis_kelamin', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('demographics');
    }
};