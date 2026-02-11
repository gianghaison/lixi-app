import { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import AmountInput from './AmountInput';
import { addTransaction, getActiveChild } from '../../services/storage';

interface SpendFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  maxAmount: number;
  fromGuardian?: { name: string; maxAmount: number } | null;
}

export default function SpendForm({ isOpen, onClose, onSuccess, maxAmount, fromGuardian }: SpendFormProps) {
  const [amount, setAmount] = useState(0);
  const [reason, setReason] = useState('');

  // Reset form khi guardian thay đổi
  useEffect(() => {
    if (isOpen) {
      setAmount(0);
      setReason('');
    }
  }, [isOpen, fromGuardian]);

  const effectiveMaxAmount = fromGuardian ? fromGuardian.maxAmount : maxAmount;

  const handleSubmit = () => {
    if (amount <= 0 || amount > effectiveMaxAmount) return;

    const child = getActiveChild();
    if (!child) return;

    if (fromGuardian) {
      // Chi tiêu từ tiền người giữ hộ
      addTransaction(child.id, {
        type: 'spend_from_guardian',
        amount,
        note: reason.trim() || `Chi tiêu (${fromGuardian.name} thanh toán)`,
        guardian: fromGuardian.name,
      });
    } else {
      // Chi tiêu từ tiền đang giữ
      addTransaction(child.id, {
        type: 'spend',
        amount,
        note: reason.trim() || 'Chi tiêu',
      });
    }

    setAmount(0);
    setReason('');
    onClose();
    onSuccess();
  };

  const title = fromGuardian
    ? `💸 Chi tiêu (${fromGuardian.name} thanh toán)`
    : '💸 Chi tiêu';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      {fromGuardian && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
          <p className="text-amber-700 text-sm">
            💡 Số tiền sẽ được trừ từ khoản {fromGuardian.name} đang giữ hộ
          </p>
        </div>
      )}
      <AmountInput
        value={amount}
        onChange={setAmount}
        max={effectiveMaxAmount}
        label="Số tiền chi tiêu"
      />

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Lý do chi tiêu
        </label>
        <input
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Ví dụ: Mua đồ chơi, Mua sách..."
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-orange-400 focus:outline-none"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={amount <= 0 || amount > effectiveMaxAmount}
        className="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-400 text-white font-bold text-lg rounded-2xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
      >
        Xác nhận chi tiêu
      </button>
    </Modal>
  );
}
