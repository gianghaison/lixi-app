export const AVATARS = ['👦', '👧', '👶', '🧒', '👼', '🐰', '🐱', '🐶'];

export const AMOUNT_SUGGESTIONS = [10000, 20000, 50000, 100000, 200000, 500000];

export const GUARDIAN_SUGGESTIONS = ['Bố', 'Mẹ', 'Ông', 'Bà', 'Cô', 'Chú', 'Dì'];

export const LOCK_TIMEOUT_MS = 5 * 60 * 1000; // 5 phút

export const STORAGE_KEY = 'lixi_app_data';

export const BUNNY_MESSAGES = {
  receive_start: 'Suỵt! Có ai xung quanh không? Đếm tiền lì xì phải kín đáo nha! 🤫',
  receive_success: (name: string) => `Ghi xong rồi! Nhớ nói cảm ơn ${name} nha! 🙏`,
  spend_warning: 'Khoan đã! Chi tiêu cần suy nghĩ kỹ nha. Hỏi ba mẹ trước khi tiêu tiền nhé! 🤔',
  spend_success: 'Đã ghi nhận! Nhớ tiết kiệm nha, đừng lãng phí vào những thứ vô ích! 💪',
  deposit_start: 'Giỏi lắm! Đưa tiền cho người lớn giữ là thông minh nhất đó! Ba mẹ sẽ giữ an toàn cho con! 👍',
  deposit_success: (name: string) => `Đã gửi ${name} giữ hộ rồi! Yên tâm nha! 🎉`,
  milestone: 'Wow! Con đã tiết kiệm được nhiều lắm rồi đó! Tiếp tục phát huy nha! 🌟',
};
