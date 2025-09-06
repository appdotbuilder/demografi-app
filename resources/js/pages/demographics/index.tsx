import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { router, Link } from '@inertiajs/react';
import { Demographic, PaginatedData, BreadcrumbItem } from '@/types';

interface Props {
    demographics: PaginatedData<Demographic>;
    stats: {
        total: number;
        gender: { 'Laki-laki': number; 'Perempuan': number };
        religion: Record<string, number>;
        education: Record<string, number>;
        age_groups: { '0-2': number; '0-5': number; '17+': number };
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Demografi', href: '/demographics' },
];

export default function DemographicsIndex({ demographics, stats }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            router.delete(route('demographics.destroy', id));
        }
    };

    const handleExport = () => {
        window.location.href = route('demographics.export');
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID');
    };

    const calculateAge = (birthDate: string) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">📊 Data Demografi</h1>
                        <p className="text-gray-600 mt-1">Kelola data demografi penduduk</p>
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={handleExport} variant="outline">
                            📥 Export CSV
                        </Button>
                        <Link href={route('demographics.import-form')}>
                            <Button variant="outline">📤 Import CSV</Button>
                        </Link>
                        <Link href={route('demographics.create')}>
                            <Button>➕ Tambah Data</Button>
                        </Link>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Total Penduduk
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total.toLocaleString()}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Jenis Kelamin
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span>👨 Laki-laki:</span>
                                    <span className="font-semibold">{stats.gender['Laki-laki']}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>👩 Perempuan:</span>
                                    <span className="font-semibold">{stats.gender['Perempuan']}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Kelompok Usia
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span>👶 0-2 tahun:</span>
                                    <span className="font-semibold">{stats.age_groups['0-2']}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>🧒 0-5 tahun:</span>
                                    <span className="font-semibold">{stats.age_groups['0-5']}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>🧑 17+ tahun:</span>
                                    <span className="font-semibold">{stats.age_groups['17+']}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Pendidikan Tertinggi
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-1">
                                {Object.entries(stats.education).map(([level, count]) => (
                                    <div key={level} className="flex justify-between text-sm">
                                        <span>{level}:</span>
                                        <span className="font-semibold">{count}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Data Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Data Demografi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left p-3">NIK</th>
                                        <th className="text-left p-3">Nama</th>
                                        <th className="text-left p-3">Tanggal Lahir</th>
                                        <th className="text-left p-3">Usia</th>
                                        <th className="text-left p-3">Gender</th>
                                        <th className="text-left p-3">Pendidikan</th>
                                        <th className="text-left p-3">Agama</th>
                                        <th className="text-left p-3">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {demographics.data.map((demographic) => (
                                        <tr key={demographic.id} className="border-b hover:bg-gray-50">
                                            <td className="p-3 font-mono text-sm">{demographic.nik}</td>
                                            <td className="p-3 font-medium">{demographic.nama}</td>
                                            <td className="p-3">{formatDate(demographic.tanggal_lahir)}</td>
                                            <td className="p-3">{calculateAge(demographic.tanggal_lahir)} tahun</td>
                                            <td className="p-3">
                                                <Badge variant={demographic.jenis_kelamin === 'Laki-laki' ? 'default' : 'secondary'}>
                                                    {demographic.jenis_kelamin === 'Laki-laki' ? '👨' : '👩'} {demographic.jenis_kelamin}
                                                </Badge>
                                            </td>
                                            <td className="p-3">{demographic.pendidikan}</td>
                                            <td className="p-3">{demographic.agama}</td>
                                            <td className="p-3">
                                                <div className="flex gap-1">
                                                    <Link href={route('demographics.show', demographic.id)}>
                                                        <Button size="sm" variant="ghost">👁️</Button>
                                                    </Link>
                                                    <Link href={route('demographics.edit', demographic.id)}>
                                                        <Button size="sm" variant="ghost">✏️</Button>
                                                    </Link>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => handleDelete(demographic.id)}
                                                        className="text-red-600 hover:text-red-700"
                                                    >
                                                        🗑️
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {demographics.data.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                    Belum ada data demografi. 
                                    <Link href={route('demographics.create')} className="text-blue-600 hover:underline ml-1">
                                        Tambah data pertama
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {demographics.links && demographics.links.length > 3 && (
                            <div className="flex justify-center mt-4 gap-1">
                                {demographics.links.map((link, index) => (
                                    <button
                                        key={index}
                                        onClick={() => link.url && router.get(link.url)}
                                        disabled={!link.url}
                                        className={`px-3 py-1 text-sm border rounded ${
                                            link.active 
                                                ? 'bg-blue-600 text-white border-blue-600' 
                                                : link.url
                                                ? 'hover:bg-gray-100 border-gray-300'
                                                : 'text-gray-400 border-gray-200 cursor-not-allowed'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}