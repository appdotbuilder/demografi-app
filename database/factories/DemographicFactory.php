<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Demographic>
 */
class DemographicFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nik' => fake()->unique()->numerify('################'),
            'nama' => fake('id_ID')->name(),
            'tanggal_lahir' => fake()->dateTimeBetween('-80 years', '-1 year')->format('Y-m-d'),
            'jenis_kelamin' => fake()->randomElement(['Laki-laki', 'Perempuan']),
            'pendidikan' => fake()->randomElement(['SD', 'SLTP', 'SLTA', 'S1', 'S2', 'S3']),
            'agama' => fake()->randomElement(['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu']),
        ];
    }

    /**
     * Indicate that the person is a child (0-2 years).
     */
    public function child(): static
    {
        return $this->state(fn (array $attributes) => [
            'tanggal_lahir' => fake()->dateTimeBetween('-2 years', 'now')->format('Y-m-d'),
            'pendidikan' => 'SD',
        ]);
    }

    /**
     * Indicate that the person is young (0-5 years).
     */
    public function young(): static
    {
        return $this->state(fn (array $attributes) => [
            'tanggal_lahir' => fake()->dateTimeBetween('-5 years', 'now')->format('Y-m-d'),
            'pendidikan' => 'SD',
        ]);
    }

    /**
     * Indicate that the person is an adult (18+ years).
     */
    public function adult(): static
    {
        return $this->state(fn (array $attributes) => [
            'tanggal_lahir' => fake()->dateTimeBetween('-65 years', '-18 years')->format('Y-m-d'),
            'pendidikan' => fake()->randomElement(['SLTA', 'S1', 'S2', 'S3']),
        ]);
    }

    /**
     * Indicate that the person is male.
     */
    public function male(): static
    {
        return $this->state(fn (array $attributes) => [
            'jenis_kelamin' => 'Laki-laki',
            'nama' => fake('id_ID')->firstNameMale() . ' ' . fake('id_ID')->lastName(),
        ]);
    }

    /**
     * Indicate that the person is female.
     */
    public function female(): static
    {
        return $this->state(fn (array $attributes) => [
            'jenis_kelamin' => 'Perempuan',
            'nama' => fake('id_ID')->firstNameFemale() . ' ' . fake('id_ID')->lastName(),
        ]);
    }
}