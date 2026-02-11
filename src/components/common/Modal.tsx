import type { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-b from-white to-pink-50/50 w-full max-w-[480px] rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto animate-bounce-in shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white/80 backdrop-blur px-6 py-4 border-b border-pink-100 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-xl font-bold text-gray-700">{title}</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-pink-500 hover:bg-pink-50 rounded-full transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
