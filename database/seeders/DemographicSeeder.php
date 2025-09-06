<?php

namespace Database\Seeders;

use App\Models\Demographic;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DemographicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample demographic data with variety
        
        // Create some children (0-2 years)
        Demographic::factory()->count(5)->child()->create();
        
        // Create some young people (0-5 years)
        Demographic::factory()->count(8)->young()->create();
        
        // Create adults with various backgrounds
        Demographic::factory()->count(25)->adult()->create();
        
        // Create specific gender distributions
        Demographic::factory()->count(15)->male()->adult()->create();
        Demographic::factory()->count(12)->female()->adult()->create();
        
        // Create people with specific education levels
        Demographic::factory()->count(3)->adult()->state([
            'pendidikan' => 'S3',
            'agama' => 'Islam'
        ])->create();
        
        Demographic::factory()->count(8)->adult()->state([
            'pendidikan' => 'S2',
        ])->create();
        
        Demographic::factory()->count(15)->adult()->state([
            'pendidikan' => 'S1',
        ])->create();
        
        // Ensure diverse religious distribution
        $religions = ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'];
        foreach ($religions as $religion) {
            Demographic::factory()->count(random_int(3, 8))->adult()->state([
                'agama' => $religion
            ])->create();
        }
    }
}