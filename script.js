// FILE: script.js
// ENGINE UTAMA STRUKTUR DATA (LINKED LIST, QUEUE DEQUE, STACK UNDO, BUBBLE SORT)

// ==================== 1. STRUKTUR DATA MANUAL ====================

// --- NODE LINKED LIST BANK SOAL ---
class NodeSoal {
    constructor(soalMentah) {
        this.id = soalMentah.id;
        this.teksSoal = soalMentah.teks;
        this.pilihan = soalMentah.pilihan;
        this.kunciJawaban = soalMentah.kunci;
        this.jawabanUser = null; // Menyimpan status jawaban pilihan anak
        this.next = null;
    }
}

// --- LINKED LIST UTAMA UNTUK BANK SOAL ---
class LinkedListBankSoal {
    constructor() {
        this.head = null;
    }

    insertLast(soalMentah) {
        const newNode = new NodeSoal(soalMentah);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }

    clear() {
        this.head = null;
    }
}

// --- NODE GENERAL UNTUK QUEUE & STACK ---
class DSNode {
    constructor(nodeSoalPtr) {
        this.nodeSoal = nodeSoalPtr; // Menunjuk ke object NodeSoal asli
        this.next = null;
    }
}

// --- QUEUE / DEQUE (DOUBLE-ENDED QUEUE) UNTUK ANTREAN SOAL KUIS ---
class DequeAntreanSoal {
    constructor() {
        this.front = null;
        this.rear = null;
        this.size = 0;
    }

    // Enqueue normal dari belakang
    enqueueRear(nodeSoalPtr) {
        const newNode = new DSNode(nodeSoalPtr);
        if (!this.rear) {
            this.front = this.rear = newNode;
        } else {
            this.rear.next = newNode;
            this.rear = newNode;
        }
        this.size++;
    }

    // KHUSUS UNDO: Kembalikan soal ke barisan depan antrean
    enqueueFront(nodeSoalPtr) {
        const newNode = new DSNode(nodeSoalPtr);
        if (!this.front) {
            this.front = this.rear = newNode;
        } else {
            newNode.next = this.front;
            this.front = newNode;
        }
        this.size++;
    }

    // Dequeue dari barisan paling depan
    dequeue() {
        if (!this.front) return null;
        const temp = this.front;
        const dataSoal = temp.nodeSoal;
        this.front = this.front.next;
        if (!this.front) this.rear = null;
        this.size--;
        return dataSoal;
    }

    isEmpty() {
        return this.size === 0;
    }
}

// --- STACK UNTUK UTILITY UNDO JAWABAN ---
class StackUndoJawaban {
    constructor() {
        this.top = null;
        this.count = 0;
    }

    push(nodeSoalPtr) {
        const newNode = new DSNode(nodeSoalPtr);
        newNode.next = this.top;
        this.top = newNode;
        this.count++;
    }

    pop() {
        if (!this.top) return null;
        const temp = this.top;
        const dataSoal = temp.nodeSoal;
        this.top = this.top.next;
        this.count--;
        return dataSoal;
    }

    isEmpty() {
        return this.top === null;
    }
}


// ==================== 2. GLOBAL STATE APLIKASI ====================
let currentName = "";
let currentCharacter = "";
let selectedPhase = "";
let selectedSubject = "";

const bankSoalList = new LinkedListBankSoal();
const antreanKuis = new DequeAntreanSoal();
const stackUndo = new StackUndoJawaban();

let soalAktifSekarang = null;
let totalSoalKuis = 10;
let nomorSoalAktif = 0;


// ==================== 3. EVENT LISTENERS & ROUTING LAYAR ====================
document.addEventListener("DOMContentLoaded", () => {
    initCharacterSelection();
    
    // Auth inputs listener
    const nameInput = document.getElementById("player-name");
    nameInput.addEventListener("input", validateAuthForm);

    // Button navigasi screen 1 -> screen 2
    document.getElementById("btn-to-selection").addEventListener("click", () => {
        currentName = nameInput.value.trim();
        document.getElementById("badge-name").innerText = currentName;
        document.getElementById("badge-avatar").innerText = getCharEmoji(currentCharacter);
        switchScreen("screen-selection");
    });

    // Button back screen 2 -> screen 1
    document.getElementById("back-to-auth").addEventListener("click", () => {
        switchScreen("screen-auth");
    });

    // Pilihan Mapel di Screen 2
    const subjectButtons = document.querySelectorAll(".btn-subject");
    subjectButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            selectedSubject = e.target.getAttribute("data-subject");
            selectedPhase = e.target.closest(".phase-card").getAttribute("data-phase");
            
            // Start Quiz Sequence
            mulaiKuisSistem();
        });
    });

    // Kuis Action Buttons (Next & Undo)
    document.getElementById("btn-next").addEventListener("click", urusTombolNext);
    document.getElementById("btn-undo").addEventListener("click", urusTombolUndo);

    // Restart Button
    document.getElementById("btn-restart").addEventListener("click", () => {
        document.getElementById("player-name").value = "";
        currentCharacter = "";
        document.querySelectorAll(".character-card").forEach(c => c.classList.remove("selected"));
        validateAuthForm();
        switchScreen("screen-auth");
    });
});

