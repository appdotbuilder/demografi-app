<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

/**
 * App\Models\Demographic
 *
 * @property int $id
 * @property string $nik
 * @property string $nama
 * @property \Illuminate\Support\Carbon $tanggal_lahir
 * @property string $jenis_kelamin
 * @property string $pendidikan
 * @property string $agama
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read int $usia
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Demographic newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Demographic newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Demographic query()
 * @method static \Illuminate\Database\Eloquent\Builder|Demographic whereNik($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Demographic whereNama($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Demographic whereTanggalLahir($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Demographic whereJenisKelamin($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Demographic wherePendidikan($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Demographic whereAgama($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Demographic whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Demographic whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Demographic whereId($value)
 * @method static \Database\Factories\DemographicFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Demographic extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nik',
        'nama',
        'tanggal_lahir',
        'jenis_kelamin',
        'pendidikan',
        'agama',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'tanggal_lahir' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'demographics';

    /**
     * Get the age attribute.
     *
     * @return int
     */
    public function getUsiaAttribute(): int
    {
        return Carbon::parse($this->tanggal_lahir)->age;
    }

    /**
     * Scope a query to only include specific gender.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $gender
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByGender($query, $gender)
    {
        return $query->where('jenis_kelamin', $gender);
    }

    /**
     * Scope a query to only include specific religion.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $religion
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByReligion($query, $religion)
    {
        return $query->where('agama', $religion);
    }

    /**
     * Scope a query to only include specific education level.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $education
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByEducation($query, $education)
    {
        return $query->where('pendidikan', $education);
    }

    /**
     * Scope a query to only include specific age range.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  int  $minAge
     * @param  int|null  $maxAge
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByAgeRange($query, $minAge, $maxAge = null)
    {
        $minDate = Carbon::now()->subYears($maxAge ?? 150)->format('Y-m-d');
        $maxDate = Carbon::now()->subYears($minAge)->format('Y-m-d');
        
        if ($maxAge === null) {
            return $query->where('tanggal_lahir', '<=', $maxDate);
        }
        
        return $query->whereBetween('tanggal_lahir', [$minDate, $maxDate]);
    }
}