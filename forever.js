/* ========================================================
   FOREVER.JS - Chapter 2 Interactions
   For Simran 💚 | Particles, Landing Overlay & Smooth Cues
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Lock scrolling initially for the romantic landing screen
  document.body.classList.add('locked');
  window.scrollTo(0, 0);

  const enterBtn = document.getElementById('foreverEnterBtn');
  const overlay = document.getElementById('foreverOverlay');

  if (enterBtn && overlay) {
    enterBtn.addEventListener('click', () => {
      window.scrollTo(0, 0);
      overlay.classList.add('fade-out');
      document.body.classList.remove('locked');
      
      // Fire subtle heart sparkle celebration on entry
      createEntryHeartsBurst();

      // Start background music smoothly
      playBackgroundMusic();
    });
  }

  // Floating Background Particles (Hearts, Leaves & Golden Stars)
  const particlesContainer = document.getElementById('particlesContainer');
  if (particlesContainer) {
    const heartPath = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";
    const leafPath = "M17 8C8 8 4 16 4 16s4-2 8-4c0 0-1 4 2 7 3-3 5-7 5-7s1 2 3 2c2-1 1-5-1-6z";
    const starPath = "M12 2l2.4 7.4h7.6l-6.1 4.5 2.3 7.1-6.2-4.5-6.2 4.5 2.3-7.1-6.1-4.5h7.6z";
    
    const count = 24;

    for (let i = 0; i < count; i++) {
      const typeRand = Math.random();
      let path = heartPath;
      let color = 'rgba(212, 175, 55, 0.7)'; // Gold default
      let size = Math.random() * 14 + 10;

      if (typeRand < 0.45) {
        path = heartPath;
        color = 'rgba(212, 175, 55, 0.75)'; // Warm Gold Heart
      } else if (typeRand < 0.8) {
        path = leafPath;
        color = 'rgba(107, 142, 35, 0.65)'; // Sage Leaf
      } else {
        path = starPath;
        color = 'rgba(230, 195, 92, 0.8)'; // Star
        size = Math.random() * 8 + 8;
      }

      const left = Math.random() * 100;
      const duration = Math.random() * 14 + 16; // 16s - 30s
      const delay = Math.random() * -25; // Pre-distribute

      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${left}%`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;

      particle.innerHTML = `
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill="${color}">
          <path d="${path}" />
        </svg>
      `;

      particlesContainer.appendChild(particle);
    }
  }

  // Scroll reveal observer
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));

  // Small floating burst upon entering
  function createEntryHeartsBurst() {
    const burstCount = 12;
    for (let i = 0; i < burstCount; i++) {
      const burstHeart = document.createElement('div');
      burstHeart.style.position = 'fixed';
      burstHeart.style.top = '50%';
      burstHeart.style.left = '50%';
      burstHeart.style.width = '20px';
      burstHeart.style.height = '20px';
      burstHeart.style.pointerEvents = 'none';
      burstHeart.style.zIndex = '9998';
      burstHeart.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
      burstHeart.style.transform = 'translate(-50%, -50%) scale(0.5)';
      burstHeart.style.opacity = '1';

      burstHeart.innerHTML = `
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill="#d4af37">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      `;

      document.body.appendChild(burstHeart);

      const angle = (i / burstCount) * 2 * Math.PI;
      const distance = Math.random() * 180 + 100;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      setTimeout(() => {
        burstHeart.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1.2)`;
        burstHeart.style.opacity = '0';
      }, 30);

      setTimeout(() => {
        burstHeart.remove();
      }, 1300);
    }
  }

  // Polaroid Lightbox interaction
  const polaroidCards = document.querySelectorAll('.polaroid-card');
  const modal = document.getElementById('polaroidModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const modalClose = document.getElementById('modalClose');

  if (modal && modalImg && modalCaption) {
    polaroidCards.forEach(card => {
      card.addEventListener('click', () => {
        const img = card.querySelector('.polaroid-img');
        const caption = card.querySelector('.polaroid-caption');
        if (img) {
          modalImg.src = img.src;
          modalCaption.textContent = caption ? caption.textContent : '';
          modal.classList.add('active');
        }
      });
    });

    if (modalClose) {
      modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

  // Celebration Confetti Explosion
  const celebrateBtn = document.getElementById('celebrateBtn');
  if (celebrateBtn) {
    celebrateBtn.addEventListener('click', () => {
      launchCelebration();
    });
  }

  function launchCelebration() {
    const colors = ['#d4af37', '#1e3f20', '#6b8e23', '#e6c35c', '#f78ca0', '#ffffff'];
    const confettiCount = 70;

    for (let i = 0; i < confettiCount; i++) {
      const conf = document.createElement('div');
      conf.classList.add('confetti');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 10 + 6;
      const isCircle = Math.random() > 0.5;

      conf.style.width = `${size}px`;
      conf.style.height = `${size}px`;
      conf.style.backgroundColor = color;
      conf.style.borderRadius = isCircle ? '50%' : '2px';
      conf.style.top = '50%';
      conf.style.left = '50%';
      conf.style.transition = 'all 1.6s cubic-bezier(0.12, 0.8, 0.32, 1)';
      conf.style.transform = 'translate(-50%, -50%) scale(0.6)';
      conf.style.opacity = '1';

      document.body.appendChild(conf);

      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 380 + 100;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance - 80;
      const rotate = Math.random() * 720;

      setTimeout(() => {
        conf.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rotate}deg)`;
        conf.style.opacity = '0';
      }, 20);

      setTimeout(() => {
        conf.remove();
      }, 1700);
    }
  }

  // Background Audio (Seamless Invisible Continuous Loop)
  const bgMusic = document.getElementById('bgMusic');

  function playBackgroundMusic() {
    if (bgMusic) {
      bgMusic.volume = 0.32; // gentle, non-intrusive background volume
      bgMusic.loop = true;
      bgMusic.play().catch(err => {
        console.log("Audio waiting for user gesture:", err);
      });
    }
  }

  // Guarantee seamless replay if loop attribute ever hiccups
  if (bgMusic) {
    bgMusic.addEventListener('ended', () => {
      bgMusic.currentTime = 0;
      bgMusic.play();
    });
  }
});

