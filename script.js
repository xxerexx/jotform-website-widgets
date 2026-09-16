const header = document.querySelector('.site-header');
const progress = document.querySelector('#scrollProgress');
const navLinks = [...document.querySelectorAll('.nav-links a')];
const sections = [...document.querySelectorAll('.section-anchor')];
const menu = document.querySelector('#navLinks');
const menuToggle = document.querySelector('.menu-toggle');

function onScroll() {
  const y = window.scrollY;

  header.classList.toggle('scrolled', y > 30);

  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${max ? (y / max) * 100 : 0}%`;

  let current = 'home';

  sections.forEach((section) => {
    if (y >= section.offsetTop - 160) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle(
      'active',
      link.getAttribute('href') === `#${current}`
    );
  });

  document.querySelectorAll('[data-speed]').forEach((element) => {
    const rect = element.parentElement.getBoundingClientRect();

    if (rect.bottom > 0 && rect.top < innerHeight) {
      const speed = parseFloat(element.dataset.speed || 0.1);

      element.style.transform =
        `translate3d(0, ${-rect.top * speed}px, 0) scale(1.08)`;
    }
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();


/* Mobile navigation */

menuToggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');

  menuToggle.setAttribute('aria-expanded', open);
  document.body.classList.toggle('menu-open', open);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});


/* Reveal animations */

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

document.querySelectorAll('.reveal').forEach((element) => {
  io.observe(element);
});


/* Animated counters */

const counterIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const target = +element.dataset.count;
      const suffix = element.dataset.suffix || '';
      const start = performance.now();
      const duration = 1200;

      function tick(time) {
        const progress = Math.min((time - start) / duration, 1);
        const value = Math.round(
          target * (1 - Math.pow(1 - progress, 3))
        );

        element.textContent = value + suffix;

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      }

      requestAnimationFrame(tick);
      counterIO.unobserve(element);
    });
  },
  {
    threshold: 0.5
  }
);

document.querySelectorAll('[data-count]').forEach((element) => {
  counterIO.observe(element);
});


/* Before / After comparison slider */

const range = document.querySelector('#compareRange');
const before = document.querySelector('#beforeLayer');
const line = document.querySelector('#compareLine');

function compare() {
  before.style.width = range.value + '%';
  line.style.left = range.value + '%';
}

range.addEventListener('input', compare);
compare();


/* Estimate form */

document
  .querySelector('#estimateForm')
  .addEventListener('submit', (event) => {
    event.preventDefault();

    document.querySelector('#formStatus').textContent =
      'Demo form submitted. Replace this form with your Jotform estimate-request embed for production.';
  });


/* Website tour */

const tourSteps = [
  [
    'Welcome to Apex',
    'This uncommon Website Tour widget can guide first-time visitors through the most important sections.',
    '#home'
  ],
  [
    'See the services',
    'Highlight the main renovation categories and help visitors quickly find the right scope.',
    '#services'
  ],
  [
    'Inspect the work',
    'Guide visitors to before-and-after transformations and completed projects.',
    '#projects'
  ],
  [
    'Request an estimate',
    'Finish the tour at the conversion point: your Jotform estimate request.',
    '#contact'
  ]
];

let tourIndex = 0;

const pop = document.querySelector('#tourPopover');
const title = document.querySelector('#tourTitle');
const text = document.querySelector('#tourText');
const count = document.querySelector('#tourCount');

function renderTour(scroll = true) {
  const step = tourSteps[tourIndex];

  title.textContent = step[0];
  text.textContent = step[1];
  count.textContent = `${tourIndex + 1} / ${tourSteps.length}`;

  if (scroll) {
    document.querySelector(step[2]).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

document.querySelector('#tourLaunch').onclick = () => {
  pop.hidden = false;
  renderTour(false);
};

document.querySelector('#tourClose').onclick = () => {
  pop.hidden = true;
};

document.querySelector('#tourNext').onclick = () => {
  tourIndex = (tourIndex + 1) % tourSteps.length;
  renderTour();
};

document.querySelector('#tourPrev').onclick = () => {
  tourIndex =
    (tourIndex - 1 + tourSteps.length) % tourSteps.length;

  renderTour();
};
