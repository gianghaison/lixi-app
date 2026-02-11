import { useEffect } from 'react';
import BunnyMascot from './BunnyMascot';

export type SpeechType = 'receive' | 'spend' | 'deposit';

const MESSAGES: Record<SpeechType, string> = {
  receive: 'Suỵt! Có ai xung quanh không? Đếm tiền lì xì phải kín đáo nha! Xem lì xì ngay khi nhận là bất lịch sự đó, tìm chỗ riêng tư nha! 🤫',
  spend: 'Khoan đã! Chi tiêu cần suy nghĩ kỹ nha. Hỏi ba mẹ trước khi tiêu tiền nhé! 🤔',
  deposit: 'Giỏi lắm! Đưa tiền cho người lớn giữ là thông minh nhất đó! Ba mẹ sẽ giữ an toàn cho con! 👍',
};

interface BunnySpeechPopupProps {
  type: SpeechType;
  onClose: () => void;
  autoCloseMs?: number;
}

export default function BunnySpeechPopup({
  type,
  onClose,
  autoCloseMs = 8000
}: BunnySpeechPopupProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, autoCloseMs);
    return () => clearTimeout(timer);
  }, [onClose, autoCloseMs]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center px-6"
      onClick={onClose}
    >
      {/* Speech bubble */}
      <div
        className="bg-white rounded-3xl p-6 max-w-[320px] text-center shadow-2xl mb-6 animate-bounce-in"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-xl text-gray-800 leading-relaxed font-medium">
          {MESSAGES[type]}
        </p>
      </div>

      {/* Bunny */}
      <div className="animate-bounce-in">
        <BunnyMascot size={200} />
      </div>

      {/* Tap to continue */}
      <p className="mt-6 text-white/70 text-sm">Nhấn để tiếp tục</p>
    </div>
  );
}
