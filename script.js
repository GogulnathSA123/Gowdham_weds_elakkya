/**
 * script.js - Wedding Website Interactions
 * Features: Canvas Particles, Countdown Timer, Audio Player, Scroll Reveal, and RSVP
 * Designed for Elakkya & Gowdham Raj's Wedding
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Canvas Particle System ---
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let particles = [];
    const maxParticles = 60;

    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedY = Math.random() * 0.8 + 0.4;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = Math.random() > 0.4 ? 'var(--accent-gold)' : 'var(--accent-rose)';
            this.angle = Math.random() * 360;
            this.spinSpeed = Math.random() * 2 - 1;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX + Math.sin(this.y / 30) * 0.2; // slight sway
            this.angle += this.spinSpeed;

            // Reset when falling out of bounds
            if (this.y > canvas.height) {
                this.y = -10;
                this.x = Math.random() * canvas.width;
                this.speedY = Math.random() * 0.8 + 0.4;
                this.opacity = Math.random() * 0.5 + 0.2;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.angle * Math.PI) / 180);
            
            ctx.beginPath();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            
            // Draw a diamond/sparkle shape
            ctx.moveTo(0, -this.size);
            ctx.lineTo(this.size * 0.7, 0);
            ctx.lineTo(0, this.size);
            ctx.lineTo(-this.size * 0.7, 0);
            ctx.closePath();
            ctx.fill();
            
            // Subtle bloom/glow
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            
            ctx.restore();
        }
    }

    // Initialize particles
    function initParticles() {
        particles = [];
        for (let i = 0; i < maxParticles; i++) {
            particles.push(new Particle());
            // Pre-warm particles so they are scattered across the screen at start
            particles[i].y = Math.random() * canvas.height;
        }
    }
    initParticles();

    // Animation loop
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        
        animationFrameId = requestAnimationFrame(animateParticles);
    }
    animateParticles();


    // --- 2. Floating Background Music Controls ---
    const musicPlayer = document.getElementById('music-player');
    const musicToggle = document.getElementById('music-toggle');
    const audio = document.getElementById('wedding-audio');
    const toggleIcon = musicToggle.querySelector('i');
    const tooltipText = musicPlayer.querySelector('.music-tooltip');

    let isPlaying = false;

    // Reduce standard volume slightly for pleasant background experience
    audio.volume = 0.4;

    function toggleMusic() {
        if (isPlaying) {
            audio.pause();
            musicToggle.classList.remove('playing');
            toggleIcon.className = 'fas fa-music';
            tooltipText.textContent = 'திருமண இசையை இயக்கு';
            isPlaying = false;
        } else {
            audio.play().then(() => {
                musicToggle.classList.add('playing');
                toggleIcon.className = 'fas fa-pause';
                tooltipText.textContent = 'இசையை நிறுத்து';
                isPlaying = true;
            }).catch(err => {
                console.log('Audio autoplay prevented. Play initiated by user action.', err);
            });
        }
    }

    musicToggle.addEventListener('click', toggleMusic);

    // Optional: play automatically after first user scroll/interaction
    function autoPlayOnInteraction() {
        if (!isPlaying) {
            toggleMusic();
            document.removeEventListener('click', autoPlayOnInteraction);
            document.removeEventListener('scroll', autoPlayOnInteraction);
        }
    }
    // Listen for any interactions to play audio (due to browser policy)
    document.addEventListener('click', autoPlayOnInteraction);
    document.addEventListener('scroll', autoPlayOnInteraction);


    // --- 3. Countdown Timer ---
    // Wedding Date: September 13th, 2026 ( Muhurtham Time: 09:00 AM IST )
    const weddingDate = new Date('September 13, 2026 09:00:00').getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = weddingDate - now;

        if (difference < 0) {
            // Marriage day has arrived or passed!
            document.getElementById('countdown').innerHTML = `<div class="wedding-started-msg">திருமணம் இனிதே நிறைவுற்றது! தங்களின் ஆசிகளுக்கு நன்றி.</div>`;
            clearInterval(countdownInterval);
            return;
        }

        // Calculations
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Render with leading zeros
        daysEl.textContent = days.toString().padStart(2, '0');
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
    }

    // Run immediately and then start interval
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);


    // --- 4. Mobile Menu Navigation Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    const allLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navbar.classList.toggle('active');
    });

    // Close menu when links are clicked
    allLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navbar.classList.remove('active');
        });
    });

    // Change nav styling on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Highlight active link on scroll
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 250)) {
                current = section.getAttribute('id');
            }
        });

        allLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });


    // --- 5. Scroll Reveal Animations (Poetic fade-in) ---
    const reveals = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Once it has revealed, we don't need to observe it anymore
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });


    // --- 6. RSVP Mock Form Submission ---
    const rsvpForm = document.getElementById('rsvp-form');
    const rsvpSuccess = document.getElementById('rsvp-success');

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Collect form data
        const name = document.getElementById('rsvp-name').value;
        const attendance = document.querySelector('input[name="attendance"]:checked').value;
        const guests = document.getElementById('rsvp-guests').value;
        const message = document.getElementById('rsvp-message').value;

        const rsvpData = {
            name,
            attendance,
            guests,
            message,
            timestamp: new Date().toISOString()
        };

        // Save in LocalStorage (simulating database submission)
        let submissions = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
        submissions.push(rsvpData);
        localStorage.setItem('wedding_rsvps', JSON.stringify(submissions));

        // Visual effects (fade out form, fade in success screen)
        rsvpForm.classList.add('hidden');
        rsvpSuccess.classList.remove('hidden');

        // Confetti burst (canvas particles update for celebratory splash!)
        celebrationSplurge();
    });

    // Make canvas particles float up and change color dynamically on submit
    function celebrationSplurge() {
        // Double particle density temporarily
        for (let i = 0; i < 40; i++) {
            const p = new Particle();
            p.y = canvas.height + Math.random() * 100;
            p.speedY = -(Math.random() * 4 + 2); // shooting up
            p.speedX = Math.random() * 6 - 3;
            p.color = `hsl(${Math.random() * 360}, 80%, 65%)`; // rainbow colors
            particles.push(p);
        }
    }
});
