/* Modern Portfolio JavaScript */

(function ($) {
  "use strict";

  // Navigation Toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      if (window.innerWidth < 968) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  });

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // Smooth scrolling for anchor links
  $('a[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
      this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length
        ? target
        : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 80,
          },
          800,
          "swing"
        );
        return false;
      }
    }
  });

  // Gallery initialization
  function initGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    // Generate gallery items
    for (let i = 1; i <= 29; i++) {
      const thumb = document.createElement('div');
      thumb.className = 'thumb';
      thumb.innerHTML = `
        <a href="assets/img/${i}.jpg" data-fancybox="gallery" data-caption="Gallery Image ${i}">
          <img src="assets/img/${i}.jpg" alt="Gallery Image ${i}" />
        </a>
      `;
      galleryGrid.appendChild(thumb);
    }

    // Initialize Fancybox after a short delay to ensure it's loaded
    setTimeout(function() {
      if (typeof $.fancybox !== 'undefined') {
        $('[data-fancybox="gallery"]').fancybox({
          buttons: [
            "zoom",
            "share",
            "slideShow",
            "fullScreen",
            "download",
            "thumbs",
            "close"
          ],
          loop: true,
          protect: true,
          image: {
            preload: true
          },
          animationEffect: "fade",
          transitionEffect: "fade"
        });
      } else {
        console.error('Fancybox is not loaded');
      }
    }, 100);
  }

  // Initialize gallery on DOM ready
  $(document).ready(function () {
    // Wait for Fancybox to be available
    if (typeof $.fancybox !== 'undefined') {
      initGallery();
    } else {
      // If Fancybox isn't loaded yet, wait for it
      $(window).on('load', function() {
        initGallery();
      });
    }
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.addEventListener('DOMContentLoaded', function () {
    const animatedElements = document.querySelectorAll(
      '.timeline-item, .education-card, .project-card, .award-card, .skill-item'
    );

    animatedElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
      observer.observe(el);
    });
  });

  // Typing effect for hero subtitle (optional enhancement)
  function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    const texts = [
      'Laravel & AWS Architect',
      'DevOps & Backend Engineer',
      'Designing Scalable Infrastructure',
      '8+ Years Experience'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentText = texts[textIndex];

      if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
      }

      setTimeout(type, typeSpeed);
    }

    type();
  }

  // Initialize typing effect after a delay
  setTimeout(initTypingEffect, 1000);

  // Active navigation link highlighting
  const sections = document.querySelectorAll('.section, .hero');
  const navLinksArray = Array.from(document.querySelectorAll('.nav-link'));

  function highlightNav() {
    let current = '';
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinksArray.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightNav);
  highlightNav(); // Initial call

  // Close mobile menu on window resize
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 968) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });

  // Add loading animation
  window.addEventListener('load', function () {
    document.body.classList.add('loaded');
  });

})(jQuery);
