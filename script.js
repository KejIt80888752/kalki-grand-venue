// ── AOS Init ──
AOS.init({ duration: 750, easing: 'ease-out-cubic', once: true, offset: 50 });

// ── Cursor glow ──
const glow = document.createElement('div');
glow.className = 'cursor-glow';
document.body.appendChild(glow);
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top  = e.clientY + 'px';
});

// ── Navbar scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
});

// ── Active nav link on scroll ──
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');
const secObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const a = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
      if (a) a.classList.add('active');
    }
  });
}, { threshold: 0.35 });
sections.forEach(s => secObserver.observe(s));

// ── Hamburger ──
const hamburger   = document.getElementById('hamburger');
const navLinksEl  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('open');
});
navLinksEl.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksEl.classList.remove('open');
  })
);

// ── Back to top ──
document.getElementById('backToTop').addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

// ── Counter animation ──
const counters = document.querySelectorAll('.stat-num[data-count]');
const cntObs   = new IntersectionObserver(entries => {
  entries.forEach(({ isIntersecting, target }) => {
    if (!isIntersecting) return;
    const end  = parseInt(target.dataset.count);
    const dur  = 2000;
    const step = end / (dur / 16);
    let cur = 0;
    const t = setInterval(() => {
      cur += step;
      if (cur >= end) { cur = end; clearInterval(t); }
      target.textContent = Math.floor(cur);
    }, 16);
    cntObs.unobserve(target);
  });
}, { threshold: 0.6 });
counters.forEach(c => cntObs.observe(c));

// ── Service card spotlight ──
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r  = card.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width  * 100).toFixed(1) + '%';
    const my = ((e.clientY - r.top)  / r.height * 100).toFixed(1) + '%';
    card.style.setProperty('--mx', mx);
    card.style.setProperty('--my', my);
  });
});

// ── Glowing teal particles ──
const bg = document.getElementById('particles-bg');
function spawnParticle() {
  const p = document.createElement('div');
  p.className = 'particle ' + (Math.random() > 0.4 ? 'gold-p' : 'purple-p');
  const size = Math.random() * 3 + 1;
  p.style.cssText = `
    left: ${Math.random() * 100}vw;
    width: ${size}px;
    height: ${size}px;
    animation-duration: ${Math.random() * 14 + 8}s;
    animation-delay: ${Math.random() * 2}s;
  `;
  bg.appendChild(p);
  const ttl = (parseFloat(p.style.animationDuration) + parseFloat(p.style.animationDelay) + 1) * 1000;
  setTimeout(() => p.remove(), ttl);
}
for (let i = 0; i < 12; i++) setTimeout(spawnParticle, i * 150);
setInterval(spawnParticle, 700);

// ── Smooth scroll ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
