<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDemographicRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nik' => 'required|string|size:16|unique:demographics,nik,' . $this->route('demographic')->id . '|regex:/^[0-9]+$/',
            'nama' => 'required|string|max:255|min:2',
            'tanggal_lahir' => 'required|date|before:today|after:1900-01-01',
            'jenis_kelamin' => 'required|in:Laki-laki,Perempuan',
            'pendidikan' => 'required|in:SD,SLTP,SLTA,S1,S2,S3',
            'agama' => 'required|in:Islam,Kristen,Katolik,Hindu,Buddha,Konghucu',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'nik.required' => 'NIK wajib diisi.',
            'nik.size' => 'NIK harus terdiri dari 16 digit angka.',
            'nik.unique' => 'NIK sudah terdaftar oleh penduduk lain.',
            'nik.regex' => 'NIK hanya boleh berisi angka.',
            'nama.required' => 'Nama lengkap wajib diisi.',
            'nama.min' => 'Nama minimal terdiri dari 2 karakter.',
            'nama.max' => 'Nama maksimal terdiri dari 255 karakter.',
            'tanggal_lahir.required' => 'Tanggal lahir wajib diisi.',
            'tanggal_lahir.date' => 'Format tanggal lahir tidak valid.',
            'tanggal_lahir.before' => 'Tanggal lahir harus sebelum hari ini.',
            'tanggal_lahir.after' => 'Tanggal lahir tidak boleh sebelum tahun 1900.',
            'jenis_kelamin.required' => 'Jenis kelamin wajib dipilih.',
            'jenis_kelamin.in' => 'Pilihan jenis kelamin tidak valid.',
            'pendidikan.required' => 'Tingkat pendidikan wajib dipilih.',
            'pendidikan.in' => 'Pilihan tingkat pendidikan tidak valid.',
            'agama.required' => 'Agama wajib dipilih.',
            'agama.in' => 'Pilihan agama tidak valid.',
        ];
    }
}