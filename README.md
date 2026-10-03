# Dương Kinh Hải Phòng – Website dự án

Website giới thiệu khu đô thị Vinhomes Dương Kinh (Vingroup, Hải Phòng), viết bằng **Node.js + Express + EJS**.
Toàn bộ hình minh họa (hero, bản đồ vị trí, sơ đồ mặt bằng tương tác, nhà mẫu) là SVG tự vẽ.

## Chạy

```bash
npm install
npm start        # http://localhost:3000
npm run dev      # tự khởi động lại khi sửa file
```

## Cấu trúc

- `server.js` – Express: trang chủ, REST API, nhận đăng ký (`POST /api/leads` → `data/leads.json`)
- `data/project.js` – toàn bộ số liệu dự án và danh sách nguồn (sửa ở đây để cập nhật nội dung)
- `views/index.ejs` – trang chủ; `views/partials/ill-*.ejs` – các hình minh họa SVG
- `public/` – CSS và JS (sơ đồ tương tác, số đếm, form)

## API

- `GET /api/project` · `GET /api/products` · `GET /api/products/:id`
- `POST /api/leads` `{ name, phone, interest?, note? }`

## Lưu ý nội dung

Số liệu tổng hợp từ báo chí (xem mục "Nguồn" trên trang). Hình ảnh chỉ mang tính minh họa, không phải
quy hoạch hay phối cảnh chính thức. Đây không phải website chính thức của Vingroup/Vinhomes.
