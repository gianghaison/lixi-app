import { useState } from 'react';
import Modal from '../common/Modal';
import AmountInput from './AmountInput';
import { addTransaction, getActiveChild } from '../../services/storage';

interface WithdrawFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  guardianName: string;
  maxAmount: number;
}

export default function WithdrawForm({ isOpen, onClose, onSuccess, guardianName, maxAmount }: WithdrawFormProps) {
  const [amount, setAmount] = useState(0);

  const handleSubmit = () => {
    if (amount <= 0 || amount > maxAmount) return;

    const child = getActiveChild();
    if (!child) return;

    addTransaction(child.id, {
      type: 'withdraw',
      amount,
      note: `Nhận lại từ ${guardianName}`,
      guardian: guardianName,
    });

    setAmount(0);
    onClose();
    onSuccess();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`💰 Nhận lại tiền từ ${guardianName}`}>
      <div className="mb-4 p-3 bg-yellow-50 rounded-xl">
        <p className="text-sm text-yellow-800">
          {guardianName} đang giữ hộ: <span className="font-bold">{maxAmount.toLocaleString('vi-VN')}đ</span>
        </p>
      </div>

      <AmountInput
        value={amount}
        onChange={setAmount}
        max={maxAmount}
        label="Số tiền nhận lại"
      />

      <button
        onClick={handleSubmit}
        disabled={amount <= 0 || amount > maxAmount}
        className="w-full py-4 bg-tet-yellow text-gray-800 font-bold text-lg rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Xác nhận nhận lại
      </button>
    </Modal>
  );
}
