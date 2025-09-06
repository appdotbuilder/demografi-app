import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useForm, Link } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Demografi', href: '/demographics' },
    { title: 'Import Data', href: '/demographics-import' },
];

export default function ImportDemographic() {
    const { data, setData, post, processing, errors } = useForm({
        file: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('demographics.import'));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('file', file);
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
                        <h1 className="text-3xl font-bold">📤 Import Data Demografi</h1>
                        <p className="text-gray-600 mt-1">Import data demografi dari file CSV</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Import Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>📁 Upload File CSV</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="file">Pilih File CSV *</Label>
                                    <Input
                                        id="file"
                                        type="file"
                                        accept=".csv,.txt"
                                        onChange={handleFileChange}
                                        className={errors.file ? 'border-red-500' : ''}
                                    />
                                    {errors.file && <p className="text-sm text-red-600">{errors.file}</p>}
                                    <p className="text-sm text-gray-600">
                                        Format file yang didukung: CSV, TXT (maksimal 2MB)
                                    </p>
                                </div>

                                <div className="flex gap-2 pt-4">
                                    <Button type="submit" disabled={processing || !data.file}>
                                        {processing ? '⏳ Mengimpor...' : '📤 Import Data'}
                                    </Button>
                                    <Link href={route('demographics.index')}>
                                        <Button type="button" variant="outline">❌ Batal</Button>
                                    </Link>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Instructions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>📋 Petunjuk Import</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Alert>
                                <AlertDescription>
                                    <strong>Format file CSV yang benar:</strong>
                                </AlertDescription>
                            </Alert>

                            <div className="space-y-3">
                                <div>
                                    <h4 className="font-semibold text-sm">📌 Urutan Kolom:</h4>
                                    <ol className="text-sm text-gray-600 ml-4 list-decimal">
                                        <li>NIK (16 digit angka)</li>
                                        <li>Nama (teks)</li>
                                        <li>Tanggal Lahir (DD/MM/YYYY)</li>
                                        <li>Jenis Kelamin (Laki-laki/Perempuan)</li>
                                        <li>Pendidikan (SD/SLTP/SLTA/S1/S2/S3)</li>
                                        <li>Agama (Islam/Kristen/Katolik/Hindu/Buddha/Konghucu)</li>
                                    </ol>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-sm">💡 Tips:</h4>
                                    <ul className="text-sm text-gray-600 ml-4 list-disc">
                                        <li>Jangan sertakan header/judul kolom</li>
                                        <li>Pastikan NIK unik (tidak duplikat)</li>
                                        <li>Format tanggal: DD/MM/YYYY (misal: 15/08/1990)</li>
                                        <li>Tulis jenis kelamin persis: "Laki-laki" atau "Perempuan"</li>
                                        <li>File maksimal 2MB</li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-sm">📝 Contoh data:</h4>
                                    <div className="bg-gray-100 p-3 rounded text-xs font-mono overflow-x-auto">
                                        3201234567890123,John Doe,15/08/1990,Laki-laki,S1,Islam<br/>
                                        3201234567890124,Jane Smith,22/03/1985,Perempuan,S2,Kristen
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}