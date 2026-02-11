# LÌ XÍ APP — claude.md

## Tổng quan
App quản lý tiền lì xì cho trẻ em Việt Nam, dịp Tết.
- Domain: lixi.huvang.vn
- Target: Trẻ em từ 6 tuổi (dùng điện thoại bố mẹ)
- Nhiều bé trên 1 thiết bị
- 100% tiếng Việt, chữ to, giao diện vui tươi
- Lưu trữ: localStorage (MVP), thiết kế data layer tách riêng để sau migrate Firebase dễ dàng
- KHÔNG cần backend, KHÔNG cần auth Firebase

## Tech Stack
- React 18 + TypeScript
- Vite
- Tailwind CSS
- @rive-app/react-canvas (cho nhân vật hoạt hình)
- localStorage (data storage)

## File Rive
- File: `public/bunny.riv` (ĐÃ CÓ SẴN trong thư mục public/)
- Đây là file Interactive Bunny Character từ Rive Marketplace
- Artboard: "Artboard"
- State Machine: "State Machine 1"

### Rive States & Inputs có sẵn:
| Tên | Loại | Mô tả |
|-----|------|-------|
| Idle Loop | State | Đứng yên, chớp mắt |
| Idle to Pose 1 | Transition | Rút sổ + bút ra |
| Pose 1 loop | State | Cầm sổ đứng yên |
| Kedip | State | Chớp mắt |
| WALK | State | Đi bộ |
| 01 Wave 1 | State | Vẫy tay |
| 01 Wave 2 | State | Vẫy tay kiểu 2 |
| X | Number Input | Joystick hướng nhìn ngang |
| Y | Number Input | Joystick hướng nhìn dọc |

### Lưu ý quan trọng về Rive:
- Artboard có chứa các nút tròn xanh (UI buttons) và Joystick control — KHÔNG hiển thị chúng. Chỉ render phần nhân vật bunny thôi, crop/fit để ẩn các nút và joystick thừa.
- Trigger states bằng code JS, không dùng nút trong file Rive.
- Dùng `useRive` hook từ `@rive-app/react-canvas`.
- Nếu không detect được tên state/input chính xác, dùng API `stateMachineInputs()` để liệt kê tất cả inputs có trong file và log ra console để debug.

### Mapping states theo hành động trong app:
| Hành động app | Rive animation |
|---------------|----------------|
| Dashboard (idle) | Idle Loop |
| Mở form nhận lì xì | Set X input lắc trái phải (ngó xung quanh) |
| Nhận lì xì thành công | 01 Wave 1 → Idle to Pose 1 → Pose 1 loop (vẫy tay rồi rút sổ ghi chép) |
| Chi tiêu (cảnh báo) | Set X input lắc nhanh trái phải + hiển thị speech bubble cảnh báo |
| Gửi tiền cho bố mẹ giữ | 01 Wave 2 (vẫy tay khen ngợi) |
| Đạt mốc tiền | WALK → 01 Wave 1 (đi tới rồi vẫy) |

## Cấu trúc 3 Tab chính (Bottom Navigation)

### Tab 1: QR Code (icon: QR code)
- Cho bé upload ảnh QR code tài khoản ngân hàng (lưu vào localStorage dạng base64)
- Background: theme ngày Tết — hình bao lì xì, hoa đào, hoa mai, pháo
- Hiển thị ảnh QR to ở giữa để người lớn quét chuyển tiền
- Nếu chưa có QR: hiển thị nút "Thêm mã QR" + hướng dẫn
- Tab này KHÔNG yêu cầu passcode

### Tab 2: Hũ Lì Xì — Dashboard chính (icon: 🧧 hoặc hũ tiền)
- **YÊU CẦU PASSCODE** khi mở (nếu không truy cập sau 5 phút)
- Đây là tab mặc định khi mở app
- Layout từ trên xuống:
  1. Tên bé (có thể switch giữa các bé nếu có nhiều bé)
  2. **Tổng số tiền** — text TO NHẤT, font 32-40px, màu đỏ/vàng Tết
  3. **Đang giữ:** xxx,xxxđ (tiền bé chưa gửi ai)
  4. **[Tên người] giữ hộ:** xxx,xxxđ (ví dụ: "Mẹ giữ hộ: 2,000,000đ")
  5. 3 nút hành động:
     - **[🧧 Nhận lì xì]** — màu đỏ, nổi bật nhất
     - **[💸 Chi tiêu]** — màu cam
     - **[🏦 Gửi giữ hộ]** — màu xanh lá
  6. **Lịch sử giao dịch** — danh sách scroll, mỗi item: icon + mô tả + số tiền + ngày
  7. **Bunny mascot** — góc dưới phải, 100-120px, nổi trên content

### Tab 3: Cài đặt (icon: ⚙️)
- **YÊU CẦU PASSCODE** khi mở (nếu không truy cập sau 5 phút)
- Danh sách các bé (thêm/sửa/xóa)
- Đặt/đổi passcode 4 số
- Xóa dữ liệu
- Credit: "Nhân vật Bunny by pixelmove (CC BY)"
- Phiên bản app

## Tính năng chi tiết

### Thêm bé
- Nhập tên bé
- Chọn avatar (emoji: 👦👧👶🧒 hoặc có sẵn vài avatar cute)
- Bé đầu tiên tạo cùng lúc đặt passcode

