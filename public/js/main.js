(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // Menu di động
  const toggle = $('.nav-toggle'), menu = $('#menu');
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  $$('#menu a').forEach((a) => a.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));

  // Hiện dần khi cuộn + chạy số đếm + thanh tỷ lệ
  const fmt = new Intl.NumberFormat('vi-VN');
  const countUp = (el) => {
    const target = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0);
    const t0 = performance.now(), dur = 1400;
    const tick = (now) => {
      const k = Math.min((now - t0) / dur, 1), e = 1 - Math.pow(1 - k, 3);
      el.textContent = new Intl.NumberFormat('vi-VN', { minimumFractionDigits: dec, maximumFractionDigits: dec }).format(target * e);
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  // Lưu độ rộng thanh để animate từ 0
  $$('.bars i').forEach((i) => { i.dataset.w = i.style.width; i.style.width = '0'; });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      $$('.bars i', en.target).forEach((i) => (i.style.width = i.dataset.w));
      io.unobserve(en.target);
    });
  }, { threshold: 0.15 });
  $$('.reveal').forEach((el) => io.observe(el));

  const io2 = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      $$('[data-count]', en.target).forEach(countUp);
      io2.unobserve(en.target);
    });
  }, { threshold: 0.4 });
  const stats = $('.stats');
  if (stats) io2.observe(stats);
  // Số đếm hiển thị giá trị cuối nếu JS lỗi: đặt sẵn text
  $$('[data-count]').forEach((el) => (el.textContent = fmt.format(+el.dataset.count)));

  // Sơ đồ mặt bằng tương tác
  const zones = JSON.parse($('#zone-data').textContent);
  const svg = $('#masterplan'), info = $('#planInfo');
  const setZone = (id) => {
    const z = zones[id];
    if (!z) return;
    svg.classList.add('has-active');
    $$('.zone', svg).forEach((n) => n.classList.toggle('active', n.dataset.zone === id));
    $$('#legend li').forEach((n) => n.classList.toggle('active', n.dataset.zone === id));
    info.innerHTML = '';
    const h = document.createElement('h3'); h.textContent = z.title;
    const p = document.createElement('p'); p.textContent = z.text;
    info.append(h, p);
  };
  $$('.zone', svg).forEach((n) => {
    n.addEventListener('click', () => setZone(n.dataset.zone));
    n.addEventListener('mouseenter', () => setZone(n.dataset.zone));
    n.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setZone(n.dataset.zone); } });
    n.setAttribute('role', 'button');
    n.setAttribute('aria-label', zones[n.dataset.zone].title);
  });
  $$('#legend li').forEach((n) => n.addEventListener('click', () => setZone(n.dataset.zone)));

  // Form đăng ký
  const form = $('#leadForm'), msg = $('#formMsg');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.className = 'form-msg';
    msg.textContent = 'Đang gửi…';
    const btn = form.querySelector('button');
    btn.disabled = true;
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json();
      msg.textContent = data.message || data.error || 'Có lỗi xảy ra.';
      msg.classList.add(res.ok ? 'ok' : 'err');
      if (res.ok) form.reset();
    } catch {
      msg.textContent = 'Không kết nối được máy chủ, vui lòng thử lại.';
      msg.classList.add('err');
    } finally {
      btn.disabled = false;
    }
  });
})();
