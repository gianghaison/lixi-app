# Một Đêm Xây Dựng App "Hũ Lì Xì" Cùng Claude Code CLI

> Hành trình phát triển ứng dụng quản lý tiền lì xì cho trẻ em trong 7 giờ với sự hỗ trợ của AI

**Tác giả:** Giang Hai Son
**Ngày:** 12/02/2025
**Demo:** https://lixi.huvang.vn

---

## Mở đầu: Ý tưởng từ mùa Tết

Tết Nguyên Đán là dịp các bé nhận được rất nhiều tiền lì xì. Nhưng có một vấn đề quen thuộc trong nhiều gia đình Việt Nam: "Con ơi, để mẹ giữ tiền lì xì cho!" - và rồi số tiền đó... biến mất vào hư không.

Là một lập trình viên và cũng là người hay quan sát hành vi của trẻ em với tiền bạc, tôi nghĩ: **Tại sao không tạo một app giúp các bé tự quản lý tiền lì xì của mình?** App này sẽ:

- Giúp bé ghi chép tiền nhận được
- Nhắc nhở bé suy nghĩ trước khi chi tiêu
- Cho phép bé "gửi" tiền cho bố mẹ giữ hộ (có ghi nhận rõ ràng!)
- Dạy bé về giá trị của tiết kiệm

Và quan trọng nhất: **Tôi muốn hoàn thành nó trong một đêm** - kịp trước Tết để các bé có thể sử dụng.

---

## Vũ khí bí mật: Claude Code CLI

### Claude Code CLI là gì?

**Claude Code CLI** là công cụ dòng lệnh của Anthropic, cho phép bạn "pair programming" với Claude AI ngay trong terminal. Khác với việc chat qua web rồi copy-paste code, Claude Code có thể:

- 📂 **Đọc toàn bộ codebase** của bạn
- ✏️ **Viết, sửa, xóa file** trực tiếp
- 💻 **Chạy lệnh terminal** (npm install, git commit, etc.)
- 🔍 **Tìm kiếm web** khi cần thông tin mới
- 🐛 **Debug và fix lỗi** ngay lập tức

### Tại sao chọn Claude Code CLI?

Trước đây, khi dùng ChatGPT hay Claude web để code, quy trình thường là:
1. Mô tả yêu cầu
2. Nhận code
3. Copy vào project
4. Chạy thử → Lỗi
5. Copy lỗi vào chat
6. Nhận code sửa
7. Lặp lại...

Với Claude Code CLI, quy trình trở thành:
1. Mô tả yêu cầu
2. Claude tự đọc code hiện tại, viết file, chạy thử
3. Nếu lỗi, Claude tự đọc lỗi và sửa
4. Xong!

**Tiết kiệm được 70-80% thời gian** so với cách truyền thống.

---

## Bước 0: Chuẩn bị - File CLAUDE.md

Trước khi bắt tay vào code, tôi dành 30 phút viết file `CLAUDE.md` - một "bản thiết kế" chi tiết cho Claude đọc:

```markdown
# LÌ XÍ APP — claude.md

## Tổng quan
App quản lý tiền lì xì cho trẻ em Việt Nam, dịp Tết.
- Target: Trẻ em từ 6 tuổi
- 100% tiếng Việt, chữ to, giao diện vui tươi
- Lưu trữ: localStorage

## Tech Stack
- React 18 + TypeScript
- Vite
- Tailwind CSS v4
- @rive-app/react-canvas (cho nhân vật hoạt hình)

## Cấu trúc 3 Tab
1. QR Code - Hiển thị mã QR nhận tiền
2. Hũ Lì Xì - Dashboard chính
3. Cài đặt - Quản lý bé, đổi PIN

## Data Structure
interface Child {
  id: string;
  name: string;
  avatar: string;
  transactions: Transaction[];
  guardians: Guardian[];
}
...
```

**Bài học quan trọng:** Càng mô tả chi tiết trong file này, Claude càng code đúng ý bạn từ đầu. Đừng tiếc thời gian viết spec!

---

## Hành trình 7 giờ

### ⏰ 22:00 - Khởi động

Tôi mở terminal và gõ:

```bash
claude
```

Sau đó bắt đầu:

```
Tôi: Khởi tạo project React với Vite và TypeScript,
     cài Tailwind CSS v4, tạo cấu trúc thư mục theo CLAUDE.md
```

**3 phút sau**, Claude đã:
- Chạy `npm create vite@latest`
- Cài đặt dependencies
- Cấu hình Tailwind CSS
- Tạo folder structure

Tôi không cần nhớ lệnh nào, không cần Google "how to setup Tailwind with Vite 2024". Claude làm hết.

### ⏰ 22:30 - Data Layer

```
Tôi: Tạo file storage.ts với các functions để lưu/đọc dữ liệu
     từ localStorage theo interface đã định nghĩa
```

Claude tạo ra một file `storage.ts` hoàn chỉnh với:
- `getAppData()`, `saveAppData()`
- `addChild()`, `updateChild()`, `deleteChild()`
- `addTransaction()`, `getTransactions()`
- `calculateBalances()` - tính tổng tiền tự động

