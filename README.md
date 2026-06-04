# QuizStack (Quiz Bintang)

QuizStack atau Quiz Bintang adalah aplikasi kuis edukasi berbasis Web Frontend murni. Aplikasi ini berjalan hanya dengan HTML, CSS, dan JavaScript tanpa backend. Seluruh pilihan pemain, hasil kuis, dan data leaderboard disimpan di `localStorage` browser.

## Fitur Utama

- Pemain mengisi nama dan memilih karakter.
- Pemain memilih fase kelas dan mata pelajaran.
- Kuis berjalan dengan sistem antrean soal.
- Tombol sebelumnya memakai konsep undo berbasis Stack.
- Skor akhir dihitung dari jawaban yang tersimpan pada node Linked List.
- Leaderboard hanya berisi data real dari `localStorage`, tanpa dummy awal.
- Statistik menampilkan ringkasan percobaan, rata-rata skor, skor tertinggi, dan tombol kerjakan lagi.
- Tombol kerjakan lagi di halaman statistik langsung mengulang kuis dengan fase dan mata pelajaran yang sama.

## Struktur Proyek

```text
QuizStack/
├── index.html          # Halaman awal: input nama dan pilih karakter
├── pilih-kelas.html    # Halaman pilih fase atau kelas
├── pilih-mapel.html    # Halaman pilih mata pelajaran
├── kuis.html           # Halaman pengerjaan kuis dan inti struktur data
├── leaderboard.html    # Halaman peringkat real-time dari localStorage
├── statistik.html      # Halaman hasil skor, statistik, dan tombol kerjakan lagi
├── data-karakter.js    # Data karakter pemain
├── data-soal.js        # Bank soal mentah per fase dan mapel
├── script.js           # Engine lama/alternatif dari versi proyek sebelumnya
└── style.css           # Tampilan UI aplikasi
```

## Alur Penyimpanan Data

Aplikasi memakai `localStorage` agar tetap dapat berjalan tanpa backend.

Data penting yang disimpan:

- `player_name`: nama pemain.
- `player_char_id`: karakter pemain.
- `selected_fase`: fase atau kelas yang dipilih.
- `selected_mapel`: mata pelajaran yang dipilih.
- `skor_akhir`: skor akhir kuis terakhir.
- `benar_hitung`: jumlah jawaban benar kuis terakhir.
- `durasi_detik`: waktu pengerjaan kuis terakhir.
- `global_leaderboard`: array skor semua percobaan pemain.

## Linked List pada Bank Soal

Linked List digunakan di `kuis.html` untuk menyimpan bank soal yang sedang dikerjakan. Setiap soal diubah menjadi objek `NodeSoal` yang memiliki properti `next` sebagai pointer ke soal berikutnya.

Secara ilmiah, Linked List adalah struktur data linear yang elemen-elemennya tidak harus berada berurutan di memori. Tiap node menyimpan data dan referensi ke node berikutnya. Pada program ini, Linked List berguna karena jawaban pemain dapat langsung disimpan pada node soal aktif melalui properti `jawabanUser`.

Operasi yang digunakan:

- `insertLast()`: menambahkan soal baru di akhir list.
- traversal dari `head`: menelusuri semua node soal.
- update `jawabanUser`: menyimpan jawaban pemain langsung di node.
- traversal final: menghitung jumlah jawaban benar setelah kuis selesai.

## Queue dan Deque pada Antrean Soal

Queue digunakan untuk mengatur urutan soal. Prinsip Queue adalah FIFO atau First In First Out, artinya soal yang masuk lebih dulu akan keluar lebih dulu.

Program memakai bentuk Deque atau Double Ended Queue, yaitu antrean yang dapat menerima operasi dari depan dan belakang. Bagian belakang dipakai untuk memasukkan semua soal saat awal kuis, sedangkan bagian depan dipakai saat pemain menekan tombol sebelumnya.

Operasi yang digunakan:

