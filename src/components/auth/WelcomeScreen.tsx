import { useState } from 'react';

interface WelcomeScreenProps {
  onComplete: () => void;
}

const slides = [
  {
    emoji: '🧧',
    title: 'Chào mừng đến với Hũ Lì Xì!',
    content: 'Đây là ứng dụng nhỏ giúp hỗ trợ bé quản lý tiền lì xì, dạy cho bé hiểu thêm về tài chính và chi tiêu.',
  },
  {
    emoji: '📝',
    title: 'Ghi chép đơn giản',
    content: 'Bé có thể ghi lại tiền lì xì nhận được, theo dõi chi tiêu, và gửi tiền cho bố mẹ giữ hộ. Tất cả trong một ứng dụng dễ sử dụng!',
  },
  {
    emoji: '🔒',
    title: 'An toàn & Riêng tư',
    content: 'Dữ liệu được lưu trữ hoàn toàn trên thiết bị của bạn. Ứng dụng không kết nối đến tài khoản ngân hàng, không gửi dữ liệu đến máy chủ.',
  },
  {
    emoji: '⚠️',
    title: 'Lưu ý quan trọng',
    content: 'Đây chỉ là ứng dụng hỗ trợ ghi chép. Dữ liệu sẽ mất đi nếu bạn xóa cache trình duyệt, đổi trình duyệt, hoặc dùng chế độ ẩn danh.',
  },
  {
    emoji: '👨‍👩‍👧',
    title: 'Dành cho cả gia đình',
    content: 'Bố mẹ có thể tạo hồ sơ riêng cho từng bé, theo dõi và hướng dẫn con cách quản lý tiền một cách vui vẻ!',
  },
];

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const isLastSlide = currentSlide === slides.length - 1;

  const handleNext = () => {
    if (isLastSlide) {
      onComplete();
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen tet-background flex flex-col">
      {/* Skip button */}
      <div className="flex justify-end p-4">
        <button
          onClick={handleSkip}
          className="text-gray-500 hover:text-gray-700 text-sm font-medium"
        >
          Bỏ qua
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="text-8xl mb-8 animate-bounce-in">
          {slide.emoji}
        </div>

        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
          {slide.title}
        </h1>

        <p className="text-gray-600 text-center text-lg leading-relaxed max-w-sm">
          {slide.content}
        </p>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mb-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide
                ? 'w-6 bg-pink-500'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Button */}
      <div className="px-6 pb-8">
        <button
          onClick={handleNext}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all"
        >
          {isLastSlide ? 'Bắt đầu sử dụng! 🎉' : 'Tiếp tục'}
        </button>
      </div>
    </div>
  );
}