// Switch view screen utility
function switchScreen(screenId) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(screenId).classList.add("active");
}

function initCharacterSelection() {
    const cards = document.querySelectorAll(".character-card");
    cards.forEach(card => {
        card.addEventListener("click", () => {
            cards.forEach(c => c.classList.remove("selected"));
            card.classList.add("selected");
            currentCharacter = card.getAttribute("data-char");
            validateAuthForm();
        });
    });
}

function validateAuthForm() {
    const nameVal = document.getElementById("player-name").value.trim();
    const btnNext = document.getElementById("btn-to-selection");
    if (nameVal.length >= 2 && currentCharacter !== "") {
        btnNext.disabled = false;
    } else {
        btnNext.disabled = true;
    }
}

function getCharEmoji(charName) {
    if (charName === "Kucing") return "🐱";
    if (charName === "Kelinci") return "🐰";
    if (charName === "Panda") return "🐼";
    return "🌟";
}


// ==================== 4. SISTEM ENGINE CORE KUIS ====================

function mulaiKuisSistem() {
    // 1. Reset state kuis lama
    bankSoalList.clear();
    while(!antreanKuis.isEmpty()) { antreanKuis.dequeue(); }
    while(!stackUndo.isEmpty()) { stackUndo.pop(); }
    
    soalAktifSekarang = null;
    nomorSoalAktif = 0;

    // 2. Load soal dari data-soal.js ke LINKED LIST (pengelola bank soal dinamis)
    //    Setiap soal menjadi NodeSoal yang terhubung via pointer .next
    const sourceData = BANK_SOAL_MENTAH[selectedPhase][selectedSubject];
    sourceData.forEach(item => {
        bankSoalList.insertLast(item);
    });

    // 3. Traversal LINKED LIST dari head → tail, masukkan tiap NodeSoal ke QUEUE
    //    Queue menyimpan POINTER ke NodeSoal asli (bukan salinan).
    //    Perubahan jawabanUser pada NodeSoal langsung ter-reflect di Linked List,
    //    sehingga akhiriKuisDanHitungSkor() cukup traversal LL sekali lagi.
    let ptr = bankSoalList.head;
    while (ptr) {
        antreanKuis.enqueueRear(ptr);
        ptr = ptr.next;
    }

    // Update Meta display kuis
    document.getElementById("quiz-title-tag").innerText = `Fase ${selectedPhase} • ${selectedSubject}`;
    switchScreen("screen-quiz");
    
    // Ambil soal pertama dari antrean
    renderSoalBerikutnyaDariQueue();
}

function renderSoalBerikutnyaDariQueue() {
    if (antreanKuis.isEmpty()) {
        akhiriKuisDanHitungSkor();
        return;
    }

    nomorSoalAktif++;
    // Ambil element terdepan antrean (DEQUEUE)
    soalAktifSekarang = antreanKuis.dequeue();
    
    // Update tampilan progress
    document.getElementById("quiz-progress").innerText = `Soal ${nomorSoalAktif} dari ${totalSoalKuis}`;
    document.getElementById("quiz-progress-fill").style.width = `${(nomorSoalAktif / totalSoalKuis) * 100}%`;
    document.getElementById("stack-count").innerText = stackUndo.count;

    // Render text soal & pilihan ganda
    document.getElementById("question-text").innerText = soalAktifSekarang.teksSoal;
    
    const optionsBlock = document.getElementById("options-block");
    optionsBlock.innerHTML = ""; // Bersihkan pilihan lama

    const abcd = ["A", "B", "C", "D"];
    soalAktifSekarang.pilihan.forEach((pilihanTeks, index) => {
        const btnOpt = document.createElement("button");
        btnOpt.className = "option-item";
        if (soalAktifSekarang.jawabanUser === abcd[index]) {
            btnOpt.classList.add("selected");
        }
        
        btnOpt.innerHTML = `<span class="option-prefix">${abcd[index]}</span> ${pilihanTeks}`;
        btnOpt.addEventListener("click", () => {
            // Beri tanda terpilih
            document.querySelectorAll(".option-item").forEach(o => o.classList.remove("selected"));
            btnOpt.classList.add("selected");
            
            // Simpan jawaban sementara di Node Soal
            soalAktifSekarang.jawabanUser = abcd[index];
            document.getElementById("btn-next").disabled = false;
        });
        optionsBlock.appendChild(btnOpt);
    });

    // Cek button next status
    if (soalAktifSekarang.jawabanUser) {
        document.getElementById("btn-next").disabled = false;
    } else {
        document.getElementById("btn-next").disabled = true;
    }
}

