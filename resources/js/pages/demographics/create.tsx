import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm, Link } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';



const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Demografi', href: '/demographics' },
    { title: 'Tambah Data', href: '/demographics/create' },
];

export default function CreateDemographic() {
    const { data, setData, post, processing, errors } = useForm({
        nik: '',
        nama: '',
        tanggal_lahir: '',
        jenis_kelamin: '',
        pendidikan: '',
        agama: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('demographics.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <Link href={route('demographics.index')}>
                        <Button variant="ghost" size="sm">← Kembali</Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">➕ Tambah Data Demografi</h1>
                        <p className="text-gray-600 mt-1">Tambah data demografi penduduk baru</p>
                    </div>
                </div>

                {/* Form */}
                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>📝 Form Data Demografi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* NIK */}
                            <div className="space-y-2">
                                <Label htmlFor="nik">NIK (Nomor Induk Kependudukan) *</Label>
                                <Input
                                    id="nik"
                                    type="text"
                                    value={data.nik}
                                    onChange={e => setData('nik', e.target.value)}
                                    placeholder="Masukkan 16 digit NIK"
                                    maxLength={16}
                                    className={errors.nik ? 'border-red-500' : ''}
                                />
                                {errors.nik && <p className="text-sm text-red-600">{errors.nik}</p>}
                            </div>

                            {/* Nama */}
                            <div className="space-y-2">
                                <Label htmlFor="nama">Nama Lengkap *</Label>
                                <Input
                                    id="nama"
                                    type="text"
                                    value={data.nama}
                                    onChange={e => setData('nama', e.target.value)}
                                    placeholder="Masukkan nama lengkap"
                                    className={errors.nama ? 'border-red-500' : ''}
                                />
                                {errors.nama && <p className="text-sm text-red-600">{errors.nama}</p>}
                            </div>

                            {/* Tanggal Lahir */}
                            <div className="space-y-2">
                                <Label htmlFor="tanggal_lahir">Tanggal Lahir *</Label>
                                <Input
                                    id="tanggal_lahir"
                                    type="date"
                                    value={data.tanggal_lahir}
                                    onChange={e => setData('tanggal_lahir', e.target.value)}
                                    className={errors.tanggal_lahir ? 'border-red-500' : ''}
                                />
                                {errors.tanggal_lahir && <p className="text-sm text-red-600">{errors.tanggal_lahir}</p>}
                            </div>

                            {/* Jenis Kelamin */}
                            <div className="space-y-2">
                                <Label>Jenis Kelamin *</Label>
                                <Select value={data.jenis_kelamin} onValueChange={(value) => setData('jenis_kelamin', value as string)}>
                                    <SelectTrigger className={errors.jenis_kelamin ? 'border-red-500' : ''}>
                                        <SelectValue placeholder="Pilih jenis kelamin" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Laki-laki">👨 Laki-laki</SelectItem>
                                        <SelectItem value="Perempuan">👩 Perempuan</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.jenis_kelamin && <p className="text-sm text-red-600">{errors.jenis_kelamin}</p>}
                            </div>

                            {/* Pendidikan */}
                            <div className="space-y-2">
                                <Label>Pendidikan Terakhir *</Label>
                                <Select value={data.pendidikan} onValueChange={(value) => setData('pendidikan', value as string)}>
                                    <SelectTrigger className={errors.pendidikan ? 'border-red-500' : ''}>
                                        <SelectValue placeholder="Pilih tingkat pendidikan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="SD">🏫 SD (Sekolah Dasar)</SelectItem>
                                        <SelectItem value="SLTP">🏫 SLTP (Sekolah Menengah Pertama)</SelectItem>
                                        <SelectItem value="SLTA">🏫 SLTA (Sekolah Menengah Atas)</SelectItem>
                                        <SelectItem value="S1">🎓 S1 (Sarjana)</SelectItem>
                                        <SelectItem value="S2">🎓 S2 (Magister)</SelectItem>
                                        <SelectItem value="S3">🎓 S3 (Doktor)</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.pendidikan && <p className="text-sm text-red-600">{errors.pendidikan}</p>}
                            </div>

                            {/* Agama */}
                            <div className="space-y-2">
                                <Label>Agama *</Label>
                                <Select value={data.agama} onValueChange={(value) => setData('agama', value as string)}>
                                    <SelectTrigger className={errors.agama ? 'border-red-500' : ''}>
                                        <SelectValue placeholder="Pilih agama" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Islam">☪️ Islam</SelectItem>
                                        <SelectItem value="Kristen">✝️ Kristen</SelectItem>
                                        <SelectItem value="Katolik">✝️ Katolik</SelectItem>
                                        <SelectItem value="Hindu">🕉️ Hindu</SelectItem>
                                        <SelectItem value="Buddha">☸️ Buddha</SelectItem>
                                        <SelectItem value="Konghucu">☯️ Konghucu</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.agama && <p className="text-sm text-red-600">{errors.agama}</p>}
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-2 pt-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? '⏳ Menyimpan...' : '💾 Simpan Data'}
                                </Button>
                                <Link href={route('demographics.index')}>
                                    <Button type="button" variant="outline">❌ Batal</Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}