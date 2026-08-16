// MOBILE NAV
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('is-open');
    navToggle.textContent = navLinks.classList.contains('is-open') ? '✕' : '☰';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.textContent = '☰';
    });
  });

  document.addEventListener('click', (event) => {
    const clickedInside = event.target.closest('.nav-inner');
    if (!clickedInside) {
      navLinks.classList.remove('is-open');
      navToggle.textContent = '☰';
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navLinks.classList.remove('is-open');
      navToggle.textContent = '☰';
    }
  });
}

// PROJECT DETAILS MODAL
const projectModal = document.getElementById('project-modal');
const projectModalContent = document.getElementById('project-modal-content');
const projectCards = document.querySelectorAll('.proj-card');

function closeProjectModal() {
  projectModal.classList.remove('is-open');
  projectModal.setAttribute('aria-hidden', 'true');
  projectModalContent.innerHTML = '';
  document.body.style.overflow = '';
}

projectCards.forEach(card => {
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.addEventListener('click', event => {
    if (event.target.closest('a')) return;
    projectModalContent.innerHTML = '';
    const expandedCard = card.cloneNode(true);
    expandedCard.classList.remove('aos', 'in', 'visible');
    expandedCard.removeAttribute('role');
    expandedCard.removeAttribute('tabindex');
    projectModalContent.appendChild(expandedCard);
    projectModal.classList.add('is-open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });

  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      card.click();
    }
  });
});

projectModal.querySelectorAll('[data-project-close]').forEach(control => {
  control.addEventListener('click', closeProjectModal);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && projectModal.classList.contains('is-open')) {
    closeProjectModal();
  }
});

// DARK MODE
const dm = document.getElementById('dm-toggle');
let dark = false;
dm.addEventListener('click',()=>{
  dark=!dark;
  document.documentElement.setAttribute('data-theme',dark?'dark':'');
  dm.textContent=dark?'☀️':'🌙';
});

// NAV scroll
window.addEventListener('scroll',()=>{
  document.getElementById('nav').classList.toggle('scrolled',window.scrollY>50);
});

// COUNTERS
const counters = document.querySelectorAll('[data-target]');
const countObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting) return;
    const el=e.target;
    const target=+el.dataset.target;
    const suffix=el.dataset.suffix||'';
    const prefix=el.dataset.prefix||'';
    let cur=0;
    const step=target/50;
    const t=setInterval(()=>{
      cur=Math.min(cur+step,target);
      el.textContent=prefix+Math.round(cur)+suffix;
      if(cur>=target) clearInterval(t);
    },24);
    countObs.unobserve(el);
  });
},{threshold:.3});
counters.forEach(c=>countObs.observe(c));

// AOS
const aosEls = document.querySelectorAll('.aos,.aos-left,.aos-right,.tl-item');
const aosObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('in','visible');
      aosObs.unobserve(e.target);
    }
  });
},{threshold:.15});
aosEls.forEach(el=>aosObs.observe(el));

// ─── CONTACT FORM — EmailJS ──────────────────────────────────────────────────
// 1. Crie conta gratuita em https://www.emailjs.com/
// 2. Adicione um Email Service (Gmail, Outlook, etc.)
// 3. Crie um Email Template com as variáveis: {{from_name}}, {{reply_to}}, {{message}}
// 4. Substitua os valores abaixo (Public Key, Service ID e Template ID)
const EMAILJS_PUBLIC_KEY  = 'ebUz9C_L-MgkjjMak';   // Account → API Keys
const EMAILJS_SERVICE_ID  = 'service_aezpkjl';   // Email Services → Service ID
const EMAILJS_TEMPLATE_ID = 'template_xf8alyt';  // Email Templates → Template ID

emailjs.init(EMAILJS_PUBLIC_KEY);

const contactForm   = document.getElementById('contact-form');
const submitBtn     = document.getElementById('form-submit-btn');
const formFeedback  = document.getElementById('form-feedback');

function showFeedback(success, msg) {
  formFeedback.style.display = 'block';
  if (success) {
    formFeedback.style.background = 'rgba(37,211,102,.12)';
    formFeedback.style.color      = '#1a7a3f';
    formFeedback.style.border     = '1px solid rgba(37,211,102,.3)';
  } else {
    formFeedback.style.background = 'rgba(234,67,53,.10)';
    formFeedback.style.color      = '#b91c1c';
    formFeedback.style.border     = '1px solid rgba(234,67,53,.3)';
  }
  formFeedback.textContent = msg;
}

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validação básica
    const name    = document.getElementById('from_name').value.trim();
    const email   = document.getElementById('reply_to').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      showFeedback(false, 'Preencha todos os campos antes de enviar.');
      return;
    }

    // Bloqueia botão durante envio
    submitBtn.disabled    = true;
    submitBtn.textContent = 'Enviando…';

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
      .then(() => {
        showFeedback(true, '✅ Mensagem enviada! Fernando entrará em contato em breve.');
        contactForm.reset();
      })
      .catch(err => {
        console.error('EmailJS error:', err);
        showFeedback(false, '❌ Falha no envio. Tente pelo WhatsApp ou e-mail diretamente.');
      })
      .finally(() => {
        submitBtn.disabled    = false;
        submitBtn.textContent = 'Enviar mensagem →';
      });
  });
}
// ─────────────────────────────────────────────────────────────────────────────

// SKILL BARS
const barEls = document.querySelectorAll('.skill-bar');
const barObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.style.width=e.target.dataset.w+'%';
      barObs.unobserve(e.target);
    }
  });
},{threshold:.2});
barEls.forEach(b=>{b.style.width='0';barObs.observe(b);});