**Điều tôi thích:** Claude tự thêm các edge cases mà tôi chưa nghĩ tới, như kiểm tra null, xóa guardian khi số tiền về 0.

### ⏰ 23:00 - Giao diện cơ bản

```
Tôi: Tạo layout 3 tab với bottom navigation,
     tab Hũ Lì Xì ở giữa phải nổi bật hơn, to hơn
```

Claude tạo `BottomTabBar.tsx` với:
- 3 tab responsive
- Nút giữa to hơn, có gradient
- Icon và label cho từng tab
- Active state với màu đổi

### ⏰ 23:30 - Forms nhập liệu

```
Tôi: Form nhận lì xì cần có suggestions số tiền phổ biến:
     10,000 | 20,000 | 50,000 | 100,000 | 200,000 | 500,000
```

Claude hiểu ngay và tạo component `AmountInput.tsx` với các nút preset. Khi bấm nút, số tiền tự động điền vào input.

### ⏰ 00:00 - Dashboard

Đây là phần phức tạp nhất:

```
Tôi: Dashboard hiển thị:
     - Tên bé (có thể switch nếu nhiều bé)
     - Tổng tiền lì xì (chữ TO, màu đỏ)
     - Tiền đang giữ
     - Tiền từng người giữ hộ (kèm nút "Nhận lại")
     - 3 nút: Nhận lì xì, Chi tiêu, Gửi giữ hộ
     - Lịch sử giao dịch
```

Claude tạo ra 5 components:
- `BalanceSummary.tsx`
- `ActionButtons.tsx`
- `TransactionList.tsx`
- `ChildSelector.tsx`

Tất cả kết nối với nhau hoàn hảo.

### ⏰ 00:30 - Bảo mật

```
Tôi: Thêm màn hình nhập mã PIN 4 số kiểu iOS,
     tự động lock sau 5 phút không hoạt động
```

Claude tạo:
- `PasscodeScreen.tsx` với 4 ô tròn
- `NumericKeypad.tsx` bàn phím số
- Logic auto-lock với `lastActiveTimestamp`

### ⏰ 01:00 - Tính năng QR Code

```
Tôi: Tab QR cho phép upload nhiều ảnh QR,
     mỗi QR gắn với tên chủ tài khoản (Bố, Mẹ, Ông, Bà...)
```

**Vấn đề phát sinh:** Khi lưu ảnh base64 vào localStorage, báo lỗi "quota exceeded" vì ảnh quá lớn (2-5MB).

```
Tôi: Lỗi localStorage quota exceeded khi lưu ảnh QR
```

**Claude phân tích và sửa ngay:**
```typescript
const compressImage = (file: File, maxWidth = 400, quality = 0.7) => {
  // Resize ảnh xuống max 400px
  // Chuyển sang JPEG với quality 70%
  // Giảm từ 2-5MB xuống còn 20-50KB
}
```

### ⏰ 01:30 - Nhân vật hoạt hình

Tôi có sẵn file Rive animation (nhân vật bunny dễ thương). Claude tích hợp nó vào app với các speech bubbles:

- Khi nhận lì xì: "Suỵt! Có ai xung quanh không? Đếm tiền phải kín đáo nha! 🤫"
- Khi chi tiêu: "Khoan đã! Hỏi ba mẹ trước khi tiêu tiền nhé! 🤔"
- Khi gửi tiền: "Giỏi lắm! Đưa tiền cho người lớn giữ là thông minh nhất đó! 👍"

### ⏰ 02:00 - Nội dung giáo dục

```
Tôi: Thêm 7 bài viết về app và phong tục Tết,
     hiển thị trong tab QR Code
```

Claude viết 7 bài viết hoàn chỉnh:
1. Giới thiệu về Hũ Lì Xì
2. Hướng dẫn ba mẹ dạy con chi tiêu
3. Ý nghĩa của việc tiết kiệm
4. Phong tục lì xì của người Việt
5. Tết Nguyên Đán - Ngày hội lớn nhất
6. Màu đỏ và vàng ngày Tết
7. Tầm quan trọng của dạy bé tiết kiệm

### ⏰ 02:30 - Hiệu ứng

```
Tôi: Thêm hiệu ứng pháo giấy khi vào tab Hũ Lì Xì,
     nút Hũ Lì Xì có hiệu ứng pulse và ripple
```

Claude tạo `Confetti.tsx` với 150 mảnh giấy rơi, và CSS animations cho nút.

### ⏰ 03:00 - An toàn dữ liệu

```
Tôi: Xác nhận xóa bé phải nhập tên bé + mã PIN
     Xác nhận xóa toàn bộ dữ liệu phải nhập "XÓA HẾT" + mã PIN
```

Bảo vệ 2 lớp để tránh xóa nhầm.

### ⏰ 03:30 - Onboarding

```
Tôi: Thêm màn hình chào mừng 5 slide cho người dùng lần đầu
```

Claude tạo `WelcomeScreen.tsx` với carousel đẹp, giải thích mục đích app và cảnh báo về mất dữ liệu.

### ⏰ 04:00 - Deploy