- `enqueueRear()`: memasukkan soal ke belakang antrean saat kuis dimulai.
- `dequeue()`: mengambil soal dari depan antrean untuk ditampilkan.
- `enqueueFront()`: mengembalikan soal ke depan antrean saat undo.

Dengan Deque, halaman kuis dapat kembali ke soal sebelumnya tanpa membangun ulang seluruh array soal.

## Stack pada Fitur Undo

Stack digunakan untuk menyimpan riwayat soal yang sudah dilewati pemain. Stack bekerja dengan prinsip LIFO atau Last In First Out, yaitu data terakhir yang masuk akan menjadi data pertama yang keluar.

Pada program ini, setiap kali pemain menekan tombol selanjutnya, soal aktif dimasukkan ke Stack dengan operasi `push()`. Saat tombol sebelumnya ditekan, soal terakhir dikeluarkan dari Stack dengan operasi `pop()`.

Operasi yang digunakan:

- `push()`: menyimpan soal aktif ke riwayat undo.
- `pop()`: mengambil soal terakhir dari riwayat undo.
- traversal Stack: menghitung skor live dari soal yang sudah dikonfirmasi.

Stack cocok untuk undo karena perilaku undo selalu mengambil langkah terakhir terlebih dahulu.

## Bubble Sort Manual pada Leaderboard dan Statistik

Bubble Sort digunakan untuk mengurutkan data skor secara descending dari skor tertinggi ke skor terendah. Program sengaja tidak memakai `.sort()` bawaan JavaScript agar algoritma struktur data terlihat manual.

Secara ilmiah, Bubble Sort adalah algoritma sorting berbasis perbandingan dua elemen bertetangga. Jika urutannya salah, kedua elemen ditukar. Proses ini diulang beberapa pass sampai data terurut.

Karakteristik Bubble Sort:

- Kompleksitas waktu rata-rata dan terburuk: O(n^2).
- Kompleksitas memori tambahan: O(1), karena hanya memakai variabel sementara `temp`.
- Mudah dipahami dan cocok untuk demonstrasi konsep sorting manual.

Pada `leaderboard.html`, data `global_leaderboard` difilter terlebih dahulu berdasarkan `selected_fase`, lalu Bubble Sort mengurutkan 10 skor tertinggi khusus kelas/fase tersebut. Pada `statistik.html`, Bubble Sort dipakai untuk mengambil skor tertinggi dari seluruh percobaan.

## Revisi Alur Tombol

### leaderboard.html

- Data dummy dikosongkan dengan `DEFAULT_LEADERBOARD = []`.
- Leaderboard hanya menampilkan data dari `global_leaderboard` di `localStorage` untuk kelas/fase yang sedang dipilih.
- Tombol `STATISTIK` mengarah ke `statistik.html`.
- Tombol `MAIN LAGI` diganti menjadi `KEMBALI`.
- Tombol `KEMBALI` menuju `index.html` dan hanya menghapus pilihan kuis sementara, bukan database skor leaderboard.

### statistik.html

- Halaman statistik menjadi satu-satunya halaman hasil setelah kuis selesai.
- Tombol `KERJAKAN LAGI` ditempatkan di halaman statistik.
- Tombol tersebut menghapus hasil kuis sementara, tetapi tetap mempertahankan `selected_fase`, `selected_mapel`, `player_name`, dan `player_char_id`.
- Karena data fase dan mapel tetap tersimpan, pemain langsung diarahkan ke `kuis.html` untuk mengerjakan ulang kuis yang sama.

## Catatan Presentasi Struktur Data

Di dalam blok `<script>` pada `kuis.html`, `leaderboard.html`, dan `statistik.html` sudah ditambahkan komentar mencolok seperti:

```js
// ======= [LOGIKA STRUKTUR DATA: STACK PUSH - BUAT NODE BARU] =======
```

Komentar tersebut bisa digunakan saat presentasi untuk menunjukkan bagian program yang benar-benar melakukan operasi Linked List, Queue/Deque, Stack, dan Bubble Sort.
