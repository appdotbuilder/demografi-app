import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6">
                    <h1 className="text-2xl font-bold mb-2">📊 Selamat Datang di Sistem Informasi Demografi</h1>
                    <p className="text-blue-100">
                        Platform lengkap untuk mengelola data demografi penduduk dengan fitur modern dan intuitif
                    </p>
                </div>

                {/* Quick Stats Cards */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                                👥 Total Penduduk
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">-</div>
                            <p className="text-sm text-gray-500">Data akan muncul setelah input</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                                📈 Pertumbuhan
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">-</div>
                            <p className="text-sm text-gray-500">Statistik pertumbuhan penduduk</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                                📊 Data Terbaru
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-600">-</div>
                            <p className="text-sm text-gray-500">Input data terbaru hari ini</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Features */}
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Demographics Management */}
                    <Card className="col-span-1 md:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                📋 Manajemen Data Demografi
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                <Link href={route('demographics.index')}>
                                    <Button className="w-full h-24 flex flex-col gap-2 bg-blue-600 hover:bg-blue-700">
                                        <div className="text-2xl">📊</div>
                                        <span>Kelola Data</span>
                                    </Button>
                                </Link>

                                <Link href={route('demographics.create')}>
                                    <Button className="w-full h-24 flex flex-col gap-2 bg-green-600 hover:bg-green-700">
                                        <div className="text-2xl">➕</div>
                                        <span>Tambah Data</span>
                                    </Button>
                                </Link>

                                <Link href={route('demographics.import-form')}>
                                    <Button className="w-full h-24 flex flex-col gap-2 bg-purple-600 hover:bg-purple-700">
                                        <div className="text-2xl">📤</div>
                                        <span>Import CSV</span>
                                    </Button>
                                </Link>

                                <Button 
                                    className="w-full h-24 flex flex-col gap-2 bg-orange-600 hover:bg-orange-700"
                                    onClick={() => window.location.href = route('demographics.export')}
                                >
                                    <div className="text-2xl">📥</div>
                                    <span>Export CSV</span>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Future Menu Placeholders */}
                <Card>
                    <CardHeader>
                        <CardTitle>🚧 Menu Lainnya (Akan Segera Hadir)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-5">
                            {[
                                '🏠 Perumahan',
                                '💼 Pekerjaan',
                                '🏥 Kesehatan',
                                '🏫 Pendidikan',
                                '📊 Laporan',
                                '⚙️ Pengaturan',
                                '👤 Pengguna',
                                '🔒 Keamanan',
                                '📱 Mobile App'
                            ].map((menu, index) => (
                                <div key={index} className="p-4 border border-dashed border-gray-300 rounded-lg text-center text-gray-500 bg-gray-50">
                                    <div className="text-sm font-medium">{menu}</div>
                                    <div className="text-xs mt-1">Coming Soon</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}