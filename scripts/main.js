(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reduceMotion = prefersReducedMotion.matches;

  const animateElements = document.querySelectorAll('[data-animate]');
  const counterElements = document.querySelectorAll('[data-count]');
  const progressElements = document.querySelectorAll('[data-progress]');

  const integerFormatter = new Intl.NumberFormat('pt-BR');
  const decimalFormatter = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const compactFormatter = new Intl.NumberFormat('pt-BR', {
    notation: 'compact',
    maximumFractionDigits: 1,
  });
  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const revealObserver =
    'IntersectionObserver' in window && !reduceMotion
      ? new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.2 }
        )
      : null;

  if (revealObserver) {
    animateElements.forEach((el) => revealObserver.observe(el));
  } else {
    animateElements.forEach((el) => el.classList.add('is-visible'));
  }

  function formatValue(value, format) {
    switch (format) {
      case 'decimal':
        return decimalFormatter.format(value);
      case 'percent':
        return `${decimalFormatter.format(value)}%`;
      case 'compact':
        return compactFormatter.format(value);
      case 'currency':
        return currencyFormatter.format(value);
      default:
        return integerFormatter.format(Math.round(value));
    }
  }

  function animateCount(el) {
    const target = Number(el.dataset.value);
    if (!Number.isFinite(target)) return;

    const format = el.dataset.format || 'integer';
    const duration = Number(el.dataset.duration || 1200);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const startValue = Number(el.dataset.start || 0);

    const update = (value) => {
      el.textContent = `${prefix}${formatValue(value, format)}${suffix}`;
    };

    if (reduceMotion) {
      update(target);
      return;
    }

    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = startValue + (target - startValue) * easeOutCubic(progress);
      update(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window && !reduceMotion) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.dataset.counted) {
            entry.target.dataset.counted = 'true';
            animateCount(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    counterElements.forEach((el) => counterObserver.observe(el));
  } else {
    counterElements.forEach((el) => animateCount(el));
  }

  function fillProgress(el) {
    el.classList.add('is-filled');
  }

  if ('IntersectionObserver' in window && !reduceMotion) {
    const progressObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fillProgress(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    progressElements.forEach((el) => progressObserver.observe(el));
  } else {
    progressElements.forEach(fillProgress);
  }

  const navToggle = document.querySelector('[data-nav-toggle]');
  const navContainer = document.querySelector('[data-nav]');

  if (navToggle && navContainer) {
    navToggle.addEventListener('click', () => {
      const isOpen = navContainer.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();

      if (navContainer) {
        navContainer.classList.remove('is-open');
      }
      if (navToggle) {
        navToggle.setAttribute('aria-expanded', 'false');
      }

      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
  });

  window.addEventListener('scroll', () => {
    const isCondensed = window.scrollY > 24;
    document.body.classList.toggle('nav-condensed', isCondensed);
  });

  if (typeof prefersReducedMotion.addEventListener === 'function') {
    prefersReducedMotion.addEventListener('change', (event) => {
      reduceMotion = event.matches;
    });
  }
})();
