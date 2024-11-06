 document.getElementById("calculate-btn").addEventListener("click", function() {
            const luasLahan = parseFloat(document.getElementById("luas-lahan").value);
            const jenisTanaman = document.getElementById("jenis-tanaman").value;
            const jarakTanam = parseFloat(document.getElementById("kepadatan-tanam").value);
            const estimasiHasil = parseFloat(document.getElementById("estimasi-hasil").value);
            if (isNaN(luasLahan) || isNaN(jarakTanam) || isNaN(estimasiHasil) || jarakTanam <= 0) {
                document.getElementById("calculation-result").innerText = "Masukkan semua nilai dengan benar.";
                return;
            }
    
            let totalHasilPanen = 0;
            switch (jenisTanaman) {
                case "padi":
                    totalHasilPanen = (luasLahan / (jarakTanam * jarakTanam)) * estimasiHasil;
                    break;
                case "sayuran":
                    totalHasilPanen = luasLahan * (jarakTanam / 100) * estimasiHasil;
                    break;
                case "jagung":
                    totalHasilPanen = (luasLahan / jarakTanam) * estimasiHasil;
                    break;
                case "buah":
                    totalHasilPanen = (luasLahan / (jarakTanam * 10)) * estimasiHasil;
                    break;
                default:
                    document.getElementById("calculation-result").innerText = "Jenis tanaman tidak valid.";
                    return;
            }
    
            let hasilDisplay;
            if (totalHasilPanen >= 1000) {
                hasilDisplay = (totalHasilPanen / 1000).toFixed(2) + " ton";
            } else if (totalHasilPanen >= 100) {
                hasilDisplay = (totalHasilPanen / 100).toFixed(2) + " kuintal";
            } else {
                hasilDisplay = totalHasilPanen.toFixed(2) + " kg";
            }
            const resultElement = document.getElementById("calculation-result");
            resultElement.innerText = hasilDisplay;
            resultElement.classList.add('animate');
            setTimeout(() => {
                resultElement.classList.remove('animate');
            }, 2000);
        });