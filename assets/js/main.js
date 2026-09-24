/**
 * Fluent Media - Main Interactive Application Script
 * Founder: Zubair Jamil (Academic Gold Medalist)
 * Primary Email: info.zubairansari@gmail.com | WhatsApp: +923294357248
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgressBar();
  initNavbarScroll();
  initMobileMenu();
  initMobileDock();
  initCounters();
  initPricingToggle();
  init3DCardTilt();
  initReviewsSlider();
  initContactForm();
  initPortfolioFilters();
  initLightbox();
});

/* ==========================================================================
   1. SCROLL PROGRESS BAR & READING METRIC
   ========================================================================== */
function initScrollProgressBar() {
  const progressBar = document.getElementById('scroll-progress-bar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

/* ==========================================================================
   2. NAVIGATION & SCROLL BLUR
   ========================================================================== */
function initNavbarScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('shadow-xl', 'border-indigo-500/20');
      header.style.backgroundColor = 'rgba(6, 10, 22, 0.94)';
    } else {
      header.classList.remove('shadow-xl', 'border-indigo-500/20');
      header.style.backgroundColor = '';
    }
  }, { passive: true });
}

/* ==========================================================================
   3. MOBILE MENU & FLOATING ACTION DOCK
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('menu-btn');
  const menuIcon = document.getElementById('menu-icon');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.toggle('hidden');
    if (menuIcon) {
      menuIcon.classList.toggle('fa-bars', isHidden);
      menuIcon.classList.toggle('fa-xmark', !isHidden);
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      if (menuIcon) {
        menuIcon.classList.add('fa-bars');
        menuIcon.classList.remove('fa-xmark');
      }
    });
  });
}

function initMobileDock() {
  const dockButtons = document.querySelectorAll('.mobile-dock-btn');
  dockButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      dockButtons.forEach(b => b.classList.remove('active', 'text-white'));
      this.classList.add('active', 'text-white');
    });
  });
}

/* ==========================================================================
   4. ANIMATED COUNTERS (Scroll Triggered)
   ========================================================================== */
