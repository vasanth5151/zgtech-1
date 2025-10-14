// FAQ Accordion Functionality
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const faqItem = button.parentElement;
      const isActive = faqItem.classList.contains('active');
      
      // Close all other items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });
      
      // Open current if wasn't active
      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  });
  
  // Optional: Auto-animate testimonials
  let testimonialIndex = 0;
  const testimonials = document.querySelectorAll('.testimonial-card');
  
  function rotateTestimonials() {
    testimonials.forEach(card => card.style.opacity = '0.5');
    testimonials[testimonialIndex].style.opacity = '1';
    
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    setTimeout(rotateTestimonials, 5000);
  }
  



  // Initialize Swiper
const testimonialSwiper = new Swiper('.testimonialSwiper', {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2.5,
      slideShadows: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    }
  });



