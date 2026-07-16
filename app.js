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

  // --- Census Section Language Toggle & Animation ---
  const censusSec = document.getElementById('census');
  if (censusSec) {
    const langMr = document.getElementById('lang-mr');
    const langEn = document.getElementById('lang-en');
    
    if (langMr && langEn) {
      langMr.addEventListener('click', () => {
        langMr.classList.add('active');
        langEn.classList.remove('active');
        censusSec.classList.remove('lang-en-active');
      });
      langEn.addEventListener('click', () => {
        langEn.classList.add('active');
        langMr.classList.remove('active');
        censusSec.classList.add('lang-en-active');
      });
    }

    // Animate chart progress elements on intersection
    const chartElements = censusSec.querySelectorAll('.animate-ring, .animate-bar');
    const chartObserverOptions = {
      root: null,
      threshold: 0.1
    };
    
    const chartObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          if (el.classList.contains('animate-ring')) {
            const pct = parseFloat(el.getAttribute('data-pct'));
            const circumference = 251.2;
            const offset = circumference - (pct / 100) * circumference;
            el.style.strokeDashoffset = offset;
          } else if (el.classList.contains('animate-bar')) {
            const widthPct = el.getAttribute('data-width');
            el.style.width = widthPct + '%';
          }
          chartObserver.unobserve(el);
        }
      });
    }, chartObserverOptions);

    chartElements.forEach(el => {
      chartObserver.observe(el);
    });
  }

  // --- Live Weather Dashboard using Open-Meteo API ---
  const refreshWeatherBtn = document.getElementById('refresh-weather-btn');
  if (refreshWeatherBtn) {
    const tempVal = document.getElementById('weather-temp-val');
    const statusTextVal = document.getElementById('weather-status-text-val');
    const statusIconImg = document.getElementById('weather-status-icon-img');
    const humidityVal = document.getElementById('weather-humidity-val');
    const rainVal = document.getElementById('weather-rain-val');
    const windVal = document.getElementById('weather-wind-val');
    const advisoryVal = document.getElementById('weather-advisory-val');
    const forecastList = document.querySelector('.forecast-list');

    // Helper to convert standard digits to Marathi digits
    const toMarathiDigits = (num) => {
      if (num === undefined || num === null) return '';
      const marathiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
      return num.toString().replace(/\d/g, (digit) => marathiDigits[digit]);
    };

    // WMO Weather Code Mapper
    const getWeatherDetails = (code) => {
      if (code === 0) {
        return {
          status: "स्वच्छ आकाश",
          icon: "fa-solid fa-sun",
          color: "#F59E0B",
          advisory: "हवामान स्वच्छ व उष्ण राहील. पिकांना गरजेनुसार नियमित पाणी द्यावे."
        };
      } else if (code >= 1 && code <= 3) {
        return {
          status: "काहीसे ढगाळ",
          icon: "fa-solid fa-cloud-sun",
          color: "#FBBF24",
          advisory: "हवामान ढगाळ राहील. दमटपणामुळे पिकांवर कीड किंवा करपा रोगाचा प्रादुर्भाव होण्याची शक्यता आहे, बारीक लक्ष ठेवा."
        };
      } else if (code === 45 || code === 48) {
        return {
          status: "धुके",
          icon: "fa-solid fa-smog",
          color: "#94A3B8",
          advisory: "सकाळी धुके राहील. भाजीपाला पिकांची काळजी घ्या आणि सिंचनाचे नियोजन करा."
        };
      } else if (code >= 51 && code <= 55) {
        return {
          status: "भुरभुर पाऊस",
          icon: "fa-solid fa-cloud-rain",
          color: "#93C5FD",
          advisory: "हलकी भुरभुर सुरू राहील. कांदा रोपवाटिकेमध्ये बुरशीनाशक फवारणी करताना पावसाचा अंदाज घ्यावा."
        };
      } else if (code >= 61 && code <= 65) {
        return {
          status: "मध्यम पाऊस",
          icon: "fa-solid fa-cloud-rain",
          color: "#60A5FA",
          advisory: "पावसाची शक्यता आहे. शेतात खत देणे किंवा फवारणीचे काम आज थांबवणे हितावह ठरेल."
        };
      } else if (code >= 80 && code <= 82) {
        return {
          status: "पावसाच्या सरी",
          icon: "fa-solid fa-cloud-showers-heavy",
          color: "#3B82F6",
          advisory: "वेगवान पावसाच्या सरी येण्याची शक्यता. कापणी केलेले पीक सुरक्षित स्थळी झाकून ठेवावे."
        };
      } else if (code >= 95 && code <= 99) {
        return {
          status: "वादळी पाऊस",
          icon: "fa-solid fa-cloud-bolt",
          color: "#EF4444",
          advisory: "वादळी वाऱ्यासह मुसळधार पावसाची शक्यता! जनावरांना सुरक्षित निवाऱ्यात ठेवावे आणि विजेच्या खांबांपासून दूर राहावे."
        };
      } else {
        return {
          status: "सामान्य हवामान",
          icon: "fa-solid fa-cloud",
          color: "#64748B",
          advisory: "हवामान सामान्य असून शेतीकामांसाठी अनुकूल दिवस आहे."
        };
      }
    };

    // Get simple icon and color for forecast listing
    const getForecastVisuals = (code) => {
      if (code === 0) return { icon: "fa-solid fa-sun", color: "#F59E0B" };
      if (code >= 1 && code <= 3) return { icon: "fa-solid fa-cloud-sun", color: "#FBBF24" };
      if (code >= 51 && code <= 65) return { icon: "fa-solid fa-cloud-rain", color: "#60A5FA" };
      if (code >= 80 && code <= 99) return { icon: "fa-solid fa-cloud-showers-heavy", color: "#3B82F6" };
      return { icon: "fa-solid fa-cloud", color: "#94A3B8" };
    };

    const updateWeatherUI = async () => {
      // API call to Open-Meteo for Ratadgaon (Ahilyanagar coords)
      const lat = "19.0948";
      const lon = "74.7480";
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,rain,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("API response error");
        
        const data = await response.json();
        const current = data.current;
        const daily = data.daily;

        // 1. Update current readings
        const tempRounded = Math.round(current.temperature_2m);
        tempVal.textContent = `${toMarathiDigits(tempRounded)}°C`;
        
        const weatherDetails = getWeatherDetails(current.weather_code);
        statusTextVal.textContent = weatherDetails.status;
        statusIconImg.className = weatherDetails.icon;
        statusIconImg.style.color = weatherDetails.color;
        
        humidityVal.textContent = `${toMarathiDigits(current.relative_humidity_2m)}%`;
        
        // Rain value formatting
        const rainFloat = current.rain;
        rainVal.textContent = `${toMarathiDigits(rainFloat)} मिमी`;
        
        const windRounded = Math.round(current.wind_speed_10m);
        windVal.textContent = `${toMarathiDigits(windRounded)} किमी/तास`;
        
        advisoryVal.textContent = weatherDetails.advisory;

        // 2. Update 3-Day Forecast list
        if (daily && daily.time && daily.time.length >= 4) {
          const daysText = ["उद्या (Tomorrow)", "परवा (Day 2)", "तिसरा दिवस (Day 3)"];
          let forecastHTML = '';

          for (let i = 0; i < 3; i++) {
            const dayCode = daily.weather_code[i + 1];
            const maxTemp = Math.round(daily.temperature_2m_max[i + 1]);
            const minTemp = Math.round(daily.temperature_2m_min[i + 1]);
            const visuals = getForecastVisuals(dayCode);

            forecastHTML += `
              <div class="forecast-item">
                <span class="forecast-day">${daysText[i]}</span>
                <span class="forecast-icon"><i class="${visuals.icon}" style="color: ${visuals.color};"></i></span>
                <span class="forecast-temp">${toMarathiDigits(maxTemp)}°C / ${toMarathiDigits(minTemp)}°C</span>
              </div>
            `;
          }
          forecastList.innerHTML = forecastHTML;
        }

      } catch (err) {
        console.error("Live weather fetching failed:", err);
        advisoryVal.textContent = "हवामान माहिती मिळवण्यात अडचण आली. कृपया इंटरनेट तपासा.";
      }
    };

    // Refresh button event listener with visual animation
    refreshWeatherBtn.addEventListener('click', async () => {
      refreshWeatherBtn.disabled = true;
      refreshWeatherBtn.innerHTML = '<i class="fa-solid fa-arrows-rotate spin-anim"></i> अपडेट होत आहे...';

      // Perform API call
      await updateWeatherUI();

      // Delay slightly for premium animation feel
      setTimeout(() => {
        refreshWeatherBtn.disabled = false;
        refreshWeatherBtn.innerHTML = '<i class="fa-solid fa-arrows-rotate" id="refresh-icon"></i> हवामान अपडेट करा (Refresh)';
      }, 800);
    });

    // Auto-load live weather on page load
    updateWeatherUI();
  }

  // --- Live Farmer News Fetcher (World News API with Google News Fallback) ---
  const newsNoticeContainer = document.getElementById('news-notice-container');
  if (newsNoticeContainer) {
    const WORLD_NEWS_API_KEY = ""; // Set your World News API key here to fetch news from World News API

    const fetchLiveFarmerNews = async () => {
      // 1. Check if World News API Key is configured
      if (WORLD_NEWS_API_KEY) {
        try {
          const url = `https://api.worldnewsapi.com/search-news?api-key=${WORLD_NEWS_API_KEY}&source-countries=in&text=farmer%20OR%20farming%20OR%20shetkari&language=mr&number=10`;
          const res = await fetch(url);
          if (res.ok) {
            const data = await res.json();
            if (data && data.news && data.news.length > 0) {
              renderWorldNews(data.news);
              return;
            }
          }
        } catch (e) {
          console.warn("Failed fetching from World News API, falling back to Google News RSS:", e);
        }
      }

      // 2. Fallback: Google News RSS parser (CORS-proxy)
      await fetchGoogleNewsRSS();
    };

    const renderWorldNews = (articles) => {
      let newsHTML = '';
      articles.forEach(article => {
        const title = article.title || '';
        const link = article.url || '#';
        const pubDateStr = article.publish_date || '';
        const publisher = article.author || article.source_country || "जागतिक बातमी";

        // Format Date
        let formattedDate = "ताज्या घडामोडी";
        if (pubDateStr) {
          const date = new Date(pubDateStr);
          if (!isNaN(date.getTime())) {
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            formattedDate = date.toLocaleDateString('mr-IN', options);
          }
        }

        // Classify news category dynamically
        let category = "advisory";
        let badgeText = "कृषी सल्ला";
        let iconClass = "fa-solid fa-wheat-awn";

        const lowerHeadline = title.toLowerCase();
        if (
          lowerHeadline.includes("योजना") || 
          lowerHeadline.includes("कर्ज") || 
          lowerHeadline.includes("अनुदान") || 
          lowerHeadline.includes("शासकीय") || 
          lowerHeadline.includes("मदत") || 
          lowerHeadline.includes("पैसे") || 
          lowerHeadline.includes("हप्ता") || 
          lowerHeadline.includes("विमा") || 
          lowerHeadline.includes("नमो") || 
          lowerHeadline.includes("सरकार") ||
          lowerHeadline.includes("मंत्रिमंडळ")
        ) {
          category = "scheme";
          badgeText = "शासकीय योजना";
          iconClass = "fa-solid fa-hand-holding-dollar";
          if (lowerHeadline.includes("विमा")) {
            badgeText = "पीक विमा";
            iconClass = "fa-solid fa-shield-halved";
          }
        } else if (
          lowerHeadline.includes("पाऊस") || 
          lowerHeadline.includes("हवामान") || 
          lowerHeadline.includes("अंदाज") || 
          lowerHeadline.includes("तापमान") || 
          lowerHeadline.includes("चक्रीवादळ") || 
          lowerHeadline.includes("अतिवृष्टी") || 
          lowerHeadline.includes("पूर") || 
          lowerHeadline.includes("तापमान")
        ) {
          category = "weather";
          badgeText = "हवामान अंदाज";
          iconClass = "fa-solid fa-cloud-showers-heavy";
        }

        newsHTML += `
          <div class="notice-item" data-category="${category}">
            <div class="notice-header">
              <span class="notice-badge ${category}-badge"><i class="${iconClass}"></i> ${badgeText}</span>
              <span class="notice-date">${formattedDate}</span>
            </div>
            <h4 class="notice-title">
              <a href="${link}" target="_blank" rel="noopener noreferrer">
                ${title}
                <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.75rem; margin-left: 4px; opacity: 0.75;"></i>
              </a>
            </h4>
            <p class="notice-body">स्त्रोत: <strong>${publisher}</strong>. अधिकृत बातमी वाचण्यासाठी वरील मथळ्यावर क्लिक करा.</p>
          </div>
        `;
      });
      newsNoticeContainer.innerHTML = newsHTML;
    };

    const fetchGoogleNewsRSS = async () => {
      const query = encodeURIComponent("शेतकरी");
      const rssUrl = `https://news.google.com/rss/search?q=${query}&hl=mr&gl=IN&ceid=IN:mr`;
      
      const proxies = [
        `https://corsproxy.io/?${encodeURIComponent(rssUrl)}`,
        `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`
      ];

      let xmlText = null;

      // Try fetching from CORS proxies
      for (let i = 0; i < proxies.length; i++) {
        try {
          const res = await fetch(proxies[i]);
          if (res.ok) {
            if (i === 1) { // allorigins
              const json = await res.json();
              xmlText = json.contents;
            } else { // corsproxy.io
              xmlText = await res.text();
            }
            if (xmlText) break;
          }
        } catch (e) {
          console.warn(`Proxy ${i + 1} failed:`, e);
        }
      }

      if (!xmlText) {
        console.log("Using pre-coded static notices as fallback.");
        return; // Fallback notices are already in HTML
      }

      try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        const items = xmlDoc.getElementsByTagName("item");

        if (items.length === 0) return;

        let newsHTML = '';
        const limit = Math.min(items.length, 10); // Display top 10 news items

        for (let i = 0; i < limit; i++) {
          const item = items[i];
          const title = item.getElementsByTagName("title")[0]?.textContent || '';
          const link = item.getElementsByTagName("link")[0]?.textContent || '#';
          const pubDateStr = item.getElementsByTagName("pubDate")[0]?.textContent || '';
          
          // Split title to isolate headline and publisher source
          const titleParts = title.split(" - ");
          const headline = titleParts[0] || title;
          const publisher = titleParts[titleParts.length - 1] || "बातम्या";

          // Format Publish Date
          let formattedDate = "ताज्या घडामोडी";
          if (pubDateStr) {
            const date = new Date(pubDateStr);
            if (!isNaN(date.getTime())) {
              const options = { day: 'numeric', month: 'long', year: 'numeric' };
              formattedDate = date.toLocaleDateString('mr-IN', options);
            }
          }

          // Classify news category dynamically
          let category = "advisory";
          let badgeText = "कृषी सल्ला";
          let iconClass = "fa-solid fa-wheat-awn";

          const lowerHeadline = headline.toLowerCase();
          if (
            lowerHeadline.includes("योजना") || 
            lowerHeadline.includes("कर्ज") || 
            lowerHeadline.includes("अनुदान") || 
            lowerHeadline.includes("शासकीय") || 
            lowerHeadline.includes("मदत") || 
            lowerHeadline.includes("पैसे") || 
            lowerHeadline.includes("हप्ता") || 
            lowerHeadline.includes("विमा") || 
            lowerHeadline.includes("नमो") || 
            lowerHeadline.includes("सरकार") ||
            lowerHeadline.includes("मंत्रिमंडळ")
          ) {
            category = "scheme";
            badgeText = "शासकीय योजना";
            iconClass = "fa-solid fa-hand-holding-dollar";
            if (lowerHeadline.includes("विमा")) {
              badgeText = "पीक विमा";
              iconClass = "fa-solid fa-shield-halved";
            }
          } else if (
            lowerHeadline.includes("पाऊस") || 
            lowerHeadline.includes("हवामान") || 
            lowerHeadline.includes("अंदाज") || 
            lowerHeadline.includes("तापमान") || 
            lowerHeadline.includes("चक्रीवादळ") || 
            lowerHeadline.includes("अतिवृष्टी") || 
            lowerHeadline.includes("पूर") || 
            lowerHeadline.includes("तापमान")
          ) {
            category = "weather";
            badgeText = "हवामान अंदाज";
            iconClass = "fa-solid fa-cloud-showers-heavy";
          }

          newsHTML += `
            <div class="notice-item" data-category="${category}">
              <div class="notice-header">
                <span class="notice-badge ${category}-badge"><i class="${iconClass}"></i> ${badgeText}</span>
                <span class="notice-date">${formattedDate}</span>
              </div>
              <h4 class="notice-title">
                <a href="${link}" target="_blank" rel="noopener noreferrer">
                  ${headline}
                  <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.75rem; margin-left: 4px; opacity: 0.75;"></i>
                </a>
              </h4>
              <p class="notice-body">स्त्रोत: <strong>${publisher}</strong>. अधिकृत बातमी वाचण्यासाठी वरील मथळ्यावर क्लिक करा.</p>
            </div>
          `;
        }

        newsNoticeContainer.innerHTML = newsHTML;
      } catch (err) {
        console.error("Parsing live RSS feed failed:", err);
      }
    };

    fetchLiveFarmerNews();
  }

  // --- Farmer News Notice Filtering ---
  const newsFilterBtns = document.querySelectorAll('.news-filter-btn');

  newsFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button class
      newsFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-category');

      // Query notice items dynamically to filter newly loaded RSS cards
      const noticeItems = document.querySelectorAll('.notice-item');

      noticeItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterCategory === 'all' || itemCategory === filterCategory) {
          item.classList.remove('hidden');
          item.style.display = 'block';
          // Force reflow and set opacity
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          // Wait for fade transition before hiding
          setTimeout(() => {
            item.classList.add('hidden');
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
});
