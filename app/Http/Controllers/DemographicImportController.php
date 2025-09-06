<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Demographic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DemographicImportController extends Controller
{
    /**
     * Show import form.
     */
    public function create()
    {
        return Inertia::render('demographics/import');
    }

    /**
     * Import demographics data from CSV.
     */
    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:csv,txt|max:2048',
        ]);

        $file = $request->file('file');
        $handle = fopen($file->getRealPath(), 'r');
        
        // Skip header row
        fgetcsv($handle);
        
        $imported = 0;
        $errors = [];
        $row = 1;

        while (($data = fgetcsv($handle, 1000, ',')) !== false) {
            $row++;
            
            try {
                if (count($data) < 6) {
                    $errors[] = "Baris {$row}: Data tidak lengkap";
                    continue;
                }

                $demographic = new Demographic([
                    'nik' => $data[0] ?? '',
                    'nama' => $data[1] ?? '',
                    'tanggal_lahir' => date('Y-m-d', strtotime($data[2] ?? '')),
                    'jenis_kelamin' => $data[3] ?? '',
                    'pendidikan' => $data[4] ?? '',
                    'agama' => $data[5] ?? '',
                ]);

                if ($demographic->save()) {
                    $imported++;
                }
            } catch (\Exception $e) {
                $errors[] = "Baris {$row}: " . $e->getMessage();
            }
        }

        fclose($handle);

        $message = "{$imported} data berhasil diimpor.";
        if (!empty($errors)) {
            $message .= " " . count($errors) . " data gagal diimpor.";
        }

        return redirect()->route('demographics.index')
            ->with('success', $message)
            ->with('import_errors', $errors);
    }
}