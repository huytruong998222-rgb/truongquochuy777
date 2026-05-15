(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const progress = document.getElementById('progress');

  // Initialize theme from localStorage or prefers-color-scheme
  const saved = localStorage.getItem('theme');
  if (saved === 'light') document.documentElement.classList.add('light');
  else if (!saved && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) document.documentElement.classList.add('light');

  function updateToggle() {
    const isLight = document.documentElement.classList.contains('light');
    themeToggle.setAttribute('aria-pressed', String(isLight));
    themeToggle.textContent = isLight ? 'Sáng' : 'Tối';
  }
  updateToggle();

  themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.classList.toggle('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateToggle();
  });

  // Scroll progress
  function onScroll() {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const p = (window.scrollY / Math.max(1, h)) * 100;
    progress.style.width = p + '%';
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Parallax / reveal
  const hero = document.querySelector('.hero');
  const avatar = document.querySelector('.avatar-frame');
  window.addEventListener('scroll', () => {
    const rect = hero.getBoundingClientRect();
    const shift = Math.max(-80, Math.min(80, -rect.top * 0.06));
    if (avatar) avatar.style.transform = `translateY(${shift}px)`;
  }, {passive:true});

  // Smooth reveal on load
  document.documentElement.classList.add('ready');

  // Contact form simple handling
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name')?.toString().trim();
      const email = data.get('email')?.toString().trim();
      const message = data.get('message')?.toString().trim();
      if (!name || !email || !message) {
        alert('Vui lòng điền đầy đủ thông tin.');
        return;
      }
      // For demo: show success toast
      alert('Cảm ơn ' + name + '! Tin nhắn đã được ghi nhận.');
      form.reset();
    });
  }
})();
