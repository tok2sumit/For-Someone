document.addEventListener('DOMContentLoaded', () => {
  // Lock scrolling initially and reset scroll to top for the landing screen
  document.body.classList.add('locked');
  window.scrollTo(0, 0);

  const enterBtn = document.getElementById('enterBtn');
  const landingOverlay = document.getElementById('landingOverlay');

  if (enterBtn && landingOverlay) {
    enterBtn.addEventListener('click', () => {
      window.scrollTo(0, 0); // Reset scroll to top before entering
      landingOverlay.classList.add('fade-out');
      document.body.classList.remove('locked');
    });
  }

  // Intersection Observer for Scroll Animations
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
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(element => {
    observer.observe(element);
  });

  // Initialize Lottie Web Animations (bypasses CORS restrictions)
  const girlLottieContainer = document.getElementById('girlLottieContainer');
  if (girlLottieContainer && typeof girlAnimationData !== 'undefined') {
    lottie.loadAnimation({
      container: girlLottieContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: girlAnimationData
    });
  }

  const thinkingLottieContainer = document.getElementById('thinkingLottieContainer');
  if (thinkingLottieContainer && typeof lottieAnimationData !== 'undefined') {
    lottie.loadAnimation({
      container: thinkingLottieContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: lottieAnimationData
    });
  }

  const cozyLottieContainer = document.getElementById('cozyLottieContainer');
  if (cozyLottieContainer && typeof guitarAnimationData !== 'undefined') {
    lottie.loadAnimation({
      container: cozyLottieContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: guitarAnimationData
    });
  }

  const relaxingChairLottieContainer = document.getElementById('relaxingChairLottieContainer');
  if (relaxingChairLottieContainer && typeof relaxingChairAnimationData !== 'undefined') {
    lottie.loadAnimation({
      container: relaxingChairLottieContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: relaxingChairAnimationData
    });
  }

  // Dynamic Background Particles
  const particlesContainer = document.getElementById('particlesContainer');
  if (particlesContainer) {
    const leafPath = "M17 8C8 8 4 16 4 16s4-2 8-4c0 0-1 4 2 7 3-3 5-7 5-7s1 2 3 2c2-1 1-5-1-6z";
    const heartPath = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";
    const particleCount = 18;

    for (let i = 0; i < particleCount; i++) {
      const isHeart = Math.random() > 0.75;
      const size = Math.random() * 12 + 10; // 10px to 22px
      const left = Math.random() * 100; // 0% to 100%
      const duration = Math.random() * 12 + 15; // 15s to 27s
      const delay = Math.random() * -25; // negative delay to distribute immediately

      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${left}%`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;

      const color = isHeart ? 'var(--color-accent)' : 'var(--color-sage)';
      particle.innerHTML = `
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill="${color}" style="fill-opacity: 0.7;">
          <path d="${isHeart ? heartPath : leafPath}" />
        </svg>
      `;
      particlesContainer.appendChild(particle);
    }
  }

  // Congrats Lottie Animation
  const congratsLottieContainer = document.getElementById('congratsLottieContainer');
  if (congratsLottieContainer && typeof congratsAnimationData !== 'undefined') {
    lottie.loadAnimation({
      container: congratsLottieContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: congratsAnimationData
    });
  }
});
