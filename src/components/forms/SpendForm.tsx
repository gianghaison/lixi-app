import { useState } from 'react';
import Modal from '../common/Modal';
import AmountInput from './AmountInput';
import { addTransaction, getActiveChild } from '../../services/storage';

interface SpendFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  maxAmount: number;
}

export default function SpendForm({ isOpen, onClose, onSuccess, maxAmount }: SpendFormProps) {
  const [amount, setAmount] = useState(0);
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    if (amount <= 0 || amount > maxAmount) return;

    const child = getActiveChild();
    if (!child) return;

    addTransaction(child.id, {
      type: 'spend',
      amount,
      note: reason.trim() || 'Chi tiêu',
    });

    setAmount(0);
    setReason('');
    onClose();
    onSuccess();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="💸 Chi tiêu">
      <AmountInput
        value={amount}
        onChange={setAmount}
        max={maxAmount}
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
        disabled={amount <= 0 || amount > maxAmount}
        className="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-400 text-white font-bold text-lg rounded-2xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
      >
        Xác nhận chi tiêu
      </button>
    </Modal>
  );
}