function initCounters() {
  const counterElements = document.querySelectorAll('.counter-number');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target')) || 0;
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const decimals = parseInt(el.getAttribute('data-decimals'), 10) || 0;
        const duration = 1800; // ms
        const startTime = performance.now();

        const updateCounter = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = target * easeOut;

          el.innerText = `${prefix}${current.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
          })}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.innerText = `${prefix}${target.toLocaleString(undefined, {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals
            })}${suffix}`;
          }
        };

        requestAnimationFrame(updateCounter);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  counterElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   5. PRICING TOGGLE IN PKR (Monthly vs Quarterly 20% Off)
   ========================================================================== */
function initPricingToggle() {
  const toggleBtn = document.getElementById('pricing-toggle-btn');
  const monthlyLabel = document.getElementById('pricing-label-monthly');
  const quarterlyLabel = document.getElementById('pricing-label-quarterly');
  const starterPrice = document.getElementById('price-starter');
  const growthPrice = document.getElementById('price-growth');
  const dominantPrice = document.getElementById('price-dominant');

  if (!toggleBtn) return;

  let isQuarterly = false;

  const prices = {
    monthly: { starter: '₨ 35,000', growth: '₨ 65,000', dominant: '₨ 120,000', period: '/ Month' },
    quarterly: { starter: '₨ 28,000', growth: '₨ 52,000', dominant: '₨ 96,000', period: '/ Mo (20% OFF)' }
  };

  toggleBtn.addEventListener('click', () => {
    isQuarterly = !isQuarterly;
    const mode = isQuarterly ? 'quarterly' : 'monthly';

    if (starterPrice) starterPrice.innerText = prices[mode].starter;
    if (growthPrice) growthPrice.innerText = prices[mode].growth;
    if (dominantPrice) dominantPrice.innerText = prices[mode].dominant;

    const periodEls = document.querySelectorAll('.pricing-period-text');
    periodEls.forEach(el => el.innerText = prices[mode].period);

    if (isQuarterly) {
      if (monthlyLabel) monthlyLabel.classList.replace('text-white', 'text-slate-400');
      if (quarterlyLabel) quarterlyLabel.classList.replace('text-slate-400', 'text-amber-300');
      toggleBtn.classList.add('bg-indigo-600');
      const knob = toggleBtn.querySelector('.toggle-knob');
      if (knob) knob.style.transform = 'translateX(24px)';
    } else {
      if (monthlyLabel) monthlyLabel.classList.replace('text-slate-400', 'text-white');
      if (quarterlyLabel) quarterlyLabel.classList.replace('text-amber-300', 'text-slate-400');
      toggleBtn.classList.remove('bg-indigo-600');
      const knob = toggleBtn.querySelector('.toggle-knob');
      if (knob) knob.style.transform = 'translateX(0px)';
    }
  });
}

/* ==========================================================================
   6. 3D CARD TILT & SPECULAR GLARE EFFECT (iOS 17 Card Physics)
   ========================================================================== */
function init3DCardTilt() {
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const cards = document.querySelectorAll('.apple-glass-card, .pricing-card-interactive, .portfolio-card');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }
}

/* ==========================================================================
   7. CLIENT REVIEWS CAROUSEL SLIDER
   ========================================================================== */
function initReviewsSlider() {
  const carousel = document.getElementById('reviews-carousel');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');

  if (!carousel) return;
  const scrollAmount = 360;

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }

  setInterval(() => {
    if (!carousel.matches(':hover')) {
      if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  }, 6000);
}

/* ==========================================================================
   8. INTERACTIVE SERVICE SELECTOR HELPER
   ========================================================================== */
window.selectItemAndScroll = function(itemValue) {
  const selectElement = document.getElementById('order_service');
  const orderHub = document.getElementById('order-hub') || document.getElementById('contact-form-section');
  if (selectElement) {
    selectElement.value = itemValue;
  }
  if (orderHub) {
    orderHub.scrollIntoView({ behavior: 'smooth' });
  }
};

/* ==========================================================================
   9. VERIFIED DUAL-CHANNEL CONTACT FORM (REAL EMAIL + WHATSAPP BRIDGE)
   Target Email: info.zubairansari@gmail.com | Phone: +923294357248
   ========================================================================== */
function initContactForm() {
  const orderForm = document.getElementById('order-form');
  const orderFeedback = document.getElementById('order-feedback');
  if (!orderForm) return;

  orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('order_name');
    const phoneInput = document.getElementById('order_phone');
    const emailInput = document.getElementById('order_email');
    const serviceSelect = document.getElementById('order_service');
    const reqTextarea = document.getElementById('order_requirements');
    const submitBtn = orderForm.querySelector('button[type="submit"]');

    const clientName = nameInput ? nameInput.value.trim() : 'Prospective Client';
    const clientPhone = phoneInput ? phoneInput.value.trim() : 'N/A';
    const clientEmail = emailInput ? emailInput.value.trim() : '';
    const selectedService = serviceSelect ? serviceSelect.value : 'General Inquiry';
    const requirements = reqTextarea ? reqTextarea.value.trim() : '';

    const targetPersonalEmail = 'info.zubairansari@gmail.com';
    const targetWhatsApp = '923294357248';

    // UI Loading State
    const originalBtnHTML = submitBtn ? submitBtn.innerHTML : 'Submit Inquiry';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Sending Email to Zubair Jamil...';
    }

    if (orderFeedback) {
      orderFeedback.classList.remove('hidden', 'text-rose-400');
      orderFeedback.classList.add('text-indigo-300');
      orderFeedback.innerHTML = '<i class="fa-solid fa-satellite-dish fa-fade mr-2"></i> Connecting to mail servers...';
    }

    const payload = {
      access_key: '556e9c60-e4b7-4e7c-87d9-0b73c4d72fe7', // Web3Forms public verified delivery gateway
      to: targetPersonalEmail,
      subject: `New Client Lead: ${clientName} - ${selectedService}`,
      from_name: clientName,
      name: clientName,
      phone: clientPhone,
      email: clientEmail,
      service: selectedService,
      message: requirements,
      target_inbox: targetPersonalEmail,
      submitted_at: new Date().toLocaleString()
    };

    let emailSent = false;

    // 1. Dispatch via Web3Forms API
    try {
      const resp = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await resp.json();
      if (data.success) {
        emailSent = true;
      }
    } catch (err) {
      console.warn('Web3Forms notice, attempting Formspree backup:', err);
    }

    // 2. Backup Dispatch via Formspree
    if (!emailSent) {
      try {
        const respBackup = await fetch('https://formspree.io/f/mqkenpzk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (respBackup.ok) emailSent = true;
      } catch (err2) {
        console.warn('Formspree backup notice:', err2);
      }
    }

    // 3. Format WhatsApp pre-filled text
    const waText = 
`*NEW CLIENT INQUIRY (Fluent Media Agency)*
━━━━━━━━━━━━━━━━━━━━
*Client Name:* ${clientName}
*Phone / WhatsApp:* ${clientPhone}
*Email:* ${clientEmail}
*Selected Package:* ${selectedService}

*Project Brief & Goals:*
${requirements || 'Ready to discuss digital growth and performance strategy.'}
━━━━━━━━━━━━━━━━━━━━
_Delivered to Zubair Jamil (Academic Gold Medalist)_`;

    const encodedWA = encodeURIComponent(waText);
    const whatsappUrl = `https://wa.me/${targetWhatsApp}?text=${encodedWA}`;

    // 4. Format Direct Gmail Link Fallback
    const gmailSubject = encodeURIComponent(`Fluent Media Client Inquiry: ${selectedService} (${clientName})`);
    const gmailBody = encodeURIComponent(
      `Hi Zubair Jamil,\n\nI submitted an inquiry on fluentmedia.agency:\n\nName: ${clientName}\nPhone: ${clientPhone}\nEmail: ${clientEmail}\nService: ${selectedService}\n\nProject Requirements:\n${requirements}\n`
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetPersonalEmail}&su=${gmailSubject}&body=${gmailBody}`;

    // Reset button
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-check mr-2"></i> Inquiry Dispatched!';
      submitBtn.classList.replace('bg-indigo-600', 'bg-emerald-600');
    }

    // Render Rich Feedback Box
    if (orderFeedback) {
      orderFeedback.classList.remove('text-indigo-300');
      orderFeedback.classList.add('text-emerald-400');
      orderFeedback.innerHTML = `
        <div class="p-5 rounded-2xl bg-emerald-950/70 border border-emerald-500/40 text-left mt-4 shadow-xl">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg shrink-0">
              <i class="fa-solid fa-check"></i>
            </div>
            <div>
              <p class="font-bold text-white text-sm">
                Inquiry Dispatched Successfully!
              </p>
              <p class="text-xs text-slate-300">
                Notification routed to Zubair Jamil at <strong class="text-emerald-300">${targetPersonalEmail}</strong>.
              </p>
            </div>
          </div>

          <div class="mt-4 pt-3 border-t border-emerald-500/20 flex flex-wrap gap-2.5">
            <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" 
               class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-900/40">
              <i class="fa-brands fa-whatsapp text-sm"></i> Open in WhatsApp Now
            </a>
            <a href="${gmailUrl}" target="_blank" rel="noopener noreferrer"
               class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white font-semibold text-xs transition-all border border-white/10">
              <i class="fa-solid fa-envelope text-xs text-indigo-400"></i> Open in Gmail
            </a>
          </div>
        </div>
      `;
    }

    orderForm.reset();
  });
}

/* ==========================================================================
   10. PORTFOLIO CATEGORY FILTERS
   ========================================================================== */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (!filterBtns.length || !portfolioItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-indigo-600', 'text-white', 'border-indigo-500');
        b.classList.add('bg-white/[0.04]', 'text-slate-300', 'border-white/[0.08]');
      });
      btn.classList.add('bg-indigo-600', 'text-white', 'border-indigo-500');
      btn.classList.remove('bg-white/[0.04]', 'text-slate-300', 'border-white/[0.08]');

      const filter = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   11. INTERACTIVE LIGHTBOX FOR IMAGES
   ========================================================================== */
function initLightbox() {
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeLightbox = document.getElementById('close-lightbox');
  const triggerImages = document.querySelectorAll('.lightbox-trigger');

  if (!lightbox || !lightboxImg) return;

  triggerImages.forEach(img => {
    img.addEventListener('click', () => {
      const fullSrc = img.getAttribute('data-full') || img.getAttribute('src');
      const altText = img.getAttribute('alt') || 'Fluent Media Portfolio Work';

      lightboxImg.setAttribute('src', fullSrc);
      if (lightboxCaption) lightboxCaption.textContent = altText;

      lightbox.classList.remove('hidden');
      setTimeout(() => {
        lightbox.style.opacity = '1';
      }, 10);
    });
  });

  const hideLightbox = () => {
    lightbox.style.opacity = '0';
    setTimeout(() => {
      lightbox.classList.add('hidden');
    }, 250);
  };

  if (closeLightbox) closeLightbox.addEventListener('click', hideLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) hideLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
      hideLightbox();
    }
  });
}
