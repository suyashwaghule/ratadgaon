document.addEventListener('DOMContentLoaded', () => {

  // --- Theme Toggle Control (Light / Dark Mode) ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  // Check local storage for theme preference, default to light
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let newTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      themeIcon.className = 'fa-solid fa-sun';
      themeIcon.style.color = '#F59E0B';
    } else {
      themeIcon.className = 'fa-solid fa-moon';
      themeIcon.style.color = '';
    }
  }

  // --- Floating Header Scroll Effect ---
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Mobile Navigation Menu Toggle ---
  const hamburgerMenu = document.getElementById('hamburger-menu');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  hamburgerMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburgerMenu.classList.toggle('open');
    // Rotate hamburger bar effect
    const spans = hamburgerMenu.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const spans = hamburgerMenu.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });

  // --- Active Link Observer on Scroll ---
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // focus area in middle of viewport
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  // --- Culture Accordion Toggle ---
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const currentItem = header.parentElement;
      const isActive = currentItem.classList.contains('active');

      // Close all accordion items
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.accordion-content').style.maxHeight = null;
        item.querySelector('.accordion-content').style.paddingTop = null;
      });

      // If clicked item was not active, open it
      if (!isActive) {
        currentItem.classList.add('active');
        const content = currentItem.querySelector('.accordion-content');
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.paddingTop = '15px';
      }
    });
  });

  // --- Image Lightbox Modal ---
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgPath = item.getAttribute('data-image');
      const captionText = item.getAttribute('data-caption');
      
      lightboxImg.setAttribute('src', imgPath);
      lightboxCaption.textContent = captionText;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Disable page scrolling while open
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scroll
    setTimeout(() => {
      lightboxImg.setAttribute('src', '');
    }, 300);
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  // --- Contact Form Submission Simulation ---
  const contactForm = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');
  const submitBtn = document.getElementById('btn-submit');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Disable button during submission simulation
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> संदेश पाठवला जात आहे...';

    // Simulate server side delays (1 second)
    setTimeout(() => {
      // Clear form inputs
      contactForm.reset();
      
      // Restore submit button
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> संदेश पाठवा';

      // Show success alert
      successMsg.style.display = 'block';
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        successMsg.style.display = 'none';
      }, 5000);

    }, 1200);
  });

  // --- Scroll Down Hero Button ---
  const scrollBtn = document.getElementById('scroll-btn');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      const aboutSection = document.getElementById('about');
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // --- Back To Top Button ---
  const backToTopBtn = document.getElementById('back-to-top-btn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- Scroll Fade Up Animations ---
  const fadeElements = document.querySelectorAll('.fade-up');
  const fadeObserverOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is fully in view
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target); // Trigger animation only once
      }
    });
  }, fadeObserverOptions);

  fadeElements.forEach(el => {
    fadeObserver.observe(el);
  });

  // --- Welcome Overlay Control ---
  const welcomeOverlay = document.getElementById('welcome-overlay');
  const closeOverlayBtn = document.getElementById('close-overlay-btn');

  if (welcomeOverlay && closeOverlayBtn) {
    // Check if user has already closed it in this session
    const isClosed = sessionStorage.getItem('welcome-overlay-closed');
    if (!isClosed) {
      // Show overlay with a slight delay for a premium transition effect
      setTimeout(() => {
        welcomeOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent main page scrolling while open
      }, 600);
    }

    const closeOverlay = () => {
      welcomeOverlay.classList.remove('active');
      document.body.style.overflow = ''; // Re-enable background scrolling
      sessionStorage.setItem('welcome-overlay-closed', 'true');
    };

    // Close button click handler
    closeOverlayBtn.addEventListener('click', closeOverlay);

    // Close on click outside the image content (on the blurred background)
    welcomeOverlay.addEventListener('click', (e) => {
      if (e.target === welcomeOverlay) {
        closeOverlay();
      }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && welcomeOverlay.classList.contains('active')) {
        closeOverlay();
      }
    });
  }
});
