import type { ChildBalances } from '../../types';
import { formatMoney } from '../../utils/formatMoney';
import BunnyMascot from '../bunny/BunnyMascot';

interface BalanceSummaryProps {
  balances: ChildBalances;
  onWithdraw?: (guardianName: string, maxAmount: number) => void;
  quote?: string;
}

export default function BalanceSummary({ balances, onWithdraw, quote }: BalanceSummaryProps) {
  return (
    <div className="bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 rounded-3xl p-6 mx-4 text-white shadow-xl">
      {/* Quote */}
      {quote && (
        <div className="bg-white/15 backdrop-blur rounded-2xl px-4 py-3 mb-4">
          <p className="text-sm text-white/95 italic text-center leading-relaxed">
            ✨ "{quote}"
          </p>
        </div>
      )}

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <p className="text-lg font-bold opacity-90 mb-2">🧧 Tổng tiền lì xì</p>
          <div className="text-4xl font-extrabold">
            {formatMoney(balances.total)}
          </div>
        </div>
        <div className="flex-shrink-0 -mr-4">
          <BunnyMascot size={160} />
        </div>
      </div>

      <div className="border-t border-white/20 pt-4 mt-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm opacity-80">💰 Đang giữ:</span>
          <span className="font-bold">{formatMoney(balances.holding)}</span>
        </div>

        {balances.guardians.map((guardian) => (
          <div key={guardian.name} className="flex justify-between items-center gap-2">
            <span className="text-sm opacity-80 flex-1">🏦 {guardian.name} giữ hộ:</span>
            <span className="font-bold">{formatMoney(guardian.amount)}</span>
            {onWithdraw && guardian.amount > 0 && (
              <button
                onClick={() => onWithdraw(guardian.name, guardian.amount)}
                className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded-full transition-colors"
              >
                Nhận lại
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
