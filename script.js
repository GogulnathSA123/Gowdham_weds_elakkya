/**
 * script.js - Minimalist Wedding Invitation Animations & Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Envelope Open Logic ---
    const envelopeCover = document.getElementById('envelope-cover');
    const openBtn = document.getElementById('open-btn');
    const mainContent = document.getElementById('main-content');
    const bgAudio = document.getElementById('bg-audio');
    const musicBtn = document.getElementById('music-btn');
    const musicIcon = document.getElementById('music-icon');

    function openInvitation() {
        if (!envelopeCover.classList.contains('open')) {
            envelopeCover.classList.add('open');
            mainContent.classList.remove('main-hidden');
            
            // Try to autoplay background music
            playMusic();
        }
    }

    if (openBtn) openBtn.addEventListener('click', openInvitation);

    // --- 2. Music Controls ---
    let isPlaying = false;

    function playMusic() {
        if (bgAudio) {
            bgAudio.play().then(() => {
                isPlaying = true;
                if (musicIcon) {
                    musicIcon.classList.remove('fa-play');
                    musicIcon.classList.add('fa-pause');
                }
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
            if (musicIcon) {
                musicIcon.classList.remove('fa-pause');
                musicIcon.classList.add('fa-play');
            }
        } else {
            bgAudio.play();
            isPlaying = true;
            if (musicIcon) {
                musicIcon.classList.remove('fa-play');
                musicIcon.classList.add('fa-pause');
            }
        }
    }

    if (musicBtn) musicBtn.addEventListener('click', toggleMusic);

    // --- 3. Ambient Canvas Animation (Subtle Golden Sparkles) ---
    const canvas = document.getElementById('ambient-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        // Sparkle Class
        class Sparkle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 1.5 + 0.5;
                this.alpha = Math.random() * 0.5 + 0.1;
                this.speed = Math.random() * 0.005 + 0.002;
                this.glow = Math.random() > 0.5;
            }

            update() {
                if (this.glow) {
                    this.alpha += this.speed;
                    if (this.alpha >= 0.75) this.glow = false;
                } else {
                    this.alpha -= this.speed;
                    if (this.alpha <= 0.05) this.reset();
                }
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.fillStyle = '#bfa37c'; // Minimalist gold color
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
                ctx.fill();
                ctx.restore();
            }
        }

        const sparkles = [];
        for (let i = 0; i < 40; i++) {
            sparkles.push(new Sparkle());
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            sparkles.forEach(s => {
                s.update();
                s.draw();
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
                document.getElementById('countdown').innerHTML = `<div class="wedding-started-msg" style="color: var(--text-dark); font-weight: 400; font-family: var(--font-heading); font-size: 1.2rem;">திருமணம் இனிதே நிறைவுற்றது! தங்களின் ஆசிகளுக்கு நன்றி.</div>`;
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