### Nhận lì xì
1. Bunny ngó trái phải (animation look_around) + speech bubble: "Psst! Có ai xung quanh không? Đếm tiền lì xì phải kín đáo nha! 🤫"
2. Form nhập:
   - Số tiền: input số + **label suggestions** để chọn nhanh: 10,000 | 20,000 | 50,000 | 100,000 | 200,000 | 500,000
   - Ghi chú: ai lì xì (ví dụ: "Bà ngoại", "Chú Tư")
3. Bấm xác nhận → Bunny vẫy tay → rút sổ ghi chép
4. Speech bubble: "Ghi xong rồi! Nhớ nói cảm ơn [tên người lì xì] nha! 🙏"
5. Số tiền tự động cộng vào "Đang giữ"

### Chi tiêu
1. Bunny lắc đầu + speech bubble: "Khoan đã! Chi tiêu cần suy nghĩ kỹ nha. Hỏi ba mẹ trước khi tiêu tiền nhé! 🤔"
2. Form nhập:
   - Số tiền chi tiêu (phải ≤ số tiền đang giữ)
   - Lý do chi tiêu (text input)
3. Bấm xác nhận → trừ tiền từ "Đang giữ"
4. Speech bubble: "Đã ghi nhận! Nhớ tiết kiệm nha, đừng lãng phí vào những thứ vô ích! 💪"

### Gửi giữ hộ
1. Bunny vẫy tay khen + speech bubble: "Giỏi lắm! Đưa tiền cho người lớn giữ là thông minh nhất đó! Ba mẹ sẽ giữ an toàn cho con! 👍"
2. Form nhập:
   - Số tiền gửi (phải ≤ số tiền đang giữ)
   - Người giữ hộ (suggestions: Bố, Mẹ, Ông, Bà + custom input)
3. Bấm xác nhận → trừ "Đang giữ", cộng vào "[Người] giữ hộ"

### Passcode
- 4 chữ số
- Hiển thị 4 ô tròn (kiểu iOS)
- Tự động submit khi nhập đủ 4 số
- Lock sau 5 phút không tương tác (chỉ Tab 2 và Tab 3)
- Lần đầu mở app → bắt buộc tạo passcode + thêm bé đầu tiên

## Data Structure (localStorage)

```typescript
interface LixiApp {
  passcode: string; // 4 digits
  activeChildId: string;
  children: Child[];
  lastActiveTimestamp: number; // cho auto-lock 5 phút
}

interface Child {
  id: string;
  name: string;
  avatar: string; // emoji
  qrCodeImage?: string; // base64
  transactions: Transaction[];
  guardians: Guardian[]; // người giữ hộ
}

interface Transaction {
  id: string;
  type: 'receive' | 'spend' | 'deposit'; // nhận lì xì | chi tiêu | gửi giữ hộ
  amount: number;
  note: string; // ai lì xì / lý do chi tiêu / gửi cho ai
  date: string; // ISO string
  guardian?: string; // tên người giữ hộ (khi type = 'deposit')
}

interface Guardian {
  name: string;
  amount: number; // tổng tiền đang giữ
}
```

### Data Layer:
- Tạo file `src/services/storage.ts` — tất cả CRUD operations qua file này
- KHÔNG gọi localStorage trực tiếp từ components
- Mục đích: sau này swap localStorage → Firebase Firestore chỉ cần sửa 1 file

## Design & UI

### Theme Tết
- Màu chính: Đỏ (#DC2626), Vàng (#F59E0B), cam nhạt
- Background: gradient nhẹ, có pattern hoa đào/mai subtle
- Font: rounded, friendly — dùng Google Fonts "Nunito" hoặc "Quicksand"
- Chữ to: body 16-18px, heading 24-32px, số tiền 32-40px
- Border radius lớn (12-16px) — bo tròn mềm mại
- Nút bấm lớn, dễ chạm (min height 48px)
- Format tiền: dùng dấu chấm phân cách (1.000.000đ), luôn có "đ" ở cuối

### Bunny Mascot
- Vị trí: góc dưới phải, fixed position
- Kích thước: 100-120px
- Khi có thông báo: bunny + speech bubble hiện popup giữa màn hình (overlay), tap để đóng
- Speech bubble: nền trắng, bo tròn, có đuôi chỉ về bunny, chữ 14-16px
- Sau 3 giây speech bubble tự đóng hoặc tap để đóng

### Bottom Tab Bar
- 3 tabs, fixed bottom
- Tab active: icon đổi màu đỏ + label bold
- Height: 60-64px
- Icons lớn, rõ ràng
- Labels: "QR Code" | "Hũ Lì Xì" | "Cài đặt"

## Responsive
- Mobile-first (320px - 428px)
- Max-width: 480px, center trên tablet/desktop
- Touch-friendly: tất cả nút ≥ 48px

## Lưu ý cho Claude Code CLI
1. Khởi tạo project bằng: `npm create vite@latest . -- --template react-ts`
2. File bunny.riv ĐÃ CÓ SẴN trong `public/bunny.riv` — không cần download
3. Install packages: `npm install @rive-app/react-canvas`
4. Dùng Tailwind CSS v4 (mới nhất)
5. KHÔNG dùng React Router — dùng state để switch tabs
6. Tất cả text tiếng Việt, không có tiếng Anh trong UI
7. Format tiền Việt: `new Intl.NumberFormat('vi-VN').format(amount) + 'đ'`
8. Test kỹ passcode flow: lần đầu → tạo passcode + tên bé → vào app
9. Khi build xong chạy `npm run build`, output trong `dist/`
10. Nếu Rive state names không khớp chính xác, dùng `rive.stateMachineInputs('State Machine 1')` để liệt kê tất cả inputs và log ra console
