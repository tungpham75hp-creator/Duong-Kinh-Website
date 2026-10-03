// Dữ liệu dự án — tổng hợp từ báo chí (xem mảng `sources`). Đơn vị: ha, tỷ đồng, người.
const area = 240.6;

const products = [
  {
    id: 'bietthu',
    name: 'Biệt thự',
    units: 1300,
    landHa: 18.8,
    desc: 'Biệt thự đơn lập, song lập, tứ lập nằm sát mặt nước và công viên trung tâm, mật độ xây dựng thấp.',
    tags: ['Đơn lập', 'Song lập', 'Tứ lập'],
    color: '#c9a24b',
  },
  {
    id: 'lienke',
    name: 'Nhà liền kề',
    units: 5000,
    landHa: 36.6,
    desc: 'Nhóm sản phẩm chủ lực về số lượng, bố trí theo các tiểu khu có đường nội bộ, vườn dạo và tiện ích sát nhà.',
    tags: ['Liền kề', 'Tiểu khu', 'Gần tiện ích'],
    color: '#2f7f79',
  },
  {
    id: 'shophouse',
    name: 'Shophouse',
    units: null,
    landHa: null,
    desc: 'Nhà phố thương mại dọc trục chính, kết hợp ở và kinh doanh. Số lượng chi tiết chưa được công bố rộng rãi.',
    tags: ['Mặt phố', 'Kinh doanh', 'Trục chính'],
    color: '#c4623a',
  },
  {
    id: 'noxh',
    name: 'Chung cư cao tầng (NOXH)',
    units: null,
    landHa: 13.9,
    desc: 'Quỹ đất 13,9 ha dành cho nhà ở chung cư cao tầng — nhà ở xã hội theo hồ sơ mời gọi đầu tư.',
    tags: ['Cao tầng', 'Nhà ở xã hội'],
    color: '#4b6cb7',
  },
];

const mappedHa = 13.9 + 36.6 + 18.8; // 69,3 ha đất ở theo cơ cấu sơ bộ

module.exports = {
  name: 'Vinhomes Dương Kinh',
  alias: 'Vinhomes Golden City',
  developer: 'Tập đoàn Vingroup',
  tagline: 'Đô thị ven biển thế hệ mới tại cửa ngõ phía Nam thành phố Hải Phòng',
  location: {
    district: 'Phường Hòa Nghĩa, quận Dương Kinh',
    communes: 'Xã Đông Phương và xã Đại Đồng, huyện Kiến Thụy',
    city: 'Thành phố Hải Phòng',
  },
  area,
  population: 48000,
  investment: {
    total: 23218,
    implementation: 21609.33,
    clearance: 1608.669,
  },
  durationYears: 50,
  groundbreaking: '11/05/2025',
  products,
  landUse: {
    mappedHa: Number(mappedHa.toFixed(1)),
    otherHa: Number((area - mappedHa).toFixed(1)),
  },
  timeline: [
    { when: '2023', title: 'Hải Phòng mời gọi nhà đầu tư', text: 'Thành phố công bố dự án khu đô thị 240,6 ha tại Dương Kinh – Kiến Thụy, tổng mức đầu tư 23.218 tỷ đồng.', status: 'done' },
    { when: '11/05/2025', title: 'Lễ khởi công', text: 'Vingroup khởi công dự án — dự án thứ 5 của tập đoàn tại Hải Phòng.', status: 'done' },
    { when: '2026', title: 'Vận hành thử', text: 'Các hạng mục đầu tiên dự kiến đưa vào vận hành thử. Tiến độ thực tế cần đối chiếu thông báo của chủ đầu tư.', status: 'plan' },
    { when: '2029', title: 'Hoàn thành toàn khu', text: 'Dự kiến hoàn thiện toàn bộ khu đô thị vào nửa cuối năm 2029.', status: 'plan' },
  ],
  // Tiện ích: định hướng theo mô hình các khu đô thị Vinhomes, KHÔNG phải quy hoạch chi tiết đã phê duyệt
  amenities: [
    { icon: 'park', title: 'Công viên & hồ trung tâm', text: 'Trục cảnh quan xanh – nước làm lõi của toàn khu.' },
    { icon: 'school', title: 'Giáo dục', text: 'Quỹ đất trường học các cấp trong nội khu.' },
    { icon: 'health', title: 'Y tế', text: 'Dự kiến bố trí cơ sở khám chữa bệnh phục vụ cư dân.' },
    { icon: 'shop', title: 'Thương mại – dịch vụ', text: 'Phố thương mại, shophouse dọc trục chính.' },
    { icon: 'sport', title: 'Thể thao – giải trí', text: 'Đường dạo, sân chơi và không gian sinh hoạt cộng đồng.' },
    { icon: 'bus', title: 'Giao thông nội khu', text: 'Mạng đường phân cấp, ưu tiên đi bộ và xe đạp.' },
  ],
  sources: [
    { title: 'Hải Phòng gọi đầu tư vào dự án khu đô thị mới 23.218 tỷ đồng — Báo Đấu thầu', url: 'https://baodauthau.vn/hai-phong-goi-dau-tu-vao-du-an-khu-do-thi-moi-23218-ty-dong-post134536.html' },
    { title: 'Khởi công khu thị hơn 23.000 tỷ tại thành phố lớn thứ 2 miền Bắc — Cafeland', url: 'https://cafeland.vn/tin-tuc/khoi-cong-khu-thi-hon-23000-ty-tai-thanh-pho-lon-thu-2-mien-bac-138175.html' },
    { title: 'Hải Phòng tìm nhà đầu tư khu đô thị gần 9.800 tỷ đồng — VietnamFinance', url: 'https://vietnamfinance.vn/hai-phong-tim-nha-dau-tu-khu-do-thi-gan-9800-ty-dong-d145893.html' },
  ],
};
