# 🧧 Hũ Lì Xì

> App quản lý tiền lì xì cho trẻ em Việt Nam, dịp Tết Nguyên Đán

**Live Demo:** https://lixi.huvang.vn

![Hũ Lì Xì Banner](https://img.shields.io/badge/Made%20with-React%20%2B%20TypeScript-blue) ![Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC) ![Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF) ![Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code%20CLI-blueviolet)

---

## 📱 Tính năng chính

### 🎁 Quản lý tiền lì xì
- **Nhận lì xì**: Ghi nhận số tiền và tên người tặng
- **Chi tiêu**: Theo dõi các khoản chi với lời nhắc tiết kiệm
- **Gửi giữ hộ**: Gửi tiền cho bố mẹ/ông bà giữ hộ an toàn
- **Nhận lại**: Rút tiền từ người giữ hộ khi cần
- **Chi tiêu từ người giữ hộ**: Khi hết tiền, có thể chi tiêu từ khoản người lớn đang giữ

### 📲 Mã QR nhận tiền
- Upload nhiều mã QR ngân hàng
- Gắn tên chủ tài khoản cho mỗi mã QR
- Khi nhận lì xì qua QR → tự động ghi nhận người đó giữ hộ
- Hiển thị mã QR to cho người lớn quét chuyển tiền
- **Bảo vệ xóa nhầm**: Giữ nút 3 giây + nhập đúng tên mới xóa được

### 👨‍👩‍👧‍👦 Hỗ trợ nhiều bé
- Tạo hồ sơ riêng cho từng bé với avatar cute
- Chuyển đổi giữa các bé dễ dàng
- Mỗi bé có lịch sử giao dịch và hũ tiền riêng

### 👋 Màn hình chào mừng (Onboarding)
- 5 slide giới thiệu app cho người dùng mới
- Giải thích mục đích: hỗ trợ bé quản lý tiền lì xì
- Khuyến khích bé tự ghi chép để có ý thức về dòng tiền
- Thông báo về lưu trữ local, không kết nối ngân hàng
- Cảnh báo về các trường hợp mất dữ liệu

### 🔐 Bảo mật
- Mã PIN 4 số bảo vệ dữ liệu
- Tự động khóa sau 5 phút không hoạt động
- Xác nhận xóa bé: nhập tên + mã PIN
- Xác nhận xóa dữ liệu: nhập "XÓA HẾT" + mã PIN
- Xác nhận xóa QR: giữ 3 giây + nhập tên chủ tài khoản

### 💾 Sao lưu & Khôi phục
- **Sao lưu**: Tải file JSON chứa toàn bộ dữ liệu về máy
- **Khôi phục**: Import file backup để khôi phục dữ liệu
- Lưu file backup vào Google Drive/iCloud/Zalo để an toàn

### 🎨 Giao diện thân thiện trẻ em
- Màu sắc tươi sáng, pastel dễ thương
- Font chữ to, dễ đọc
- Nút bấm lớn, dễ chạm
- Hiệu ứng pháo giấy khi vào Hũ Lì Xì
- Nút Hũ Lì Xì có hiệu ứng sóng lan tỏa

### ✨ 200 câu quotes giáo dục
- Hiển thị ngẫu nhiên trên Dashboard mỗi lần mở
- Chủ đề: Tài chính, Tiết kiệm, Học hành, Lễ phép, Gia đình, Tết

### 📚 Bài viết giáo dục
- Giới thiệu về Hũ Lì Xì
- Hướng dẫn ba mẹ dạy con chi tiêu
- Ý nghĩa của việc tiết kiệm
- Phong tục lì xì Việt Nam
- Tết Nguyên Đán và màu sắc ngày Tết

### 📊 Analytics
- Tích hợp Umami Analytics (privacy-focused)
- Theo dõi lượng truy cập mà không thu thập dữ liệu cá nhân

---

## 🛠 Tech Stack

| Công nghệ | Mục đích |
|-----------|----------|
| React 18 | UI Framework |
| TypeScript | Type safety |
| Vite | Build tool |
| Tailwind CSS v4 | Styling |
| @rive-app/react-canvas | Mascot animation |
| localStorage | Data storage |
| Vercel | Hosting |
| Umami | Analytics |

---

## 📁 Cấu trúc thư mục

```
src/
├── components/
│   ├── auth/           # WelcomeScreen, PasscodeScreen, SetupWizard
│   ├── bunny/          # BunnyMascot, BunnySpeechPopup
│   ├── common/         # Modal, Confetti
│   ├── dashboard/      # BalanceSummary, ActionButtons, TransactionList, ChildSelector
│   ├── forms/          # ReceiveLixiForm, SpendForm, DepositForm, WithdrawForm, EditTransactionForm
│   ├── layout/         # AppContainer, BottomTabBar
│   └── tabs/           # QRCodeTab, DashboardTab, SettingsTab
├── services/           # storage.ts (data layer với backup/restore)
├── types/              # TypeScript interfaces
└── utils/              # constants, formatMoney, generateId, quotes
```

---

## 🚀 Cài đặt & Chạy

```bash
# Clone repo
git clone https://github.com/gianghaison/lixi-app.git
cd lixi-app

# Cài dependencies
npm install

# Chạy development
npm run dev

# Build production
npm run build
```

---

## 🌙 Câu chuyện phát triển: Một đêm cùng Claude Code CLI

### Bối cảnh

Dự án **Hũ Lì Xì** được phát triển trong **một đêm** (12/02/2025) với sự hỗ trợ của **Claude Code CLI** - công cụ AI coding assistant của Anthropic. Mục tiêu là tạo một app quản lý tiền lì xì đơn giản, thân thiện cho trẻ em Việt Nam sử dụng trong dịp Tết Nguyên Đán.

### Claude Code CLI là gì?

Claude Code CLI là một công cụ dòng lệnh cho phép lập trình viên tương tác với Claude AI trực tiếp trong terminal. Thay vì copy-paste code qua lại, Claude Code có thể:

- **Đọc và hiểu toàn bộ codebase** của bạn
- **Viết, sửa, xóa file** trực tiếp
- **Chạy lệnh terminal** (npm, git, etc.)
- **Debug và fix lỗi** real-time
- **Tìm kiếm web** khi cần thông tin mới

### Cách sử dụng Claude Code CLI trong dự án này

#### 1. Khởi đầu với CLAUDE.md

Trước khi bắt đầu, tôi tạo file `CLAUDE.md` chứa toàn bộ spec của app:
- Mô tả tính năng chi tiết
- Data structure cho localStorage
- Mapping Rive animations
- Design system (màu sắc, font, spacing)
- Luồng người dùng

Claude đọc file này và hiểu được toàn bộ yêu cầu, từ đó code theo đúng spec.

#### 2. Phát triển theo từng giai đoạn

Tôi đưa ra yêu cầu bằng tiếng Việt, Claude thực hiện:

```
Tôi: "Tạo layout 3 tab với bottom navigation"
Claude: [Tạo BottomTabBar.tsx, AppContainer.tsx, cấu hình routing]

Tôi: "Form nhận lì xì cần có suggestions số tiền phổ biến"
Claude: [Tạo ReceiveLixiForm.tsx với AmountInput có preset buttons]

Tôi: "Thêm hiệu ứng pháo giấy khi vào tab Hũ Lì Xì"
Claude: [Tạo Confetti.tsx với 150 particles, trigger từ BottomTabBar]
```

#### 3. Fix bug real-time

Khi gặp lỗi, Claude phân tích và sửa ngay:

```
Lỗi: "localStorage quota exceeded khi lưu ảnh QR"
Claude: [Thêm function compressImage(), resize max 400px, JPEG 70%]

Lỗi: "TypeScript error: Element implicitly has 'any' type"
Claude: [Thêm Record<string, string> type cho typeLabels]
```

#### 4. Cải thiện UX theo feedback

```
Tôi: "Nút xóa QR dễ ấn nhầm, trẻ em hay lỡ tay"
Claude: [Implement 3-step delete: giữ 3 giây + popup + nhập tên]

Tôi: "Thêm tính năng backup dữ liệu"
Claude: [Thêm exportData(), importData(), UI sao lưu/khôi phục]
```

### Timeline chi tiết

| Thời gian | Giai đoạn | Công việc |
|-----------|-----------|-----------|
| 22:00 | Setup | Khởi tạo Vite + React + TypeScript, cài Tailwind CSS v4 |
| 22:30 | Data Layer | Thiết kế interfaces, tạo storage.ts với CRUD operations |
| 23:00 | UI Core | Layout 3 tab, BottomTabBar, AppContainer |
| 23:30 | Forms | ReceiveLixiForm, SpendForm, DepositForm với validations |
| 00:00 | Dashboard | BalanceSummary, TransactionList, ActionButtons |
| 00:30 | Auth | PasscodeScreen, SetupWizard, auto-lock sau 5 phút |
| 01:00 | QR Code | Upload ảnh, nén ảnh, lưu với tên chủ tài khoản |
| 01:30 | Mascot | Tích hợp Rive animation, BunnySpeechPopup |
| 02:00 | Articles | 7 bài viết giáo dục về app và phong tục Tết |
| 02:30 | Effects | Confetti, pulse animation, ripple waves |
| 03:00 | Security | Xác nhận xóa 2 bước (nhập text + mã PIN) |
| 03:30 | Onboarding | WelcomeScreen 5 slides cho người dùng mới |
| 04:00 | Deploy | Git init, push GitHub, deploy Vercel |
| 04:30 | Polish | 200 quotes, chi tiêu từ guardian, bảo vệ xóa QR 3 bước |
| 05:00 | Backup | Export/Import JSON, Umami analytics |

### Các vấn đề đã giải quyết

| Vấn đề | Nguyên nhân | Giải pháp |
|--------|-------------|-----------|
| localStorage quota exceeded | Ảnh QR quá lớn (2-5MB) | Nén ảnh: resize 400px, JPEG 70% quality |
| TypeScript export error | Type không được export | Thêm `export type BunnyAction` |
| Nút lưu QR không hoạt động | Submit form mặc định | Thêm `type="button"` cho button |
| NodeJS.Timeout error | Type không có trong browser | Dùng `ReturnType<typeof setTimeout>` |
| spend_from_guardian không có trong typeLabels | Type mới chưa được thêm | Cập nhật `Record<string, string>` |
| Tab mặc định sai | Logic khởi tạo | Đổi default từ 'dashboard' sang 'qr' |
| Trẻ em xóa nhầm QR | Nút xóa quá dễ bấm | Bảo vệ 3 bước: giữ 3s + popup + nhập tên |

### Những điều Claude Code CLI làm tốt

1. **Hiểu context tiếng Việt**: Tôi viết yêu cầu hoàn toàn bằng tiếng Việt, Claude hiểu và code đúng ý
2. **Giữ consistency**: Tự động tuân theo design system, naming convention đã có
3. **Fix lỗi nhanh**: Đọc error message, tìm root cause, sửa đúng chỗ
4. **Gợi ý cải thiện**: Đề xuất các biện pháp bảo vệ UX cho trẻ em
5. **Commit message rõ ràng**: Tự viết commit message mô tả đúng thay đổi

### Thống kê dự án

| Metric | Giá trị |
|--------|---------|
| Thời gian phát triển | ~7 giờ (một đêm) |
| Số files | 50+ files |
| Số dòng code | ~10,000 lines |
| Số commits | 15 commits |
| Số tính năng chính | 12 features |
| Số quotes giáo dục | 200 câu |
| Số bài viết | 7 bài |

---

## 🔮 Roadmap tương lai

- [ ] Sync dữ liệu với Firebase/Supabase
- [ ] Export báo cáo PDF
- [ ] Thêm nhiều mascot để chọn
- [ ] Mục tiêu tiết kiệm với progress bar
- [ ] Push notification nhắc nhở
- [ ] Dark mode
- [ ] PWA (Progressive Web App)

---

## 👨‍💻 Tác giả

**Giang Hai Son** - [huvang.vn](https://huvang.vn)

Phát triển với sự hỗ trợ của **Claude Code CLI** (claude-opus-4-5-20251101) by Anthropic

---

## 📄 License

MIT License - Tự do sử dụng và phát triển tiếp

---

## 🙏 Credits

- **Claude Code CLI** by Anthropic - AI pair programming
- Kawaii Emoji animation by Animoox_Studio (Rive)
- Icons: Native emoji
- Font: Nunito (Google Fonts)
- Analytics: Umami (privacy-focused)

---

## 💡 Bài học rút ra

1. **Chuẩn bị spec kỹ trước khi code**: File CLAUDE.md giúp AI hiểu đúng yêu cầu từ đầu
2. **Chia nhỏ công việc**: Yêu cầu từng feature một, review rồi tiếp tục
3. **Test ngay sau mỗi thay đổi**: Phát hiện bug sớm, sửa nhanh
4. **Nghĩ đến user (trẻ em)**: UX cần đơn giản, an toàn, khó thao tác nhầm
5. **Backup quan trọng**: localStorage có thể mất, cần tính năng export/import
