interface ActionButtonsProps {
  onReceive: () => void;
  onSpend: () => void;
  onDeposit: () => void;
}

export default function ActionButtons({ onReceive, onSpend, onDeposit }: ActionButtonsProps) {
  return (
    <div className="flex gap-3 px-4 py-6">
      <button
        onClick={onReceive}
        className="flex-1 py-4 bg-gradient-to-br from-red-500 via-pink-500 to-rose-400 text-white font-bold rounded-2xl shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 active:scale-95 transition-all"
      >
        <span className="text-xl">🎁</span>
        <span className="block text-sm mt-1">Nhận lì xì</span>
      </button>
      <button
        onClick={onSpend}
        className="flex-1 py-4 bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-400 text-white font-bold rounded-2xl shadow-lg shadow-amber-200 hover:shadow-xl hover:shadow-amber-300 active:scale-95 transition-all"
      >
        <span className="text-xl">🛒</span>
        <span className="block text-sm mt-1">Chi tiêu</span>
      </button>
      <button
        onClick={onDeposit}
        className="flex-1 py-4 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-400 text-white font-bold rounded-2xl shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 active:scale-95 transition-all"
      >
        <span className="text-xl">🏧</span>
        <span className="block text-sm mt-1">Gửi giữ</span>
      </button>
    </div>
  );
}
