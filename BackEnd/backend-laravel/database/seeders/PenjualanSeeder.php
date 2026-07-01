<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PenjualanSeeder extends Seeder
{
    public function run(): void
    {
        // 100 Data Transaksi Utama Statis
        $daftarPesanan = [
            ['Okta Maheswara', '0838 5578 241', 'Online', 'Batal', 'Kpg. Antapani Lama No. 284, Palembang', 1, 150],
            ['Bakijan Pradana', '(+62) 635 5206 147', 'Offline', 'Pending', 'Jln. Otista No. 834, Tomohon 37194', 2, 80],
            ['Dian Suryatmi M.M.', '(+62) 870 8542 898', 'Online', 'Diproses', 'Ki. Baabur Royan No. 52, Bekasi', 3, 1000],
            ['Nadia Utami S.IP', '020 6658 775', 'Online', 'Diproses', 'Kpg. Abang No. 968, Semarang 11094', 1, 50],
            ['Olivia Yessi Hariyah M.Ak', '(+62) 831 653 209', 'Offline', 'Batal', 'Kpg. Pasirkoja No. 525, Prabumulih', 2, 220],
            ['Tiara Kuswandari', '0441 5169 3828', 'Offline', 'Selesai', 'Jln. Balikpapan No. 994, Administrasi Jakarta Pusat', 3, 350],
            ['Kayun Wijaya', '0960 5607 377', 'Online', 'Pending', 'Dk. Aceh No. 168, Yogyakarta 51221', 1, 400],
            ['Uli Nurdiyanti S.E.', '(+62) 709 4219 508', 'Offline', 'Pending', 'Jln. Mahakam No. 524, Tomohon 45521', 2, 120],
            ['Adinata Santoso', '(+62) 365 8452 653', 'Offline', 'Diproses', 'Jr. Salatiga No. 267, Cirebon 84551', 3, 90],
            ['Wahyu Prasetya M.Ti.', '0363 0274 023', 'Offline', 'Pending', 'Psr. Warga No. 579, Gunungsitoli', 1, 300],
            ['Surya Firgantoro', '022 8408 9019', 'Offline', 'Diproses', 'Jln. Nangka No. 97, Pekalongan', 2, 175],
            ['Jamil Sitompul', '025 2892 9806', 'Offline', 'Pending', 'Ds. Eka No. 405, Blitar 59023, Kepri', 3, 250],
            ['Danang Prayoga', '0783 2004 3872', 'Online', 'Pending', 'Jr. Eka No. 756, Bandung 66905', 1, 500],
            ['Nadine Rahmawati', '(+62) 23 8182 944', 'Offline', 'Pending', 'Jr. Basoka No. 132, Mataram 89551', 2, 85],
            ['Marsudi Dodo Tarihoran S.Pt', '0490 1216 2320', 'Online', 'Diproses', 'Jr. Daan No. 639, Pontianak 99651', 3, 600],
            ['Kamal Saptono', '0289 6783 732', 'Offline', 'Selesai', 'Ki. Moch. Ramdan No. 984, Sorong', 1, 140],
            ['Luar Samosir', '(+62) 807 233 199', 'Online', 'Selesai', 'Psr. Tambak No. 371, Lhokseumawe', 2, 210],
            ['Yani Melani', '0661 3296 900', 'Online', 'Selesai', 'Ds. Ekonomi No. 578, Tarakan 91223', 3, 450],
            ['Jelita Yulianti', '0858 3041 8138', 'Offline', 'Selesai', 'Jr. Uluwatu No. 825, Bandar Lampung', 1, 320],
            ['Safina Palastri', '(+62) 417 2322 8611', 'Offline', 'Pending', 'Ds. Sudirman No. 755, Yogyakarta', 2, 110],
            ['Siska Agustina M.Ak', '0692 9406 3237', 'Online', 'Selesai', 'Ds. Arifin No. 986, Yogyakarta 53123', 3, 180],
            ['Yulia Usyi Rahimah', '(+62) 919 1878 258', 'Online', 'Batal', 'Dk. Babakan No. 964, Magelang 53441', 1, 95],
            ['Jaiman Bahuwirya Lazuardi S.T.', '0387 7938 0081', 'Offline', 'Selesai', 'Gg. Kalimantan No. 677, Serang', 2, 270],
            ['Fathonah Oliva Winarsih', '028 1241 380', 'Offline', 'Diproses', 'Kpg. Gotong Royong No. 336, Batam', 3, 130],
            ['Nurul Yolanda M.Pd', '0408 0742 2751', 'Offline', 'Pending', 'Ds. Rajawali Timur No. 624, Ambon', 1, 500],
            ['Kadir Simanjuntak', '0812 3456 7890', 'Online', 'Pending', 'Jln. Merdeka No. 12, Medan', 2, 350],
            ['Lestari Widiastuti', '0813 9876 5432', 'Offline', 'Diproses', 'Gg. Kelinci No. 45, Bandung', 3, 120],
            ['Bambang Pamungkas', '0856 7890 1234', 'Online', 'Selesai', 'Jln. Sudirman No. 88, Jakarta', 1, 800],
            ['Cynthia Bella', '0878 1122 3344', 'Offline', 'Batal', 'Kpg. Melati No. 101, Surabaya', 2, 150],
            ['Dedi Corbuzier', '0811 5566 7788', 'Online', 'Pending', 'Jln. Hitam Putih No. 5, Jakarta Selatan', 3, 240],
            ['Eka Sari', '0821 9988 7766', 'Offline', 'Diproses', 'Ds. Makmur No. 3, Semarang', 1, 310],
            ['Farhan Wijaya', '0819 4433 2211', 'Online', 'Selesai', 'Jln. Pemuda No. 19, Yogyakarta', 2, 420],
            ['Gita Gutawa', '0852 6677 8899', 'Offline', 'Pending', 'Kpg. Nada No. 8, Bogor', 3, 95],
            ['Hendra Setiawan', '0812 8899 0011', 'Online', 'Diproses', 'Jln. Smash No. 21, Solo', 1, 1100],
            ['Indah Permatasari', '0813 2233 4455', 'Offline', 'Selesai', 'Gg. Intan No. 55, Palembang', 2, 130],
            ['Joko Widodo', '0857 1111 2222', 'Online', 'Selesai', 'Jln. Istana No. 1, Jakarta Pusat', 3, 1500],
            ['Kartika Putri', '0877 4455 6677', 'Offline', 'Batal', 'Kpg. Hijrah No. 7, Malang', 1, 200],
            ['Lukman Sardi', '0811 8877 6655', 'Online', 'Pending', 'Jln. Aktor No. 44, Depok', 2, 340],
            ['Mega Utami', '0822 3344 5566', 'Offline', 'Diproses', 'Ds. Bintang No. 9, Denpasar', 3, 160],
            ['Nadiem Makarim', '0819 0011 2233', 'Online', 'Selesai', 'Jln. Edukasi No. 10, Jakarta', 1, 2500],
            ['Olla Ramlan', '0853 4433 2211', 'Offline', 'Pending', 'Kpg. Cantik No. 12, Banjarmasin', 2, 180],
            ['Prabowo Subianto', '0812 5555 6666', 'Online', 'Diproses', 'Jln. Pertahanan No. 8, Bogor', 3, 3000],
            ['Queni Aurel', '0813 7788 9900', 'Offline', 'Selesai', 'Gg. Damai No. 32, Manado', 1, 410],
            ['Raffi Ahmad', '0856 1234 5678', 'Online', 'Selesai', 'Jln. Sultan No. 17, Andara', 2, 5000],
            ['Siti Badriah', '0878 9900 1122', 'Offline', 'Batal', 'Kpg. Dangdut No. 2, Bekasi', 3, 230],
            ['Taufik Hidayat', '0811 2233 4455', 'Online', 'Pending', 'Jln. Raket No. 9, Bandung', 1, 650],
            ['Unang Bagito', '0821 4455 6677', 'Offline', 'Diproses', 'Ds. Komedi No. 4, Tangerang', 2, 140],
            ['Vanesha Prescilla', '0819 6677 8899', 'Online', 'Selesai', 'Jln. Milea No. 1990, Bandung', 3, 720],
            ['Wulan Guritno', '0852 8899 0011', 'Offline', 'Pending', 'Kpg. Awet Muda No. 40, Jakarta', 1, 290],
            ['Xavier Malik', '0812 0011 3344', 'Online', 'Diproses', 'Jln. Global No. 15, Batam', 2, 520],
            ['Yuni Shara', '0813 4455 6677', 'Offline', 'Selesai', 'Gg. Nostalgia No. 3, Malang', 3, 380],
            ['Zaskia Gotik', '0857 7788 9900', 'Online', 'Batal', 'Jln. Goyang No. 5, Cikarang', 1, 110],
            ['Achmad Syarif', '0812 9900 8877', 'Online', 'Pending', 'Jln. Wahid Hasyim No. 45, Banda Aceh', 2, 460],
            ['Budi Setiawan', '0813 7766 5544', 'Offline', 'Diproses', 'Ds. Sukamaju No. 12, Garut', 3, 190],
            ['Chandra Liow', '0856 4455 3322', 'Online', 'Selesai', 'Jln. Studio No. 88, Jakarta Barat', 1, 850],
            ['Dewi Persik', '0878 2233 4455', 'Offline', 'Pending', 'Kpg. Jember No. 14, Jember', 2, 240],
            ['Erick Thohir', '0811 6677 8899', 'Online', 'Diproses', 'Jln. BUMN No. 20, Jakarta Pusat', 3, 1350],
            ['Fatin Shidqia', '0821 1122 3344', 'Offline', 'Selesai', 'Ds. Soni No. 7, Jakarta Selatan', 1, 340],
            ['Gading Marten', '0819 8899 0011', 'Online', 'Batal', 'Jln. Gading No. 11, Komplek Serpong', 2, 400],
            ['Heri Cahyono', '0852 3344 5566', 'Offline', 'Pending', 'Kpg. Makmur No. 23, Sukabumi', 3, 150],
            ['Irfan Hakim', '0812 5566 7788', 'Online', 'Diproses', 'Jln. Satwa No. 8, Bandung', 1, 980],
            ['Julia Perez', '0813 9900 1122', 'Offline', 'Selesai', 'Gg. Jupe No. 30, Jakarta', 2, 210],
            ['Kevin Sanjaya', '0857 4433 2211', 'Online', 'Selesai', 'Jln. Petir No. 1, Banyuwangi', 3, 2100],
            ['Luna Maya', '0877 1122 3344', 'Offline', 'Pending', 'Kpg. Bali No. 5, Denpasar', 1, 560],
            ['Maher Zain', '0811 4455 6677', 'Online', 'Diproses', 'Jln. Religi No. 99, Madura', 2, 1250],
            ['Najwa Shihab', '0822 7788 9900', 'Offline', 'Selesai', 'Ds. Catatan No. 4, Makassar', 3, 620],
            ['Onadio Leonardo', '0819 3344 5566', 'Online', 'Batal', 'Jln. Rock No. 14, Jakarta Timur', 1, 130],
            ['Pasha Ungu', '0853 2233 4455', 'Offline', 'Pending', 'Kpg. Palu No. 7, Palu', 2, 430],
            ['Rhoma Irama', '0812 1111 3333', 'Online', 'Diproses', 'Jln. Nada No. 100, Soneta', 3, 4000],
            ['Sule Sutisna', '0813 4433 5566', 'Offline', 'Selesai', 'Gg. Prikitiw No. 4, Cimahi', 1, 710],
            ['Titi Kamal', '0856 8899 1122', 'Online', 'Pending', 'Jln. Mendadak No. 12, Jakarta', 2, 380],
            ['Uus Rizky', '0878 5566 7788', 'Offline', 'Diproses', 'Ds. Standup No. 2, Bandung', 3, 170],
            ['Vidi Aldiano', '0811 9900 1122', 'Online', 'Selesai', 'Jln. Nuansa No. 8, Jakarta Selatan', 1, 540],
            ['Wendra Wijaya', '0821 2233 4455', 'Offline', 'Pending', 'Kpg. Pahlawan No. 51, Surabaya', 2, 290],
            ['Yayan Ruhian', '0819 5566 7788', 'Online', 'Diproses', 'Jln. Mad Dog No. 9, Tasikmalaya', 3, 1150],
            ['Zian Flaga', '0852 1122 3344', 'Offline', 'Selesai', 'Ds. Konser No. 6, Palembang', 1, 260],
            ['Anang Hermansyah', '0812 8877 6655', 'Online', 'Batal', 'Jln. Asix No. 6, Cinere', 2, 880],
            ['Bunga Citra Lestari', '0813 0011 2233', 'Offline', 'Pending', 'Kpg. Cinta No. 12, Jakarta', 3, 920],
            ['Chico Jericho', '0856 5566 7788', 'Online', 'Diproses', 'Jln. Kopi No. 21, Melawai', 1, 640],
            ['Deddy Mahendra Desta', '0878 3344 5566', 'Offline', 'Selesai', 'Gg. Botuna No. 10, Jakarta Selatan', 2, 480],
            ['Ello Tahitoe', '0811 4433 2211', 'Online', 'Pending', 'Jln. Pergi No. 4, Ambon', 3, 310],
            ['Fiersa Besari', '0821 7788 9900', 'Offline', 'Diproses', 'Ds. Gunung No. 33, Bandung', 1, 430],
            ['Giring Ganesha', '0819 1122 3344', 'Online', 'Selesai', 'Jln. Politik No. 15, Jakarta Pusat', 2, 200],
            ['Hesti Purwadinata', '0852 4455 6677', 'Offline', 'Pending', 'Kpg. Canda No. 3, Bogor', 3, 160],
            ['Isyana Sarasvati', '0812 9900 1122', 'Online', 'Diproses', 'Jln. Klasik No. 7, Bandung', 1, 770],
            ['Judika Sihotang', '0813 2233 4455', 'Offline', 'Selesai', 'Ds. Tinggi No. 5, Medan', 2, 1400],
            ['Kunto Aji', '0857 7788 9900', 'Online', 'Batal', 'Jln. Rehat No. 9, Yogyakarta', 3, 350],
            ['Lesti Kejora', '0877 1122 3344', 'Offline', 'Pending', 'Kpg. Kejora No. 1, Cianjur', 1, 2200],
            ['Marcell Siahaan', '0811 5566 7788', 'Online', 'Diproses', 'Jln. Firasat No. 11, Bandung', 2, 580],
            ['Nindy Ayunda', '0822 8899 0011', 'Offline', 'Selesai', 'Ds. Mode No. 8, Padang', 3, 270],
            ['Once Mekel', '0819 3344 5566', 'Online', 'Pending', 'Jln. Dewa No. 19, Manado', 1, 1100],
            ['Piyu Padi', '0853 7788 9900', 'Offline', 'Diproses', 'Kpg. Harmony No. 4, Surabaya', 2, 490],
            ['Rizky Febian', '0812 1122 3344', 'Online', 'Selesai', 'Jln. Kesempurnaan No. 2, Cimahi', 3, 1600],
            ['Sania Mirza', '0813 5566 7788', 'Offline', 'Pending', 'Ds. Tenis No. 6, Solo', 1, 140],
            ['Tulus Sejahtera', '0856 9900 1122', 'Online', 'Diproses', 'Jln. Gajah No. 11, Bukittinggi', 2, 1950],
            ['Ungu Sigit', '0878 1122 3344', 'Offline', 'Selesai', 'Kpg. Klik No. 3, Palu', 3, 330],
            ['Virzha Idol', '0811 4455 6677', 'Online', 'Batal', 'Jln. Utama No. 8, Banda Aceh', 1, 420],
            ['Widi Vierratale', '0821 7788 9900', 'Offline', 'Pending', 'Ds. Senorita No. 5, Jakarta', 2, 280],
            ['Yovie Widianto', '0819 1122 3344', 'Online', 'Diproses', 'Jln. Janji No. 10, Bandung', 3, 850],
            ['Ziva Magnolya', '0852 5566 7788', 'Offline', 'Selesai', 'Kpg. Peri No. 2, Jakarta Timur', 1, 600]
        ];

        // Looping data transaksi
        foreach ($daftarPesanan as $index => $pesanan) {
            
            // Generate nomor invoice unik string (INV-001 sampai INV-100)
            $noInvoice = 'INV-' . str_pad($index + 1, 3, '0', STR_PAD_LEFT);

            // 1. Insert data utama penjualan dengan ID String Invoice
            DB::table('tb_penjualan')->insert([
                'id_penjualan'      => $noInvoice, // Primary Key berbasis nota
                'tanggal_transaksi' => now()->subDays(rand(1, 30))->format('Y-m-d'),
                'nama_pelanggan'    => $pesanan[0],
                'no_hp'             => $pesanan[1],
                'jenis_pembelian'   => $pesanan[2], // ENUM Online/Offline
                'status'            => $pesanan[3], // ENUM Pending/Diproses/Selesai/Batal
                'alamat'            => $pesanan[4],
                'id_staf'           => 1,
                'created_at'        => now(),
                'updated_at'        => now(),
            ]);

            // 2. Insert data detail penjualan (Relasi string terikat kuat!)
            DB::table('tb_detail_penjualan')->insert([
                'id_penjualan' => $noInvoice,    // Relasi foreign key VARCHAR(20)
                'id_varietas'  => $pesanan[5],  
                'jumlah'       => $pesanan[6],    // Qty Pokok
                'created_at'   => now(),
                'updated_at'   => now(),
            ]);
        }
    }
}