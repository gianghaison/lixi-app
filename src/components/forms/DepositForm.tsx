import { useState } from 'react';
import Modal from '../common/Modal';
import AmountInput from './AmountInput';
import { addTransaction, getActiveChild } from '../../services/storage';
import { GUARDIAN_SUGGESTIONS } from '../../utils/constants';

interface DepositFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  maxAmount: number;
}

export default function DepositForm({ isOpen, onClose, onSuccess, maxAmount }: DepositFormProps) {
  const [amount, setAmount] = useState(0);
  const [guardian, setGuardian] = useState('');
  const [customGuardian, setCustomGuardian] = useState('');

  const selectedGuardian = guardian === 'custom' ? customGuardian : guardian;

  const handleSubmit = () => {
    if (amount <= 0 || amount > maxAmount || !selectedGuardian.trim()) return;

    const child = getActiveChild();
    if (!child) return;

    addTransaction(child.id, {
      type: 'deposit',
      amount,
      note: `Gửi ${selectedGuardian.trim()} giữ hộ`,
      guardian: selectedGuardian.trim(),
    });

    setAmount(0);
    setGuardian('');
    setCustomGuardian('');
    onClose();
    onSuccess();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="🏦 Gửi giữ hộ">
      <AmountInput
        value={amount}
        onChange={setAmount}
        max={maxAmount}
        label="Số tiền gửi giữ"
      />

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Gửi ai giữ hộ?
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {GUARDIAN_SUGGESTIONS.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setGuardian(name)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                guardian === name
                  ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {name}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setGuardian('custom')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              guardian === 'custom'
                ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Khác...
          </button>
        </div>

        {guardian === 'custom' && (
          <input
            type="text"
            value={customGuardian}
            onChange={(e) => setCustomGuardian(e.target.value)}
            placeholder="Nhập tên người giữ hộ..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-teal-400 focus:outline-none"
            autoFocus
          />
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={amount <= 0 || amount > maxAmount || !selectedGuardian.trim()}
        className="w-full py-4 bg-gradient-to-r from-emerald-400 to-teal-400 text-white font-bold text-lg rounded-2xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
      >
        Xác nhận gửi giữ hộ
      </button>
    </Modal>
  );
}
