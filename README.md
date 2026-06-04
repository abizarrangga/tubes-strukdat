# QuizStack / Quiz Bintang

QuizStack atau Quiz Bintang adalah aplikasi kuis edukasi berbasis web frontend yang dibuat menggunakan HTML, CSS, dan JavaScript. Aplikasi ini tidak memakai backend, sehingga seluruh data pemain, pilihan kuis, hasil skor, dan leaderboard disimpan di browser menggunakan `localStorage`.

Proyek ini dibuat sebagai tugas besar Struktur Data. Fokus utama implementasinya bukan hanya membuat kuis berjalan, tetapi juga menunjukkan penggunaan struktur data manual di dalam alur aplikasi, yaitu:

- Linked List untuk mengelola bank soal kuis.
- Queue/Deque untuk mengatur antrean soal.
- Stack untuk fitur backtracking atau undo jawaban.
- Bubble Sort manual untuk mengurutkan leaderboard.

## Struktur File

```text
QuizStack/
|-- index.html          # Halaman awal: input nama dan pilih karakter
|-- pilih-kelas.html    # Halaman pilih kelas/fase
|-- pilih-mapel.html    # Halaman pilih mata pelajaran
|-- kuis.html           # Halaman kuis dan implementasi Linked List, Queue/Deque, Stack
|-- statistik.html      # Halaman hasil/statistik setelah kuis selesai
|-- leaderboard.html    # Halaman peringkat dan implementasi Bubble Sort manual
|-- data-karakter.js    # Data karakter pemain
|-- data-soal.js        # Data mentah bank soal
|-- script.js           # File engine versi lama/alternatif
|-- style.css           # Tampilan aplikasi, termasuk responsive Android
`-- README.md           # Dokumentasi tugas besar
```

Catatan: implementasi struktur data yang aktif dipakai aplikasi berada di `kuis.html` dan `leaderboard.html`.

## Alur Aplikasi

1. Pemain membuka `index.html`, mengisi nama, dan memilih karakter.
2. Pemain memilih kelas/fase di `pilih-kelas.html`.
3. Pemain memilih mata pelajaran di `pilih-mapel.html`.
4. Kuis berjalan di `kuis.html`.
5. Setelah semua soal selesai atau waktu habis, pemain diarahkan ke `statistik.html`.
6. Skor pemain disimpan ke `localStorage`.
7. Leaderboard di `leaderboard.html` membaca data skor, mengurutkannya dengan Bubble Sort manual, lalu menampilkan peringkat tertinggi.

## Validasi Struktur Data

Berdasarkan kode yang dipakai, implementasi struktur data pada proyek ini sudah sesuai secara teori dengan kriteria tugas besar:

| Struktur Data | Status | File Utama | Kesimpulan |
| --- | --- | --- | --- |
| Linked List | Valid | `kuis.html` | Bank soal kuis dimuat ke node yang saling terhubung melalui pointer `next`. |
| Queue/Deque | Valid | `kuis.html` | Soal maju memakai FIFO melalui `dequeue()`, dan undo memakai `enqueueFront()`. |
| Stack | Valid | `kuis.html` | Riwayat soal yang sudah dijawab disimpan dengan `push()` dan diambil kembali dengan `pop()`. |
| Bubble Sort Manual | Valid | `leaderboard.html` | Leaderboard diurutkan descending tanpa `.sort()` bawaan JavaScript. |

Pencarian pada kode juga menunjukkan tidak ada penggunaan `.sort()` bawaan untuk mengurutkan leaderboard.

## 1. Linked List untuk Bank Soal

Linked List adalah struktur data linear yang terdiri dari node-node. Setiap node menyimpan data dan pointer menuju node berikutnya. Pada aplikasi ini, setiap soal diubah menjadi objek `NodeSoal`, lalu dimasukkan ke dalam `LinkedListBankSoal`.

Linked List dipakai untuk mengelola bank soal kuis secara dinamis. Artinya, data soal tidak hanya dibaca sebagai array biasa, tetapi diubah menjadi rangkaian node. Jawaban user juga disimpan langsung pada node soal melalui properti `jawabanUser`.

Kode node soal:

```js
class NodeSoal {
    constructor(soalMentah) {
        this.id = soalMentah.id;
        this.teks = soalMentah.teks;
        this.pilihan = soalMentah.pilihan;
        this.kunci = soalMentah.kunci;
        this.jawabanUser = null;
        this.next = null;
    }
}
```

Kode Linked List:

```js
class LinkedListBankSoal {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    insertLast(soalMentah) {
        const node = new NodeSoal(soalMentah);
        if (!this.head) {
            this.head = node;
        } else {
            let curr = this.head;
            while (curr.next) curr = curr.next;
            curr.next = node;
        }
        this.size++;
    }

