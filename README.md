# 🧧 Hũ Lì Xì

> App quản lý tiền lì xì cho trẻ em Việt Nam, dịp Tết Nguyên Đán

**Live Demo:** https://lixi.huvang.vn

![Hũ Lì Xì Banner](https://img.shields.io/badge/Made%20with-React%20%2B%20TypeScript-blue) ![Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC) ![Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF)

---

## 📱 Tính năng chính

### 🎁 Quản lý tiền lì xì
- **Nhận lì xì**: Ghi nhận số tiền và tên người tặng
- **Chi tiêu**: Theo dõi các khoản chi với lời nhắc tiết kiệm
- **Gửi giữ hộ**: Gửi tiền cho bố mẹ/ông bà giữ hộ an toàn
- **Nhận lại**: Rút tiền từ người giữ hộ khi cần

### 📲 Mã QR nhận tiền
- Upload nhiều mã QR ngân hàng
- Gắn tên chủ tài khoản cho mỗi mã QR
- Khi nhận lì xì qua QR → tự động ghi nhận người đó giữ hộ
- Hiển thị mã QR to cho người lớn quét chuyển tiền

### 👨‍👩‍👧‍👦 Hỗ trợ nhiều bé
- Tạo hồ sơ riêng cho từng bé với avatar cute
- Chuyển đổi giữa các bé dễ dàng
- Mỗi bé có lịch sử giao dịch và hũ tiền riêng

### 👋 Màn hình chào mừng (Onboarding)
- 5 slide giới thiệu app cho người dùng mới
- Giải thích mục đích: hỗ trợ bé quản lý tiền lì xì
- Thông báo về lưu trữ local, không kết nối ngân hàng
- Cảnh báo về các trường hợp mất dữ liệu
- Lần đầu → vào Dashboard xem tính năng chính
- Các lần sau → vào QR Code để giữ riêng tư

### 🔐 Bảo mật
- Mã PIN 4 số bảo vệ dữ liệu
- Tự động khóa sau 5 phút không hoạt động
- Xác nhận xóa bé: nhập tên + mã PIN
- Xác nhận xóa dữ liệu: nhập "XÓA HẾT" + mã PIN

### 🎨 Giao diện thân thiện trẻ em
- Màu sắc tươi sáng, pastel dễ thương
- Font chữ to, dễ đọc
- Nút bấm lớn, dễ chạm
- Hiệu ứng pháo giấy khi vào Hũ Lì Xì
- Nút Hũ Lì Xì có hiệu ứng sóng lan tỏa

### 📚 Bài viết giáo dục
- Giới thiệu về Hũ Lì Xì
- Hướng dẫn ba mẹ dạy con chi tiêu
- Ý nghĩa của việc tiết kiệm
- Phong tục lì xì Việt Nam
- Tết Nguyên Đán và màu sắc ngày Tết

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

---

## 📁 Cấu trúc thư mục

```
src/
├── components/
│   ├── auth/           # WelcomeScreen, PasscodeScreen, SetupWizard
│   ├── bunny/          # BunnyMascot, SpeechBubble
│   ├── common/         # Modal, Confetti, MoneyDisplay
│   ├── dashboard/      # BalanceSummary, ActionButtons, TransactionList
│   ├── forms/          # ReceiveLixiForm, SpendForm, DepositForm
│   ├── layout/         # AppContainer, BottomTabBar
│   └── tabs/           # QRCodeTab, DashboardTab, SettingsTab
├── hooks/              # useBunny
├── services/           # storage.ts (data layer)
├── types/              # TypeScript interfaces
└── utils/              # constants, formatMoney, generateId
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

## 📝 Nhật ký phát triển (12/02/2025)

### Bối cảnh
Dự án được phát triển trong một đêm với sự hỗ trợ của **Claude Code CLI** (Anthropic). Mục tiêu là tạo một app quản lý tiền lì xì đơn giản, thân thiện cho trẻ em Việt Nam sử dụng trong dịp Tết.

### Timeline phát triển

#### 🌙 Giai đoạn 1: Thiết lập cơ bản
- Khởi tạo project với Vite + React + TypeScript
- Cài đặt Tailwind CSS v4
- Thiết kế data structure cho localStorage
- Tạo file `CLAUDE.md` chứa toàn bộ spec của app

#### 🎨 Giai đoạn 2: UI/UX Core
- Tạo layout 3 tab: QR Code, Hũ Lì Xì, Cài đặt
- Thiết kế màu sắc pastel phù hợp trẻ em
- Xây dựng BottomTabBar với nút Hũ Lì Xì nổi bật
- Tích hợp Rive animation cho mascot

#### 💰 Giai đoạn 3: Tính năng chính
- Form nhận lì xì với suggestions số tiền
- Form chi tiêu với cảnh báo
- Form gửi giữ hộ với danh sách người giữ
- Lịch sử giao dịch với icon theo loại
- Tính toán số dư tự động

#### 🔐 Giai đoạn 4: Bảo mật
- Passcode 4 số với UI kiểu iOS
- Setup wizard cho lần đầu sử dụng
- Auto-lock sau 5 phút không hoạt động
- Flow đổi mã PIN an toàn

#### 📲 Giai đoạn 5: Mã QR nâng cao
- Hỗ trợ upload nhiều mã QR
- Nén ảnh để tránh vượt quota localStorage
- Gắn tên chủ tài khoản cho mỗi QR
- Tích hợp với form nhận lì xì: chọn QR → tự động gửi giữ hộ

#### 📚 Giai đoạn 6: Nội dung giáo dục
- Thêm 7 bài viết về app và phong tục Tết
- Modal đọc bài viết với format đẹp
- Phân loại: bài về app vs bài về Tết

#### ✨ Giai đoạn 7: Hiệu ứng & Polish
- Hiệu ứng pháo giấy 150 mảnh khi vào Hũ Lì Xì
- Nút Hũ Lì Xì với pulse animation và ripple waves
- Cải thiện icons cho các nút action
- Thêm thông báo quyền riêng tư và cảnh báo mất dữ liệu

#### 🛡 Giai đoạn 8: An toàn dữ liệu
- Xác nhận xóa bé: nhập tên bé + mã PIN
- Xác nhận xóa dữ liệu: nhập "XÓA HẾT" + mã PIN
- Thông báo về lưu trữ local và các trường hợp mất dữ liệu
- Hướng dẫn cho bố mẹ về thêm bé

#### 👋 Giai đoạn 9: Onboarding Experience
- Tạo màn hình chào mừng 5 slide
- Giải thích mục đích app và cách lưu trữ dữ liệu
- Logic chuyển tab: lần đầu → Dashboard, sau đó → QR Code
- Trải nghiệm người dùng mới mượt mà

#### 🚀 Giai đoạn 10: Deploy
- Khởi tạo Git repository
- Push lên GitHub
- Deploy lên Vercel
- Cấu hình domain lixi.huvang.vn

### Các vấn đề đã giải quyết

| Vấn đề | Giải pháp |
|--------|-----------|
| localStorage quota exceeded khi lưu ảnh QR | Nén ảnh xuống max 400px, JPEG 70% quality |
| TypeScript export error | Thêm export type BunnyAction |
| Nút lưu QR không hoạt động | Thêm `type="button"` và try-catch |
| Tab mặc định cần là QR (không cần passcode) | Đổi default state từ 'dashboard' sang 'qr' |

### Công cụ sử dụng
- **Claude Code CLI** (claude-opus-4-5-20251101): AI assistant cho coding
- **VS Code**: Code editor
- **Git Bash**: Terminal
- **Vercel**: Hosting & deployment

### Thống kê
- **Thời gian phát triển**: ~5-6 giờ
- **Số file tạo mới**: 48 files
- **Số dòng code**: ~8,000 lines
- **Số commit**: 5

---

## 🔮 Roadmap tương lai

- [ ] Sync dữ liệu với Firebase
- [ ] Export báo cáo PDF
- [ ] Thêm nhiều mascot để chọn
- [ ] Mục tiêu tiết kiệm với progress bar
- [ ] Push notification nhắc nhở
- [ ] Dark mode

---

## 👨‍💻 Tác giả

**Giang Hai Son** - [huvang.vn](https://huvang.vn)

Phát triển với sự hỗ trợ của **Claude Code** by Anthropic

---

## 📄 License

MIT License - Tự do sử dụng và phát triển tiếp

---

## 🙏 Credits

- Kawaii Emoji animation by Animoox_Studio (Rive)
- Icons: Native emoji
- Font: Nunito (Google Fonts)
