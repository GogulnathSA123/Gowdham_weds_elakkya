/**
 * script.js - Premium Wedding Invitation Animations & Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Envelope Open Logic ---
    const envelopeCover = document.getElementById('envelope-cover');
    const openEnvelopeBtn = document.getElementById('open-envelope-btn');
    const waxSealClick = document.getElementById('wax-seal-click');
    const mainContent = document.getElementById('main-content');
    const bgAudio = document.getElementById('bg-audio');
    const musicFloater = document.getElementById('music-floater');
    const musicDisc = document.getElementById('music-disc');

    function openInvitation() {
        if (!envelopeCover.classList.contains('open')) {
            envelopeCover.classList.add('open');
            mainContent.classList.remove('main-hidden');
            
            // Try to autoplay background music
            playMusic();
        }
    }

    if (openEnvelopeBtn) openEnvelopeBtn.addEventListener('click', openInvitation);
    if (waxSealClick) waxSealClick.addEventListener('click', openInvitation);

    // --- 2. Music Controls ---
    let isPlaying = false;

    function playMusic() {
        if (bgAudio) {
            bgAudio.play().then(() => {
                isPlaying = true;
                if (musicFloater) musicFloater.classList.add('playing');
                document.querySelector('.music-text').textContent = 'Pause';
            }).catch(err => {
                console.log("Autoplay blocked by browser. User interaction required.");
            });
        }
    }

    function toggleMusic() {
        if (!bgAudio) return;
        if (isPlaying) {
            bgAudio.pause();
            isPlaying = false;
            if (musicFloater) musicFloater.classList.remove('playing');
            document.querySelector('.music-text').textContent = 'Play';
        } else {
            bgAudio.play();
            isPlaying = true;
            if (musicFloater) musicFloater.classList.add('playing');
            document.querySelector('.music-text').textContent = 'Pause';
        }
    }

    if (musicFloater) musicFloater.addEventListener('click', toggleMusic);

    // --- 3. Ambient Canvas Animation (Gold Leaf & Petal Shower) ---
    const canvas = document.getElementById('ambient-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        // Petal Class
        class Petal {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * width;
                this.y = -20;
                this.size = Math.random() * 8 + 6;
                this.speedY = Math.random() * 1.2 + 0.8;
                this.speedX = Math.random() * 1.5 - 0.75;
                this.rotation = Math.random() * 360;
                this.spin = Math.random() * 2 - 1;
                // Alternate between rose pink and gold leaf colors
                this.color = Math.random() > 0.5 ? 'rgba(212, 175, 55, 0.45)' : 'rgba(255, 182, 193, 0.55)';
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX;
                this.rotation += this.spin;

                if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
                    this.reset();
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate((this.rotation * Math.PI) / 180);
                ctx.fillStyle = this.color;
                
                // Draw petal/leaf shape
                ctx.beginPath();
                ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, 2 * Math.PI);
                ctx.fill();
                ctx.restore();
            }
        }

        const petals = [];
        for (let i = 0; i < 45; i++) {
            petals.push(new Petal());
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            petals.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        }
        animate();
    }

    // --- 4. Countdown Logic ---
    const weddingDate = new Date('September 13, 2026 07:00:00').getTime();
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = weddingDate - now;

        if (difference < 0) {
            if (document.getElementById('countdown')) {
                document.getElementById('countdown').innerHTML = `<div class="wedding-started-msg" style="color: var(--primary-color); font-weight: 600;">திருமணம் இனிதே நிறைவுற்றது! தங்களின் ஆசிகளுக்கு நன்றி.</div>`;
            }
            clearInterval(countdownInterval);
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    }

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

});
