import { useEffect } from 'react';

interface SpeechBubbleProps {
  message: string;
  onClose: () => void;
  autoCloseMs?: number;
}

export default function SpeechBubble({
  message,
  onClose,
  autoCloseMs = 3000,
}: SpeechBubbleProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, autoCloseMs);
    return () => clearTimeout(timer);
  }, [onClose, autoCloseMs]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 px-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 max-w-[300px] text-center shadow-xl animate-bounce-in"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-lg text-gray-800 leading-relaxed">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 hover:text-gray-700"
        >
          Nhấn để đóng
        </button>
      </div>
    </div>
  );
}