function urusTombolNext() {
    // Masukkan soal yang baru saja dijawab ke dalam STACK UNDO
    stackUndo.push(soalAktifSekarang);
    
    // Ambil langkah maju, tampilkan soal di depan queue selanjutnya
    renderSoalBerikutnyaDariQueue();
}

function urusTombolUndo() {
    if (stackUndo.isEmpty()) {
        alert("Ops! Kamu berada di soal nomor satu, tidak ada jawaban yang bisa di-undo.");
        return;
    }

    // 1. Kembalikan soal yang SEDANG AKTIF ke barisan DEPAN QUEUE (enqueueFront = Deque)
    antreanKuis.enqueueFront(soalAktifSekarang);

    // 2. POP: Ambil soal sebelumnya dari puncak STACK UNDO
    const soalSebelumnya = stackUndo.pop();

    // 3. Selipkan soal sebelumnya ke DEPAN QUEUE agar langsung di-dequeue oleh renderSoal
    antreanKuis.enqueueFront(soalSebelumnya);

    // 4. Mundurkan counter: -2 karena renderSoalBerikutnyaDariQueue() otomatis +1
    nomorSoalAktif -= 2;

    // 5. Render soal sebelumnya (akan melakukan DEQUEUE dari depan queue)
    renderSoalBerikutnyaDariQueue();
}


// ==================== 5. LEADERBOARD ENGINE & SORTING (BUBBLE SORT) ====================

function akhiriKuisDanHitungSkor() {
    let jumlahBenar = 0;

    // Telusuri ulang LINKED LIST bank soal untuk mencocokkan jawaban secara sekuensial
    let ptr = bankSoalList.head;
    while(ptr) {
        if (ptr.jawabanUser === ptr.kunciJawaban) {
            jumlahBenar++;
        }
        ptr = ptr.next;
    }

    let poinAkhir = jumlahBenar * 10; // 1 soal benar bernilai 10 poin

    // Simpan skor player baru ke Firebase Realtime Database
    const recordBaru = {
        nama: currentName,
        karakter: currentCharacter,
        fase: selectedPhase,
        poin: poinAkhir
    };

    // Push ke Firebase, lalu langsung tampilkan screen result dengan listener real-time
    database.ref('leaderboard').push(recordBaru).then(() => {
        // Pindah ke screen hasil terlebih dahulu agar UI langsung tampil
        switchScreen("screen-result");

        // Update header dan skor pemain sekali di sini
        document.getElementById("res-player-name").innerText = currentName;
        document.getElementById("res-player-char").innerText = getCharEmoji(currentCharacter);
        document.getElementById("res-score").innerText = poinAkhir;
        document.getElementById("res-correct-detail").innerText = `Benar ${jumlahBenar} dari 10 soal`;
        document.getElementById("leaderboard-phase-title").innerText = selectedPhase;

        // Baca leaderboard dari Firebase secara real-time (.on = update otomatis jika ada data baru)
        database.ref('leaderboard').on('value', (snapshot) => {
            let dataLeaderboard = [];
            snapshot.forEach((child) => {
                dataLeaderboard.push(child.val());
            });

            // Panggil BUBBLE SORT untuk mengurutkan ranking data peringkat leaderboard
            let sortedData = bubbleSortLeaderboard(dataLeaderboard);

            // Render baris leaderboard (hanya update tabel, bukan seluruh screen)
            renderLeaderboardRows(poinAkhir, sortedData);
        });
    });
}

// ALGORITMA SORTING MANUAL: BUBBLE SORT (Persyaratan Tugas Besar)
function bubbleSortLeaderboard(arraySkor) {
    let len = arraySkor.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            // Urutkan descending: Tukar posisi jika elemen depan lebih kecil dari elemen belakang
            if (arraySkor[j].poin < arraySkor[j + 1].poin) {
                let temp = arraySkor[j];
                arraySkor[j] = arraySkor[j + 1];
                arraySkor[j + 1] = temp;
            }
        }
    }
    return arraySkor;
}

// Render baris leaderboard dari data Firebase (dipanggil setiap ada update real-time)
function renderLeaderboardRows(poinPemain, semuaPeringkat) {
    const rowsContainer = document.getElementById("leaderboard-rows");
    rowsContainer.innerHTML = "";

    // Saring data peringkat hanya untuk FASE yang aktif dimainkan
    let filteredPeringkat = semuaPeringkat.filter(item => item.fase === selectedPhase);

    filteredPeringkat.forEach((item, index) => {
        const row = document.createElement("div");
        row.className = "leaderboard-row";
        
        // Beri highlight khusus untuk skor pemain saat ini di tabel peringkat
        if (item.nama === currentName && item.poin === poinPemain && item.karakter === currentCharacter) {
            row.classList.add("highlight");
        }

        row.innerHTML = `
            <div class="cell-rank">#${index + 1}</div>
            <div class="cell-profile">${getCharEmoji(item.karakter)} <strong>${item.nama}</strong></div>
            <div class="cell-score">${item.poin} Poin</div>
        `;
        rowsContainer.appendChild(row);
    });
}