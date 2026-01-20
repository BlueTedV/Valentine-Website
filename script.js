 // ===== GENERATE BINTANG =====
        document.addEventListener('DOMContentLoaded', () => {
            const starsContainer = document.getElementById('stars');
            const starCount = 150;
            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                star.classList.add('star');
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                star.style.animationDelay = `${Math.random() * 5}s`;
                star.style.width = `${Math.random() * 3 + 1}px`;
                star.style.height = star.style.width;
                starsContainer.appendChild(star);
            }
        });

        // ===== SISTEM KEAMANAN PIN =====
        const pinDigits = document.querySelectorAll('.pin-digit');
        const submitPinBtn = document.getElementById('submitPin');
        const pinError = document.getElementById('pinError');
        const pinModal = document.getElementById('pinModal');
        const mainContent = document.getElementById('mainContent');
        const loadingScreen = document.getElementById('loadingScreen');

        // Otomatis fokus ke input berikutnya
        pinDigits.forEach((input, index) => {
            input.addEventListener('input', () => {
                if (input.value && index < pinDigits.length - 1) {
                    pinDigits[index + 1].focus();
                }
            });
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && !input.value && index > 0) {
                    pinDigits[index - 1].focus();
                }
            });
        });

        submitPinBtn.addEventListener('click', checkPin);
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkPin();
        });

        function checkPin() {
            const enteredPin = Array.from(pinDigits).map(input => input.value).join('');
            if (enteredPin === '1402') {
                // Benar
                pinModal.style.display = 'none';
                loadingScreen.style.display = 'flex';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    document.body.classList.add('loaded');
                    mainContent.style.display = 'block';
                    revealTexts();
                }, 1500);
            } else {
                // Salah
                pinError.textContent = 'PIN salah! Coba lagi.';
                pinDigits.forEach(input => {
                    input.value = '';
                    input.style.borderColor = '#ff4d6d';
                });
                pinDigits[0].focus();
                // Getar perangkat (jika di HP)
                if (navigator.vibrate) navigator.vibrate(200);
                // Efek visual
                pinModal.style.transform = 'translateX(-10px)';
                setTimeout(() => {
                    pinModal.style.transform = 'translateX(10px)';
                    setTimeout(() => pinModal.style.transform = 'translateX(0)', 50);
                }, 50);
            }
        }

        // ===== REVEAL TEKS PER PARAGRAF DENGAN DELAY =====
        function revealTexts() {
            const paragraphs = document.querySelectorAll('.paragraph-delay');
            paragraphs.forEach((p, i) => {
                const delay = p.dataset.delay ? parseInt(p.dataset.delay) * 800 : i * 800;
                setTimeout(() => {
                    p.classList.add('visible');
                }, delay + 500);
            });
        }

        // ===== PLAYLIST INTERAKSI =====
        document.querySelectorAll('.play-song-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                alert('Fitur audio demo — kamu bisa ganti dengan file audio di folder "audio/"');
            });
        });

        // ===== HILANGKAN LOADING SETELAH 2 DETIK JIKA TIDAK ADA PIN =====
        setTimeout(() => {
            if (pinModal.style.display !== 'none') return;
            loadingScreen.style.display = 'none';
        }, 2000);