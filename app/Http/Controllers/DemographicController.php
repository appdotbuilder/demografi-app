<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDemographicRequest;
use App\Http\Requests\UpdateDemographicRequest;
use App\Models\Demographic;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Illuminate\Support\Facades\DB;

class DemographicController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $demographics = Demographic::latest()
            ->paginate(10)
            ->withQueryString();

        // Get statistics for the overview
        $stats = $this->getStatistics();

        return Inertia::render('demographics/index', [
            'demographics' => $demographics,
            'stats' => $stats,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('demographics/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDemographicRequest $request)
    {
        $demographic = Demographic::create($request->validated());

        return redirect()->route('demographics.show', $demographic)
            ->with('success', 'Data demografi berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Demographic $demographic)
    {
        return Inertia::render('demographics/show', [
            'demographic' => $demographic,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Demographic $demographic)
    {
        return Inertia::render('demographics/edit', [
            'demographic' => $demographic,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDemographicRequest $request, Demographic $demographic)
    {
        $demographic->update($request->validated());

        return redirect()->route('demographics.show', $demographic)
            ->with('success', 'Data demografi berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Demographic $demographic)
    {
        $demographic->delete();

        return redirect()->route('demographics.index')
            ->with('success', 'Data demografi berhasil dihapus.');
    }



    /**
     * Get demographic statistics.
     */
    protected function getStatistics(): array
    {
        return [
            'total' => Demographic::count(),
            'gender' => [
                'Laki-laki' => Demographic::where('jenis_kelamin', 'Laki-laki')->count(),
                'Perempuan' => Demographic::where('jenis_kelamin', 'Perempuan')->count(),
            ],
            'religion' => DB::table('demographics')
                ->select('agama', DB::raw('count(*) as total'))
                ->groupBy('agama')
                ->pluck('total', 'agama')
                ->toArray(),
            'education' => DB::table('demographics')
                ->select('pendidikan', DB::raw('count(*) as total'))
                ->groupBy('pendidikan')
                ->pluck('total', 'pendidikan')
                ->toArray(),
            'age_groups' => [
                '0-2' => Demographic::byAgeRange(0, 2)->count(),
                '0-5' => Demographic::byAgeRange(0, 5)->count(),
                '17+' => Demographic::byAgeRange(18)->count(),
            ],
        ];
    }
}