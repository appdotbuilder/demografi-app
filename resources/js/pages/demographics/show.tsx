import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { router, Link } from '@inertiajs/react';
import { Demographic, BreadcrumbItem } from '@/types';

interface Props {
    demographic: Demographic;
    [key: string]: unknown;
}

export default function ShowDemographic({ demographic }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Demografi', href: '/demographics' },
        { title: demographic.nama, href: `/demographics/${demographic.id}` },
    ];
    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            router.delete(route('demographics.destroy', demographic.id));
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
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

    const getGenderIcon = (gender: string) => {
        return gender === 'Laki-laki' ? '👨' : '👩';
    };

    const getReligionIcon = (religion: string) => {
        const icons: Record<string, string> = {
            'Islam': '☪️',
            'Kristen': '✝️',
            'Katolik': '✝️',
            'Hindu': '🕉️',
            'Buddha': '☸️',
            'Konghucu': '☯️'
        };
        return icons[religion] || '🙏';
    };

    const getEducationIcon = (education: string) => {
        return ['S1', 'S2', 'S3'].includes(education) ? '🎓' : '🏫';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href={route('demographics.index')}>
                            <Button variant="ghost" size="sm">← Kembali</Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold">👁️ Detail Data Demografi</h1>
                            <p className="text-gray-600 mt-1">Informasi lengkap data penduduk</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Link href={route('demographics.edit', demographic.id)}>
                            <Button>✏️ Edit</Button>
                        </Link>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                        >
                            🗑️ Hapus
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>👤 Informasi Personal</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600">NIK</label>
                                <p className="text-lg font-mono bg-gray-50 p-2 rounded border">
                                    {demographic.nik}
                                </p>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-600">Nama Lengkap</label>
                                <p className="text-xl font-semibold">{demographic.nama}</p>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-600">Tanggal Lahir</label>
                                <p className="text-lg">{formatDate(demographic.tanggal_lahir)}</p>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-600">Usia</label>
                                <p className="text-lg font-semibold">
                                    🎂 {calculateAge(demographic.tanggal_lahir)} tahun
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Demographic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>📊 Informasi Demografi</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Jenis Kelamin</label>
                                <div className="mt-1">
                                    <Badge variant={demographic.jenis_kelamin === 'Laki-laki' ? 'default' : 'secondary'} className="text-base px-3 py-1">
                                        {getGenderIcon(demographic.jenis_kelamin)} {demographic.jenis_kelamin}
                                    </Badge>
                                </div>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-600">Pendidikan Terakhir</label>
                                <div className="mt-1">
                                    <Badge variant="outline" className="text-base px-3 py-1">
                                        {getEducationIcon(demographic.pendidikan)} {demographic.pendidikan}
                                    </Badge>
                                </div>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-600">Agama</label>
                                <div className="mt-1">
                                    <Badge variant="outline" className="text-base px-3 py-1">
                                        {getReligionIcon(demographic.agama)} {demographic.agama}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Metadata */}
                <Card>
                    <CardHeader>
                        <CardTitle>ℹ️ Informasi Sistem</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                                <label className="font-medium">Tanggal Dibuat</label>
                                <p>{formatDate(demographic.created_at)}</p>
                            </div>
                            <div>
                                <label className="font-medium">Terakhir Diperbarui</label>
                                <p>{formatDate(demographic.updated_at)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}