import { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import AmountInput from './AmountInput';
import { updateTransaction, deleteTransaction, canDeleteTransaction } from '../../services/storage';
import type { Transaction } from '../../types';

interface EditTransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  transaction: Transaction | null;
  childId: string;
}

const typeLabels: Record<string, string> = {
  receive: '🧧 Nhận lì xì',
  spend: '💸 Chi tiêu',
  deposit: '🏦 Gửi giữ hộ',
  withdraw: '💰 Nhận lại tiền',
  spend_from_guardian: '🛍️ Chi tiêu (người giữ thanh toán)',
};

export default function EditTransactionForm({
  isOpen,
  onClose,
  onSuccess,
  transaction,
  childId
}: EditTransactionFormProps) {
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState('');
  const [date, setDate] = useState('');
  const [canDelete, setCanDelete] = useState(false);

  useEffect(() => {
    if (transaction) {
      setAmount(transaction.amount);
      setNote(transaction.note);
      // Convert ISO date to datetime-local format
      const d = new Date(transaction.date);
      const localDate = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
      setDate(localDate);
      setCanDelete(canDeleteTransaction(transaction));
    }
  }, [transaction]);

  const handleSubmit = () => {
    if (!transaction || amount <= 0) return;

    updateTransaction(childId, transaction.id, {
      amount,
      note: note.trim() || transaction.note,
      date: new Date(date).toISOString(),
    });

    onClose();
    onSuccess();
  };

  const handleDelete = () => {
    if (!transaction) return;

    if (confirm('Bạn có chắc muốn xóa giao dịch này?')) {
      const success = deleteTransaction(childId, transaction.id);
      if (success) {
        onClose();
        onSuccess();
      } else {
        alert('Không thể xóa giao dịch này (đã quá 5 phút)');
      }
    }
  };

  if (!transaction) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Sửa giao dịch`}>
      <div className="mb-4 p-3 bg-gray-50 rounded-xl">
        <p className="text-sm text-gray-600">
          Loại: <span className="font-bold">{typeLabels[transaction.type]}</span>
        </p>
      </div>

      <AmountInput
        value={amount}
        onChange={setAmount}
        label="Số tiền"
      />

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Ghi chú
        </label>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Nhập ghi chú..."
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-pink-400 focus:outline-none"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Ngày giờ
        </label>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-pink-400 focus:outline-none"
        />
      </div>

      <div className="flex gap-3">
        {canDelete && (
          <button
            onClick={handleDelete}
            className="px-6 py-4 bg-red-100 text-red-500 font-bold text-lg rounded-2xl hover:bg-red-200 transition-colors"
          >
            🗑️ Xóa
          </button>
        )}
        <button
          onClick={handleSubmit}
          disabled={amount <= 0}
          className="flex-1 py-4 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold text-lg rounded-2xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          Lưu thay đổi
        </button>
      </div>

      {canDelete && (
        <p className="text-xs text-gray-400 text-center mt-3">
          Có thể xóa trong vòng 5 phút sau khi tạo
        </p>
      )}
    </Modal>
  );
}