    clear() {
        this.head = null;
        this.size = 0;
    }
}
```

Pemakaian Linked List saat memuat soal:

```js
sumberData.forEach(item => {
    bankSoal.insertLast(item);
});
```

Traversal Linked List untuk memasukkan node soal ke antrean:

```js
let ptr = bankSoal.head;
while (ptr) {
    antreanKuis.enqueueRear(ptr);
    ptr = ptr.next;
}
```

Traversal Linked List untuk menghitung skor akhir:

```js
let benar = 0;
let curr = bankSoal.head;
while (curr) {
    if (curr.jawabanUser === curr.kunci) benar++;
    curr = curr.next;
}
```

Kesimpulan: Linked List sudah benar secara teori karena bank soal aktif dikelola sebagai node berantai, memiliki `head`, memiliki pointer `next`, dapat ditambahkan dengan `insertLast()`, dan dapat ditraversal untuk antrean maupun rekap skor.

## 2. Queue/Deque untuk Antrean Soal

Queue adalah struktur data dengan prinsip FIFO, yaitu First In First Out. Data yang masuk lebih dulu akan keluar lebih dulu. Pada aplikasi kuis, prinsip ini cocok untuk menampilkan soal secara berurutan.

Namun aplikasi juga membutuhkan fitur undo. Karena itu, implementasi yang dipakai adalah Deque, yaitu antrean yang bisa menerima data dari belakang dan depan. Operasi normal memakai `enqueueRear()` dan `dequeue()`, sedangkan undo memakai `enqueueFront()`.

Kode node umum untuk Queue/Deque dan Stack:

```js
class DSNode {
    constructor(ptr) {
        this.data = ptr;
        this.next = null;
    }
}
```

Kode Deque:

```js
class DequeAntreanSoal {
    constructor() {
        this.front = null;
        this.rear = null;
        this.size = 0;
    }

    enqueueRear(nodeSoalPtr) {
        const node = new DSNode(nodeSoalPtr);
        if (!this.rear) {
            this.front = this.rear = node;
        } else {
            this.rear.next = node;
            this.rear = node;
        }
        this.size++;
    }

    enqueueFront(nodeSoalPtr) {
        const node = new DSNode(nodeSoalPtr);
        if (!this.front) {
            this.front = this.rear = node;
        } else {
            node.next = this.front;
            this.front = node;
        }
        this.size++;
    }

    dequeue() {
        if (!this.front) return null;
        const data = this.front.data;
        this.front = this.front.next;
        if (!this.front) this.rear = null;
        this.size--;
        return data;
    }

    isEmpty() {
        return this.size === 0;
    }
}
```

Pemakaian Queue saat soal berjalan maju:

```js
function tampilkanSoal() {
    if (antreanKuis.isEmpty()) {
        selesaikanKuis();
        return;
    }

    nomorUrut++;
    soalAktif = antreanKuis.dequeue();
}
```

Pemakaian Deque saat undo:

```js
antreanKuis.enqueueFront(soalAktif);
const soalLama = stackUndo.pop();
antreanKuis.enqueueFront(soalLama);
```

Kesimpulan: Queue/Deque sudah benar secara teori karena alur maju memakai FIFO melalui `dequeue()` dari depan antrean, sedangkan fitur undo dapat menyelipkan soal kembali ke depan antrean melalui `enqueueFront()`.

## 3. Stack untuk Backtracking/Undo

Stack adalah struktur data dengan prinsip LIFO, yaitu Last In First Out. Data terakhir yang masuk akan menjadi data pertama yang keluar. Prinsip ini cocok untuk fitur undo, karena saat user menekan tombol sebelumnya, aplikasi harus kembali ke soal terakhir yang sudah dilewati.

Pada aplikasi ini, setiap kali user menekan tombol `SELANJUTNYA`, soal aktif dimasukkan ke stack. Saat user menekan tombol `SEBELUMNYA`, soal terakhir dikeluarkan dari stack menggunakan `pop()`.

Kode Stack:

```js
class StackUndoJawaban {
    constructor() {
        this.top = null;
        this.count = 0;
    }

