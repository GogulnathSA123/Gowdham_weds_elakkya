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

    // --- 3. Ambient Canvas Animation (Subtle Gold Sparkles & Scroll Butterflies) ---
    const canvas = document.getElementById('ambient-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        let scrollY = window.scrollY;
        let lastScrollY = window.scrollY;
        let scrollDelta = 0;

        window.addEventListener('scroll', () => {
            scrollY = window.scrollY;
            scrollDelta = Math.abs(scrollY - lastScrollY);
            lastScrollY = scrollY;
        });

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

        // Butterfly Class
        class Butterfly {
            constructor() {
                this.reset();
                this.y = Math.random() * height; // distribute initial spawn
            }

            reset() {
                this.x = Math.random() * width;
                this.y = height + 40; // spawn from bottom
                this.size = Math.random() * 8 + 6;
                this.speedX = Math.random() * 1.5 - 0.75;
                this.speedY = -(Math.random() * 1.2 + 0.8); // fly upwards
                this.wingPhase = Math.random() * Math.PI * 2;
                this.flapSpeed = Math.random() * 0.12 + 0.08;
                this.colorType = Math.random() > 0.5 ? 'blue' : 'red';
                // Beautiful vibrant red and blue hues matching minimalist tone
                this.color = this.colorType === 'blue' ? 'rgba(0, 150, 255, 0.75)' : 'rgba(235, 75, 75, 0.75)';
                this.wingColor = this.colorType === 'blue' ? 'rgba(173, 216, 230, 0.35)' : 'rgba(255, 192, 203, 0.35)';
                this.angle = Math.random() * 0.2 - 0.1;
            }

            update() {
                // Flapping & upward speed boost on scrolling
                const boost = Math.min(scrollDelta * 0.08, 4);
                this.y += this.speedY - (boost * 0.6);
                this.x += this.speedX + Math.sin(this.y * 0.015) * 0.3;
                this.wingPhase += this.flapSpeed + (boost * 0.08);

                if (this.y < -40 || this.x < -40 || this.x > width + 40) {
                    this.reset();
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);

                // Simulate flapping using wing scale width
                const flapWidth = Math.abs(Math.sin(this.wingPhase));

                ctx.fillStyle = this.wingColor;
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 1;

                // Left wing shape
                ctx.beginPath();
                ctx.ellipse(-this.size/2 * flapWidth, -this.size/4, this.size/2 * flapWidth, this.size, Math.PI/6, 0, 2*Math.PI);
                ctx.fill();
                ctx.stroke();

                // Right wing shape
                ctx.beginPath();
                ctx.ellipse(this.size/2 * flapWidth, -this.size/4, this.size/2 * flapWidth, this.size, -Math.PI/6, 0, 2*Math.PI);
                ctx.fill();
                ctx.stroke();

                // Draw tiny body
                ctx.fillStyle = 'rgba(34, 34, 34, 0.6)';
                ctx.beginPath();
                ctx.ellipse(0, 0, 1.5, this.size * 0.8, 0, 0, 2 * Math.PI);
                ctx.fill();

                ctx.restore();
            }
        }

        const sparkles = [];
        for (let i = 0; i < 35; i++) {
            sparkles.push(new Sparkle());
        }

        const butterflies = [];
        for (let i = 0; i < 12; i++) {
            butterflies.push(new Butterfly());
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            // Render sparkles
            sparkles.forEach(s => {
                s.update();
                s.draw();
            });

            // Render butterflies
            butterflies.forEach(b => {
                b.update();
                b.draw();
            });

            // Decay scroll delta
            scrollDelta *= 0.94;

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