```
Tôi: Khởi tạo git, push lên GitHub, hướng dẫn deploy Vercel
```

Claude chạy các lệnh git, tôi connect với Vercel, và app đã live!

### ⏰ 04:30 - Polish

Sau khi test, tôi phát hiện thêm vấn đề:

```
Tôi: Nút xóa QR dễ ấn nhầm, trẻ em hay lỡ tay
```

Claude đề xuất và implement **bảo vệ 3 bước**:
1. Giữ nút 3 giây (có thanh progress)
2. Hiện popup xác nhận
3. Nhập đúng tên chủ tài khoản mới xóa được

```
Tôi: Thêm 200 câu quotes giáo dục hiển thị trên Dashboard
```

Claude tìm kiếm web về ca dao tục ngữ Việt Nam, kết hợp với các câu châm ngôn về tiết kiệm, học hành, lễ phép, tạo ra 200 câu quotes chia theo chủ đề.

### ⏰ 05:00 - Backup & Analytics

```
Tôi: Thêm tính năng sao lưu/khôi phục dữ liệu bằng file JSON
```

Tính năng Export/Import để người dùng có thể backup dữ liệu vào Google Drive.

```
Tôi: Nhúng mã Umami analytics
```

Thêm tracking để theo dõi lượng truy cập.

---

## Kết quả sau 7 giờ

### Thống kê

| Metric | Giá trị |
|--------|---------|
| Thời gian phát triển | 7 giờ |
| Số files | 50+ |
| Số dòng code | ~10,000 |
| Số commits | 15 |
| Số tính năng | 12 |
| Số bài viết | 7 |
| Số quotes | 200 |

### Tính năng hoàn chỉnh

✅ Quản lý tiền lì xì (nhận, chi, gửi, rút)
✅ Hỗ trợ nhiều bé
✅ Mã QR nhận tiền (nhiều QR, gắn tên chủ)
✅ Bảo mật mã PIN + auto-lock
✅ Onboarding 5 slides
✅ Bài viết giáo dục
✅ 200 quotes hiển thị ngẫu nhiên
✅ Hiệu ứng pháo giấy
✅ Sao lưu/khôi phục dữ liệu
✅ Analytics
✅ Deploy live

---

## Các vấn đề đã xử lý

| Vấn đề | Giải pháp |
|--------|-----------|
| Ảnh QR quá lớn, vượt quota localStorage | Nén ảnh: resize 400px, JPEG 70% |
| TypeScript báo lỗi type | Thêm `Record<string, string>`, export type |
| Nút lưu QR không hoạt động | Thêm `type="button"` tránh submit form |
| `NodeJS.Timeout` không có trong browser | Dùng `ReturnType<typeof setTimeout>` |
| Trẻ em xóa nhầm QR | Bảo vệ 3 bước: giữ 3s + popup + nhập tên |

---

## Bài học rút ra

### 1. Chuẩn bị spec kỹ trước khi code

File `CLAUDE.md` là yếu tố quyết định. Càng chi tiết, Claude càng hiểu đúng. Đừng ngại viết dài!

### 2. Chia nhỏ công việc

Thay vì nói "làm app quản lý tiền", hãy chia thành:
- "Tạo layout 3 tab"
- "Thêm form nhận lì xì"
- "Hiển thị lịch sử giao dịch"

Claude làm từng phần tốt hơn là làm hết một lúc.

### 3. Test ngay, fix ngay

Mỗi tính năng hoàn thành, tôi test ngay. Nếu có bug, báo Claude fix luôn. Đừng để dồn bug đến cuối.

### 4. Nghĩ đến người dùng

Người dùng là trẻ em → UX phải:
- Nút to, dễ bấm
- Chữ to, dễ đọc
- Khó thao tác nhầm (xác nhận nhiều bước)
- Có hình ảnh vui nhộn

### 5. Claude Code CLI không thay thế lập trình viên

Claude code rất nhanh, nhưng bạn vẫn cần:
- Hiểu yêu cầu và thiết kế
- Review code Claude viết
- Quyết định UX/UI
- Test và phát hiện edge cases

**Claude là "junior dev siêu nhanh"**, còn bạn là "senior dev chỉ đạo".

---

## Kết luận

**7 giờ** để xây dựng một app hoàn chỉnh với 12 tính năng, 10,000 dòng code - điều này gần như không thể nếu không có AI.

Claude Code CLI đã thay đổi cách tôi làm việc:
- Không cần Google từng thứ nhỏ
- Không cần nhớ syntax
- Không cần copy-paste qua lại
- Tập trung vào **ý tưởng** thay vì **implementation**

Nếu bạn là lập trình viên, tôi khuyên bạn thử Claude Code CLI. Nó không thay thế bạn, nhưng nó **nhân bản năng suất của bạn lên gấp nhiều lần**.

---

**App Hũ Lì Xì:** https://lixi.huvang.vn
**Source code:** https://github.com/gianghaison/lixi-app
**Claude Code CLI:** https://claude.ai/code

*Chúc các bé Tết vui vẻ và biết tiết kiệm! 🧧*

---

*Giang Hai Son - 12/02/2025*