    push(nodeSoalPtr) {
        const node = new DSNode(nodeSoalPtr);
        node.next = this.top;
        this.top = node;
        this.count++;
    }

    pop() {
        if (!this.top) return null;
        const data = this.top.data;
        this.top = this.top.next;
        this.count--;
        return data;
    }

    isEmpty() {
        return this.top === null;
    }
}
```

Pemakaian Stack saat tombol selanjutnya ditekan:

```js
document.getElementById('btn-selanjutnya').onclick = () => {
    stackUndo.push(soalAktif);
    hitungSkorLive();
    tampilkanSoal();
};
```

Pemakaian Stack saat tombol sebelumnya ditekan:

```js
document.getElementById('btn-sebelumnya').onclick = () => {
    if (stackUndo.isEmpty()) return;

    antreanKuis.enqueueFront(soalAktif);
    const soalLama = stackUndo.pop();

    hitungSkorLive();
    nomorUrut -= 2;
    if (nomorUrut < 0) nomorUrut = 0;
    soalAktif = null;

    antreanKuis.enqueueFront(soalLama);
    tampilkanSoal();
};
```

Traversal Stack untuk menghitung skor sementara:

```js
let cursor = stackUndo.top;
while (cursor) {
    if (cursor.data.jawabanUser === cursor.data.kunci) skorSementara += 10;
    cursor = cursor.next;
}
```

Kesimpulan: Stack sudah benar secara teori karena riwayat soal yang sudah dijawab disimpan dengan `push()`, lalu riwayat terakhir diambil dengan `pop()` untuk mendukung backtracking/undo.

## 4. Bubble Sort Manual untuk Leaderboard

Bubble Sort adalah algoritma sorting sederhana yang membandingkan dua elemen bersebelahan. Jika urutannya salah, kedua elemen ditukar. Proses ini diulang sampai data terurut.

Pada aplikasi ini, Bubble Sort dipakai untuk mengurutkan skor leaderboard dari tertinggi ke terendah. Implementasinya manual menggunakan perulangan `for`, perbandingan skor, dan variabel sementara `temp`. Kode tidak menggunakan fungsi `.sort()` bawaan JavaScript.

Kode Bubble Sort:

```js
function urutkanDenganBubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j].skor < arr[j + 1].skor) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}
```

Pemakaian Bubble Sort pada leaderboard:

```js
const dataTerurut = urutkanDenganBubbleSort(dataGabungan);
const top10 = dataTerurut.slice(0, 10);
```

Penjelasan:

- `arr[j].skor < arr[j + 1].skor` berarti jika skor kiri lebih kecil daripada skor kanan, posisinya ditukar.
- Hasil akhirnya adalah urutan descending, yaitu skor terbesar berada di posisi paling atas.
- Variabel `temp` dipakai untuk proses pertukaran manual.
- `.slice(0, 10)` hanya dipakai untuk mengambil 10 data teratas setelah data selesai diurutkan.

Kesimpulan: Bubble Sort sudah benar secara teori karena proses sorting dilakukan manual, mengurutkan skor dari tertinggi ke terendah, dan tidak menggunakan `.sort()` bawaan JavaScript.

## Data yang Disimpan di localStorage

Aplikasi memakai `localStorage` agar dapat berjalan tanpa server. Data yang disimpan:

- `player_name`: nama pemain.
- `player_char_id`: karakter yang dipilih pemain.
- `selected_fase`: kelas/fase yang dipilih.
- `selected_mapel`: mata pelajaran yang dipilih.
- `skor_akhir`: skor akhir kuis terakhir.
- `benar_hitung`: jumlah jawaban benar.
- `durasi_detik`: durasi pengerjaan.
- `global_leaderboard`: kumpulan data skor pemain untuk leaderboard.

## Kesimpulan Akhir

Implementasi struktur data pada QuizStack sudah sesuai dengan konsep teori:

- Linked List mengelola bank soal aktif sebagai node berantai.
- Queue/Deque mengatur urutan soal dengan FIFO dan mendukung penyelipan soal ke depan saat undo.
- Stack menyimpan riwayat soal yang sudah dijawab untuk fitur backtracking.
- Bubble Sort manual mengurutkan skor leaderboard dari tertinggi ke terendah tanpa `.sort()`.

Dengan demikian, aplikasi ini sudah memenuhi kebutuhan tugas besar Struktur Data sekaligus tetap berjalan sebagai aplikasi kuis web yang dapat digunakan langsung di browser.
