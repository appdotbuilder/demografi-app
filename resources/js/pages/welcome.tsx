import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Sistem Informasi Demografi">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
                {/* Header */}
                <header className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">📊</span>
                        <span className="text-xl font-bold text-gray-800 dark:text-white">SIDem</span>
                    </div>
                    <nav className="flex items-center gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 transition-colors"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-lg px-6 py-2 text-gray-700 hover:text-blue-600 transition-colors dark:text-gray-300"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 transition-colors"
                                >
                                    Daftar
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* Main Content */}
                <main className="flex-1 flex items-center justify-center p-6">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Hero Section */}
                        <div className="mb-12">
                            <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
                                📊 Sistem Informasi Demografi
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                                Platform modern untuk mengelola data demografi penduduk dengan fitur lengkap
                            </p>
                            {auth.user ? (
                                <Link
                                    href={route('demographics.index')}
                                    className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
                                >
                                    🚀 Kelola Data Demografi
                                </Link>
                            ) : (
                                <Link
                                    href={route('register')}
                                    className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
                                >
                                    🚀 Mulai Sekarang
                                </Link>
                            )}
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            {/* Feature 1 */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                                <div className="text-4xl mb-4">📝</div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                                    Manajemen Data CRUD
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    Tambah, ubah, lihat, dan hapus data demografi dengan mudah melalui interface yang intuitif
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                                <div className="text-4xl mb-4">📊</div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                                    Rekapitulasi Data
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    Statistik lengkap berdasarkan jenis kelamin, agama, pendidikan, dan kelompok usia
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                                <div className="text-4xl mb-4">📤</div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                                    Import & Export
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    Import data dari CSV dan export laporan dalam format yang mudah dibaca
                                </p>
                            </div>

                            {/* Feature 4 */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                                <div className="text-4xl mb-4">🔍</div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                                    Pencarian Canggih
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    Cari dan filter data berdasarkan berbagai kriteria untuk analisis yang mendalam
                                </p>
                            </div>

                            {/* Feature 5 */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                                <div className="text-4xl mb-4">📱</div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                                    Responsive Design
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    Interface yang responsif dan dapat diakses dari desktop, tablet, maupun smartphone
                                </p>
                            </div>

                            {/* Feature 6 */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                                <div className="text-4xl mb-4">🔐</div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                                    Keamanan Terjamin
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    Sistem autentikasi dan validasi data yang ketat untuk menjaga keamanan informasi
                                </p>
                            </div>
                        </div>

                        {/* Data Categories */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                                📋 Data yang Dapat Dikelola
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-left">
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-600">🆔</span>
                                    <span className="text-gray-700 dark:text-gray-300">NIK (16 digit)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-600">👤</span>
                                    <span className="text-gray-700 dark:text-gray-300">Nama Lengkap</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-600">📅</span>
                                    <span className="text-gray-700 dark:text-gray-300">Tanggal Lahir</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-600">⚧</span>
                                    <span className="text-gray-700 dark:text-gray-300">Jenis Kelamin</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-600">🎓</span>
                                    <span className="text-gray-700 dark:text-gray-300">Tingkat Pendidikan</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-600">🙏</span>
                                    <span className="text-gray-700 dark:text-gray-300">Agama</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="text-center p-6 text-gray-600 dark:text-gray-400">
                    <p>© 2024 Sistem Informasi Demografi. Dibangun dengan ❤️ menggunakan Laravel & React.</p>
                </footer>
            </div>
        </>
    );
}