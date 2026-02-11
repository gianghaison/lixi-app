import type { Transaction } from '../../types';
import { formatMoney } from '../../utils/formatMoney';

interface TransactionListProps {
  transactions: Transaction[];
  onEdit?: (transaction: Transaction) => void;
}

const typeConfig: Record<string, { icon: string; label: string; color: string }> = {
  receive: { icon: '🧧', label: 'Nhận lì xì', color: 'text-emerald-500' },
  spend: { icon: '💸', label: 'Chi tiêu', color: 'text-orange-400' },
  deposit: { icon: '🏦', label: 'Gửi giữ hộ', color: 'text-purple-400' },
  withdraw: { icon: '💰', label: 'Nhận lại tiền', color: 'text-emerald-500' },
  spend_from_guardian: { icon: '🛍️', label: 'Chi tiêu (người giữ thanh toán)', color: 'text-orange-400' },
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  return `${day}/${month} ${hour}:${minute}`;
}

export default function TransactionList({ transactions, onEdit }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="px-4 py-8 text-center text-gray-500">
        <p className="text-4xl mb-2">📭</p>
        <p>Chưa có giao dịch nào</p>
        <p className="text-sm">Bấm "Nhận lì xì" để bắt đầu!</p>
      </div>
    );
  }

  return (
    <div className="px-4 pb-24">
      <h3 className="text-lg font-bold text-gray-800 mb-3">Lịch sử giao dịch</h3>
      <div className="space-y-2">
        {transactions.map((tx) => {
          const config = typeConfig[tx.type] || { icon: '❓', label: 'Giao dịch', color: 'text-gray-500' };
          const isNegative = tx.type === 'spend' || tx.type === 'deposit' || tx.type === 'spend_from_guardian';

          return (
            <div
              key={tx.id}
              onClick={() => onEdit?.(tx)}
              className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-sm flex items-center gap-3 cursor-pointer hover:bg-white hover:shadow-md active:scale-98 transition-all border border-pink-50"
            >
              <span className="text-2xl">{config.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 truncate">{tx.note}</p>
                <p className="text-sm text-gray-500">{formatDate(tx.date)}</p>
              </div>
              <span className={`font-bold ${config.color}`}>
                {isNegative ? '-' : '+'}{formatMoney(tx.amount)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
