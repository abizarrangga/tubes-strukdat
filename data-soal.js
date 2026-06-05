// FILE: data-soal.js
// BANK SOAL TERPISAH (10 SOAL PER KATEGORI SESUAI PERSYARATAN FASE)

const BANK_SOAL_MENTAH = {
    "1-2": {
        "MTK": [
            { id: 1, teks: "Beni punya 5 apel, lalu Ibu memberikan lagi 3 apel. Berapa apel Beni sekarang?", pilihan: ["6 Apel", "7 Apel", "8 Apel", "9 Apel"], kunci: "C" },
            { id: 2, teks: "Hitunglah hasil dari 10 - 4 = ...", pilihan: ["5", "6", "7", "8"], kunci: "B" },
            { id: 3, teks: "Angka manakah yang lebih besar dari 15?", pilihan: ["12", "14", "15", "19"], kunci: "D" },
            { id: 4, teks: "Bangun datar yang memiliki 3 sisi sama panjang disebut...", pilihan: ["Persegi", "Segitiga", "Lingkaran", "Trapesium"], kunci: "B" },
            { id: 5, teks: "Sebelum angka 20 adalah angka...", pilihan: ["18", "19", "21", "22"], kunci: "B" },
            { id: 6, teks: "Hasil penjumlahan dari 7 + 7 adalah...", pilihan: ["12", "13", "14", "15"], kunci: "C" },
            { id: 7, teks: "Urutan angka setelah 11, 12, 13, adalah...", pilihan: ["14", "15", "16", "17"], kunci: "A" },
            { id: 8, teks: "Dino memiliki 2 permen. Rara memiliki 4 permen. Berapa jumlah total permen mereka?", pilihan: ["5", "6", "7", "8"], kunci: "B" },
            { id: 9, teks: "Jam menunjukkan jarum pendek di 3, jarum panjang di 12. Jam berapa itu?", pilihan: ["Jam 12", "Jam 3", "Jam 6", "Jam 9"], kunci: "B" },
            { id: 10, teks: "Sepuluh ditambah sepuluh sama dengan...", pilihan: ["Dua Puluh", "Tiga Puluh", "Sepuluh", "Empat Puluh"], kunci: "A" }
        ],
        "PENGETAHUAN_UMUM": [
            { id: 1, teks: "Apa warna bendera negara Indonesia?", pilihan: ["Merah-Putih", "Putih-Merah", "Merah-Kuning", "Biru-Putih"], kunci: "A" },
            { id: 2, teks: "Hewan apa yang dikenal sebagai Raja Hutan?", pilihan: ["Gajah", "Kancil", "Singa", "Jerapah"], kunci: "C" },
            { id: 3, teks: "Kita menghirup udara menggunakan organ tubuh apa?", pilihan: ["Mata", "Telinga", "Hidung", "Mulut"], kunci: "C" },
            { id: 4, teks: "Ibu kota negara Indonesia saat ini adalah...", pilihan: ["Bandung", "Jakarta", "Surabaya", "Medan"], kunci: "B" },
            { id: 5, teks: "Matahari terbit di sebelah...", pilihan: ["Barat", "Utara", "Selatan", "Timur"], kunci: "D" },
            { id: 6, teks: "Monumen Nasional (Monas) terletak di kota...", pilihan: ["Bandung", "Semarang", "Jakarta", "Yogyakarta"], kunci: "C" },
            { id: 7, teks: "Siapakah presiden pertama Republik Indonesia?", pilihan: ["Ir. Soekarno", "Moh. Hatta", "Soeharto", "Jokowi"], kunci: "A" },
            { id: 8, teks: "Bunyi sila pertama Pancasila adalah Ketuhanan Yang Maha...", pilihan: ["Adil", "Esa", "Kuasa", "Mulia"], kunci: "B" },
            { id: 9, teks: "Hewan apa yang melompat dan mengantongi anaknya?", pilihan: ["Koala", "Kangguru", "Kelinci", "Katak"], kunci: "B" },
            { id: 10, teks: "Alat untuk membersihkan gigi dinamakan...", pilihan: ["Sikat Gigi", "Sabun", "Sampo", "Sisir"], kunci: "A" }
        ],
        "INGGRIS": [
            { id: 1, teks: "What is the English word for 'Kucing'?", pilihan: ["Dog", "Cat", "Bird", "Fish"], kunci: "B" },
            { id: 2, teks: "What color is a banana?", pilihan: ["Red", "Green", "Yellow", "Blue"], kunci: "C" },
            { id: 3, teks: "How do you say 'Selamat Pagi' in English?", pilihan: ["Good Morning", "Good Afternoon", "Good Night", "Goodbye"], kunci: "A" },
            { id: 4, teks: "The number after 'Two' is...", pilihan: ["One", "Three", "Four", "Five"], kunci: "B" },
            { id: 5, teks: "What is 'Apple' in Indonesian?", pilihan: ["Anggur", "Pisang", "Jeruk", "Apel"], kunci: "D" },
            { id: 6, teks: "An elephant is very...", pilihan: ["Small", "Big", "Thin", "Short"], kunci: "B" },
            { id: 7, teks: "Father means...", pilihan: ["Ibu", "Ayah", "Kakak", "Adik"], kunci: "B" },
            { id: 8, teks: "We use our eyes to...", pilihan: ["Listen", "Eat", "See", "Walk"], kunci: "C" },
            { id: 9, teks: "What is the English of 'Buku'?", pilihan: ["Pen", "Pencil", "Book", "Eraser"], kunci: "C" },
            { id: 10, teks: "How many legs does a chicken have?", pilihan: ["One", "Two", "Three", "Four"], kunci: "B" }
        ]
    },
    "3-4": {
        "MTK": [
            { id: 1, teks: "Berapakah hasil kali dari 8 x 7?", pilihan: ["54", "56", "58", "60"], kunci: "B" },
            { id: 2, teks: "Hitunglah nilai dari 125 + 75 - 50!", pilihan: ["100", "125", "150", "175"], kunci: "C" },
            { id: 3, teks: "Berapakah nilai dari 36 dibagi 4?", pilihan: ["7", "8", "9", "10"], kunci: "C" },
            { id: 4, teks: "Bentuk desimal dari pecahan 1/2 adalah...", pilihan: ["0.2", "0.4", "0.5", "0.75"], kunci: "C" },
            { id: 5, teks: "Keliling persegi yang panjang sisinya 5 cm adalah...", pilihan: ["15 cm", "20 cm", "25 cm", "30 cm"], kunci: "B" },
            { id: 6, teks: "Bilangan kelipatan 3 antara 5 dan 11 adalah...", pilihan: ["6 dan 9", "6 dan 8", "7 dan 9", "9 dan 10"], kunci: "A" },
            { id: 7, teks: "Sudut yang besarnya tepat 90 derajat dinamakan sudut...", pilihan: ["Lancip", "Tumpul", "Siku-siku", "Lurus"], kunci: "C" },
            { id: 8, teks: "Hasil dari 150 x 2 adalah...", pilihan: ["200", "250", "300", "350"], kunci: "C" },
            { id: 9, teks: "Berapa menit dalam 2 jam?", pilihan: ["60 Menit", "90 Menit", "120 Menit", "150 Menit"], kunci: "C" },
            { id: 10, teks: "Lambang bilangan Romawi dari 5 adalah...", pilihan: ["I", "V", "X", "L"], kunci: "B" }
        ],
        "umum": [
            { id: 1, teks: "Bagian tumbuhan yang berfungsi menyerap air dari dalam tanah adalah...", pilihan: ["Daun", "Batang", "Akar", "Bunga"], kunci: "C" },
            { id: 2, teks: "Proses pembuatan makanan oleh tumbuhan hijau dibantu cahaya matahari disebut...", pilihan: ["Respirasi", "Fotosintesis", "Evaporasi", "Transpirasi"], kunci: "B" },
            { id: 3, teks: "Benda yang tidak dapat ditembus cahaya disebut benda...", pilihan: ["Bening", "Gelap/Gelap", "Transparan", "Mengkilap"], kunci: "B" },
            { id: 4, teks: "Gaya yang terjadi ketika kita mengerem sepeda adalah gaya...", pilihan: ["Otot", "Gesek", "Magnet", "Gravitasi"], kunci: "B" },
            { id: 5, teks: "Hewan memamah biak contohnya adalah...", pilihan: ["Kucing", "Sapi", "Harimau", "Elang"], kunci: "B" },
            { id: 6, teks: "Perubahan wujud benda padat menjadi cair disebut...", pilihan: ["Membeku", "Mencair", "Menguap", "Menyublim"], kunci: "B" },
            { id: 7, teks: "Pakaian adat kebaya berasal dari daerah...", pilihan: ["Jawa", "Papua", "Sumatera", "Kalimantan"], kunci: "A" },
            { id: 8, teks: "Suku Asmat merupakan suku asli yang berasal dari pulau...", pilihan: ["Sulawesi", "Papua", "Jawa", "Bali"], kunci: "B" },
            { id: 9, teks: "Hubungan timbal balik antara makhluk hidup dan lingkungannya disebut...", description: "Ekosistem", pilihan: ["Populasi", "Komunitas", "Ekosistem", "Habitat"], kunci: "C" },
            { id: 10, teks: "Sumber energi terbesar bagi bumi adalah...", pilihan: ["Minyak Bumi", "Batu Bara", "Matahari", "Listrik"], kunci: "C" }
        ],
        "INGGRIS": [
            { id: 1, teks: "Translate into English: 'Saya suka membaca buku.'", pilihan: ["I like reading a book", "I like eating a book", "I like buying a pen", "I want to sleep"], kunci: "A" },
            { id: 2, teks: "The brother of your mother is your...", pilihan: ["Aunt", "Uncle", "Grandfather", "Cousin"], kunci: "B" },
            { id: 3, teks: "We usually have ... in the morning before school.", pilihan: ["Breakfast", "Lunch", "Dinner", "Snack"], kunci: "A" },
            { id: 4, teks: "A doctor works in a...", pilihan: ["School", "Market", "Hospital", "Bank"], kunci: "C" },
            { id: 5, teks: "Opposite word of 'Hot' is...", pilihan: ["Warm", "Boil", "Cold", "Dry"], kunci: "C" },
            { id: 6, teks: "Sunday, Monday, ..., Wednesday. The missing day is...", pilihan: ["Tuesday", "Thursday", "Friday", "Saturday"], kunci: "A" },
            { id: 7, teks: "We use our teeth to ... food.", pilihan: ["See", "Chew", "Hear", "Smell"], kunci: "B" },
            { id: 8, teks: "Ten multiplied by two is...", pilihan: ["Twelve", "Twenty", "Eight", "Five"], kunci: "B" },
            { id: 9, teks: "What is the capital letter of 'indonesia'?", pilihan: ["i", "I", "in", "IND"], kunci: "B" },
            { id: 10, teks: "Which animal can fly?", pilihan: ["Fish", "Snake", "Bird", "Tiger"], kunci: "C" }
        ]
    },
    "5-6": {
        "MTK": [
            { id: 1, teks: "Berapakah hasil dari 12 kuadrat (12^2)?", pilihan: ["122", "144", "166", "188"], kunci: "B" },
            { id: 2, teks: "Hitunglah volume kubus yang memiliki panjang rusuk 5 cm!", pilihan: ["25 cm3", "75 cm3", "125 cm3", "150 cm3"], kunci: "C" },
            { id: 3, teks: "Nilai KPK dari bilangan 4 dan 6 adalah...", pilihan: ["12", "18", "24", "36"], kunci: "A" },
            { id: 4, teks: "FPB dari 12 dan 18 adalah...", pilihan: ["2", "3", "4", "6"], kunci: "D" },
            { id: 5, teks: "Rata-rata (mean) dari data: 6, 7, 8, 9, 10 adalah...", pilihan: ["7", "8", "9", "10"], kunci: "B" },
            { id: 6, teks: "Hasil operasi pecahan 1/2 + 1/4 adalah...", pilihan: ["2/4", "3/4", "1/6", "2/6"], kunci: "B" },
            { id: 7, teks: "Sebuah peta memiliki skala 1:1.000.000. Arti skala tersebut adalah...", pilihan: ["1 cm mewakili 1 km", "1 cm mewakili 10 km", "1 cm mewakili 100 km", "1 cm mewakili 1000 km"], kunci: "B" },
            { id: 8, teks: "Berapakah hasil akar pangkat tiga dari 27?", pilihan: ["3", "4", "5", "9"], kunci: "A" },
            { id: 9, teks: "Rumus luas lingkaran adalah...", pilihan: ["p x l", "s x s", "2 x pi x r", "pi x r x r"], kunci: "D" },
            { id: 10, teks: "Hasil perhitungan dari -5 + 8 adalah...", pilihan: ["-3", "3", "-13", "13"], kunci: "B" }
        ],
        "umum": [
            { id: 1, teks: "Planet terdekat dari matahari dalam sistem tata surya kita adalah...", pilihan: ["Venus", "Bumi", "Mars", "Merkurius"], kunci: "D" },
            { id: 2, teks: "Alat perkembangbiakan jantan pada bunga dinamakan...", pilihan: ["Putik", "Benang Sari", "Mahkota", "Kelopak"], kunci: "B" },
            { id: 3, teks: "Hewan yang berkembang biak dengan cara melahirkan disebut...", pilihan: ["Ovipar", "Vivipar", "Ovovivipar", "Mamalia"], kunci: "B" },
            { id: 4, teks: "Bagian darah yang berfungsi membekukan darah saat luka adalah...", pilihan: ["Sel Darah Merah", "Sel Darah Putih", "Keping Darah (Trombosit)", "Plasma Darah"], kunci: "C" },
            { id: 5, teks: "Peristiwa proklamasi kemerdekaan RI dibacakan pada tanggal...", pilihan: ["16 Agustus 1945", "17 Agustus 1945", "18 Agustus 1945", "20 Agustus 1945"], kunci: "B" },
            { id: 6, teks: "Organisasi ASEAN didirikan berdasarkan deklarasi...", pilihan: ["Jakarta", "Bangkok", "Bandung", "Kuala Lumpur"], kunci: "B" },
            { id: 7, teks: "Komponen biotik dalam sebuah ekosistem contohnya adalah...", pilihan: ["Air", "Tanah", "Tumbuhan", "Udara"], kunci: "C" },
            { id: 8, teks: "Penyakit demam berdarah ditularkan melalui nyamuk...", pilihan: ["Anopheles", "Aedes aegypti", "Culex", "Mansonia"], kunci: "B" },
            { id: 9, teks: "Benua terkecil di dunia adalah benua...", pilihan: ["Asia", "Eropa", "Afrika", "Australia"], kunci: "D" },
            { id: 10, teks: "Lapisan atmosfer terluar bumi disebut...", pilihan: ["Troposfer", "Stratosfer", "Mesosfer", "Eksosfer"], kunci: "D" }
        ],
        "INGGRIS": [
            { id: 1, teks: "She ... to school every day by bus.", pilihan: ["Go", "Goes", "Going", "Gone"], kunci: "B" },
            { id: 2, teks: "Yesterday, My father ... a new bicycle for me.", pilihan: ["Buy", "Buys", "Bought", "Buying"], kunci: "C" },
            { id: 3, teks: "Which country is famous for Taj Mahal?", pilihan: ["Indonesia", "Malaysia", "India", "Egypt"], kunci: "C" },
            { id: 4, teks: "A person who flies an airplane is called a...", pilihan: ["Driver", "Pilot", "Captain", "Sailor"], kunci: "B" },
            { id: 5, teks: "The room where we cook meals is the...", pilihan: ["Bedroom", "Bathroom", "Living Room", "Kitchen"], kunci: "D" },
            { id: 6, teks: "He is smart. Synonym of 'Smart' is...", pilihan: ["Lazy", "Dull", "Intelligent", "Stupid"], kunci: "C" },
            { id: 7, teks: "What is the past tense form of 'Eat'?", pilihan: ["Eaten", "Eating", "Ate", "Eats"], kunci: "C" },
            { id: 8, teks: "We smell flowers with our...", pilihan: ["Eyes", "Ears", "Nose", "Tongue"], kunci: "C" },
            { id: 9, teks: "Sugar tastes...", pilihan: ["Salty", "Sweet", "Sour", "Bitter"], kunci: "B" },
            { id: 10, teks: "An animal that has a long trunk is an...", pilihan: ["Giraffe", "Elephant", "Lion", "Crocodile"], kunci: "B" }
        ]
    }
};