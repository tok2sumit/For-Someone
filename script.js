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

  // Mood Selection Logic
  const moodButtons = document.querySelectorAll('.mood-btn');
  let selectedMood = '';

  moodButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      moodButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedMood = btn.getAttribute('data-mood');
    });
  });

  // Feedback Submission Logic
  const feedbackForm = document.getElementById('feedbackForm');
  const formCard = document.getElementById('formCard');
  const successState = document.getElementById('successState');

  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const feedbackText = document.getElementById('feedbackText').value.trim();
      
      if (!selectedMood) {
        alert('Please select a mood that represents how you feel.');
        return;
      }
      
      if (!feedbackText) {
        alert('Please write a brief note.');
        return;
      }

      // Save to localStorage
      const feedbackData = {
        mood: selectedMood,
        text: feedbackText,
        timestamp: new Date().toLocaleString()
      };

      // Retrieve existing feedbacks
      let existingFeedbacks = JSON.parse(localStorage.getItem('rightbus_personal_feedbacks') || '[]');
      existingFeedbacks.push(feedbackData);
      localStorage.setItem('rightbus_personal_feedbacks', JSON.stringify(existingFeedbacks));

      // Send email notification using Web3Forms
      // Replace the placeholder below with your Web3Forms Access Key (from https://web3forms.com)
      const web3FormsKey = "YOUR_WEB3FORMS_ACCESS_KEY_HERE";
      if (web3FormsKey && web3FormsKey !== "YOUR_WEB3FORMS_ACCESS_KEY_HERE") {
        const formData = new FormData();
        formData.append("access_key", web3FormsKey);
        formData.append("subject", `She Left a Response! Mood: ${selectedMood} 💚`);
        formData.append("from_name", "Honest Thoughts Webpage");
        formData.append("Mood", selectedMood);
        formData.append("Response Note", feedbackText);

        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        })
        .then(res => res.json())
        .then(resData => {
          if (resData.success) {
            console.log("Email notification sent successfully!");
          } else {
            console.error("Email notification failed:", resData.message);
          }
        })
        .catch(err => {
          console.error("Email API network error:", err);
        });
      }

      // Animate transition to success state
      formCard.style.opacity = '0';
      formCard.style.transform = 'translateY(10px)';
      
      setTimeout(() => {
        formCard.style.display = 'none';
        successState.style.display = 'block';
        successState.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 400);
    });
  }

  // Admin Dashboard Modal Logic
  const adminTrigger = document.getElementById('adminTrigger');
  const adminModal = document.getElementById('adminModal');
  const adminClose = document.getElementById('adminClose');
  const adminList = document.getElementById('adminList');
  const noFeedbackMsg = document.getElementById('noFeedbackMsg');

  const updateAdminList = () => {
    const feedbacks = JSON.parse(localStorage.getItem('rightbus_personal_feedbacks') || '[]');
    
    if (feedbacks.length === 0) {
      noFeedbackMsg.style.display = 'block';
      adminList.innerHTML = '';
    } else {
      noFeedbackMsg.style.display = 'none';
      adminList.innerHTML = feedbacks.map(item => `
        <div class="feedback-item">
          <div class="feedback-item-header">
            <span>${item.timestamp}</span>
            <span class="feedback-item-mood">${item.mood}</span>
          </div>
          <p style="font-size: 0.95rem; line-height: 1.5; color: var(--color-text); word-break: break-word;">
            ${escapeHTML(item.text)}
          </p>
        </div>
      `).join('');
    }
  };

  const escapeHTML = (str) => {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  };

  if (adminTrigger && adminModal && adminClose) {
    adminTrigger.addEventListener('click', () => {
      updateAdminList();
      adminModal.style.display = 'flex';
    });

    adminClose.addEventListener('click', () => {
      adminModal.style.display = 'none';
    });

    // Close when clicking outside of modal content
    adminModal.addEventListener('click', (e) => {
      if (e.target === adminModal) {
        adminModal.style.display = 'none';
      }
    });
  }
});
