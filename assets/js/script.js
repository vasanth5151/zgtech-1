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


// recent blog section

const blogContainer = document.getElementById('blog-container');
const WORDPRESS_URL = "https://zerogravitytechnologies.com/blog/"; // 🔄 replace with your site
const POSTS_API = `${WORDPRESS_URL}/wp-json/wp/v2/posts?_embed&per_page=3`;

async function loadRecentBlogs() {
  try {
    const res = await fetch(POSTS_API);
    const posts = await res.json();

    if (!posts.length) {
      blogContainer.innerHTML = "<p>No recent posts found.</p>";
      return;
    }

    const blogHTML = posts.map(post => {
      const featuredImg = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/400x250?text=No+Image';
      const title = post.title.rendered;
      const excerpt = post.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 120) + '...';
      const link = post.link;

      return `
        <article class="blog-card">
          <img src="${featuredImg}" alt="${title}">
          <div class="blog-content">
            <h3>${title}</h3>
            <p>${excerpt}</p>
            <a href="${link}" target="_blank">Read More →</a>
          </div>
        </article>
      `;
    }).join('');

    blogContainer.innerHTML = blogHTML;

  } catch (error) {
    console.error("Error fetching blog posts:", error);
    blogContainer.innerHTML = "<p>Failed to load recent blogs. Try again later.</p>";
  }
}

loadRecentBlogs();

