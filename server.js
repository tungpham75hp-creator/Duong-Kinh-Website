const express = require('express');
const path = require('path');
const fs = require('fs');
const project = require('./data/project');

const app = express();
const PORT = process.env.PORT || 3000;
const LEADS_FILE = path.join(__dirname, 'data', 'leads.json');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.disable('x-powered-by');
app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '1h' }));

app.locals.fmt = (n, digits = 0) =>
  new Intl.NumberFormat('vi-VN', { maximumFractionDigits: digits }).format(n);

// ---- Trang chủ ----
app.get('/', (req, res) => res.render('index', { p: project }));

// ---- API ----
app.get('/api/project', (req, res) => res.json(project));
app.get('/api/products', (req, res) => res.json(project.products));
app.get('/api/products/:id', (req, res) => {
  const item = project.products.find((x) => x.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Không tìm thấy loại hình sản phẩm' });
  res.json(item);
});

// Đăng ký nhận thông tin: lưu vào data/leads.json (demo, chạy local)
const hits = new Map(); // giới hạn tần suất đơn giản theo IP
app.post('/api/leads', (req, res) => {
  const now = Date.now();
  const recent = (hits.get(req.ip) || []).filter((t) => now - t < 60_000);
  if (recent.length >= 5) return res.status(429).json({ error: 'Bạn gửi quá nhanh, vui lòng thử lại sau ít phút.' });
  hits.set(req.ip, [...recent, now]);

  const { name, phone, interest, note } = req.body || {};
  const clean = (v, max) => String(v ?? '').trim().slice(0, max);
  const lead = {
    name: clean(name, 80),
    phone: clean(phone, 20),
    interest: clean(interest, 40),
    note: clean(note, 500),
    createdAt: new Date().toISOString(),
  };
  if (lead.name.length < 2) return res.status(400).json({ error: 'Vui lòng nhập họ tên.' });
  if (!/^(\+?84|0)\d{9}$/.test(lead.phone.replace(/[\s.-]/g, ''))) {
    return res.status(400).json({ error: 'Số điện thoại chưa hợp lệ (ví dụ 0901234567).' });
  }

  let list = [];
  try { list = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8')); } catch { /* chưa có file */ }
  list.push(lead);
  fs.writeFileSync(LEADS_FILE, JSON.stringify(list, null, 2));
  res.status(201).json({ ok: true, message: `Cảm ơn ${lead.name}! Chúng tôi sẽ liên hệ sớm.` });
});

app.use((req, res) => res.status(404).render('404'));

app.listen(PORT, () => console.log(`Website chạy tại http://localhost:${PORT}`));
