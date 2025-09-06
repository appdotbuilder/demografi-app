<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Demographic;
use Symfony\Component\HttpFoundation\StreamedResponse;

class DemographicExportController extends Controller
{
    /**
     * Export demographics data to CSV.
     */
    public function __invoke(): StreamedResponse
    {
        return response()->streamDownload(function () {
            $handle = fopen('php://output', 'w');
            
            // Add BOM for UTF-8
            fwrite($handle, "\xEF\xBB\xBF");
            
            // CSV headers
            fputcsv($handle, [
                'NIK',
                'Nama',
                'Tanggal Lahir',
                'Usia',
                'Jenis Kelamin',
                'Pendidikan',
                'Agama',
                'Tanggal Dibuat'
            ]);

            // Get all demographics
            Demographic::chunk(1000, function ($demographics) use ($handle) {
                foreach ($demographics as $demographic) {
                    fputcsv($handle, [
                        $demographic->nik,
                        $demographic->nama,
                        $demographic->tanggal_lahir->format('d/m/Y'),
                        $demographic->usia,
                        $demographic->jenis_kelamin,
                        $demographic->pendidikan,
                        $demographic->agama,
                        $demographic->created_at->format('d/m/Y H:i:s')
                    ]);
                }
            });

            fclose($handle);
        }, 'data-demografi-' . now()->format('Y-m-d') . '.csv', [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="data-demografi-' . now()->format('Y-m-d') . '.csv"',
        ]);
    }
}