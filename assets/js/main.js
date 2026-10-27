(() => {
  const slides = Array.from(document.querySelectorAll('.hero-slide'));
  const slideButtons = Array.from(document.querySelectorAll('.hero-count button'));
  const previous = document.querySelector('.hero-prev');
  const next = document.querySelector('.hero-next');
  const hero = document.querySelector('.hero');
  let current = 0;
  let interval = null;

  function showSlide(index) {
    if (!slides.length) return;
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === current);
      slide.setAttribute('aria-hidden', String(i !== current));
    });
    slideButtons.forEach((button, i) => {
      button.classList.toggle('is-active', i === current);
      button.setAttribute('aria-pressed', String(i === current));
    });
  }

  function startSlideshow() {
    stopSlideshow();
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      interval = window.setInterval(() => showSlide(current + 1), 7000);
    }
  }
  function stopSlideshow() {
    if (interval) window.clearInterval(interval);
    interval = null;
  }

  previous?.addEventListener('click', () => { showSlide(current - 1); startSlideshow(); });
  next?.addEventListener('click', () => { showSlide(current + 1); startSlideshow(); });
  slideButtons.forEach((button, index) => button.addEventListener('click', () => { showSlide(index); startSlideshow(); }));
  hero?.addEventListener('mouseenter', stopSlideshow);
  hero?.addEventListener('mouseleave', startSlideshow);
  hero?.addEventListener('focusin', stopSlideshow);
  hero?.addEventListener('focusout', startSlideshow);
  showSlide(0);
  startSlideshow();

  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  menuToggle?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    menuToggle.textContent = isOpen ? '×' : '☰';
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (menuToggle) {
      menuToggle.textContent = '☰';
      menuToggle.setAttribute('aria-label', 'Open navigation');
    }
  }));

  const agendaTrack = document.querySelector('#agenda-track');
  document.querySelector('.agenda-prev')?.addEventListener('click', () => {
    agendaTrack?.scrollBy({left: -Math.max(240, agendaTrack.clientWidth * 0.72), behavior: 'smooth'});
  });
  document.querySelector('.agenda-next')?.addEventListener('click', () => {
    agendaTrack?.scrollBy({left: Math.max(240, agendaTrack.clientWidth * 0.72), behavior: 'smooth'});
  });

  // Set the minimum date on date inputs if any are added to this prototype later.
  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  document.querySelectorAll('input[type="date"]').forEach(input => input.min = localToday);


  document.querySelectorAll('[data-hero-action]').forEach(link => {
    link.addEventListener('click', event => {
      const selector = link.getAttribute('href');
      const target = selector ? document.querySelector(selector) : null;
      if (!target) {
        if (link.dataset.heroAction === 'plan') {
          window.location.href = 'mailto:wintripsafarishelp@gmail.com?subject=' +
            encodeURIComponent("Let's plan my Wintrip journey") +
            '&body=' + encodeURIComponent('Hello Wintrip Safaris,\n\nI would like help planning a trip. Please contact me with available options.\n');
        }
        return;
      }
      event.preventDefault();
      if (window.location.hash !== selector) {
        window.history.pushState(null, '', selector);
      }
      target.setAttribute('tabindex', '-1');
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      window.setTimeout(() => target.focus({ preventScroll: true }), reduceMotion ? 0 : 350);
    });
  });

  // Contact links intentionally remain simple mailto actions in this frontend-only prototype.
  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', () => {
      const email = link.getAttribute('href');
      if (!email) return;
    });
  });
})();