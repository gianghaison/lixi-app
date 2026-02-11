import { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import AmountInput from './AmountInput';
import { addTransaction, getActiveChild, getQRCodes } from '../../services/storage';
import type { QRCode } from '../../types';

interface ReceiveLixiFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ReceiveLixiForm({ isOpen, onClose, onSuccess }: ReceiveLixiFormProps) {
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState('');
  const [qrCodes, setQrCodes] = useState<QRCode[]>([]);
  const [selectedQRId, setSelectedQRId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const child = getActiveChild();
      if (child) {
        setQrCodes(getQRCodes(child.id));
      }
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (amount <= 0) return;

    const child = getActiveChild();
    if (!child) return;

    const selectedQR = qrCodes.find(qr => qr.id === selectedQRId);
    const noteText = note.trim() || 'Lì xì';

    if (selectedQR) {
      // Nếu chọn QR code, tiền tự động được người đó giữ hộ
      // Ghi nhận nhận lì xì với ghi chú rõ ràng
      addTransaction(child.id, {
        type: 'receive',
        amount,
        note: `${noteText} (qua QR ${selectedQR.ownerName})`,
      });

      // Tự động ghi nhận gửi giữ hộ
      addTransaction(child.id, {
        type: 'deposit',
        amount,
        note: `Nhận qua mã QR`,
        guardian: selectedQR.ownerName,
      });
    } else {
      // Nhận tiền mặt, bé tự giữ
      addTransaction(child.id, {
        type: 'receive',
        amount,
        note: noteText,
      });
    }

    setAmount(0);
    setNote('');
    setSelectedQRId(null);
    onClose();
    onSuccess();
  };

  const handleClose = () => {
    setAmount(0);
    setNote('');
    setSelectedQRId(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="🧧 Nhận lì xì">
      <AmountInput value={amount} onChange={setAmount} />

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Ai lì xì? (ghi chú)
        </label>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Ví dụ: Bà ngoại, Chú Tư..."
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-pink-400 focus:outline-none"
        />
      </div>

      {/* Chọn phương thức nhận */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Nhận bằng cách nào?
        </label>

        {/* Option: Tiền mặt */}
        <button
          onClick={() => setSelectedQRId(null)}
          className={`w-full p-4 rounded-xl mb-2 flex items-center gap-3 transition-all border-2 ${
            selectedQRId === null
              ? 'border-pink-400 bg-pink-50'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <span className="text-3xl">💵</span>
          <div className="flex-1 text-left">
            <p className="font-semibold text-gray-700">Tiền mặt</p>
            <p className="text-sm text-gray-500">Bé tự cầm giữ</p>
          </div>
          {selectedQRId === null && (
            <span className="text-pink-500 text-xl">✓</span>
          )}
        </button>

        {/* Options: QR Codes */}
        {qrCodes.map((qr) => (
          <button
            key={qr.id}
            onClick={() => setSelectedQRId(qr.id)}
            className={`w-full p-4 rounded-xl mb-2 flex items-center gap-3 transition-all border-2 ${
              selectedQRId === qr.id
                ? 'border-pink-400 bg-pink-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <img
              src={qr.image}
              alt={qr.ownerName}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex-1 text-left">
              <p className="font-semibold text-gray-700">Qua mã QR</p>
              <p className="text-sm text-gray-500">{qr.ownerName} giữ hộ</p>
            </div>
            {selectedQRId === qr.id && (
              <span className="text-pink-500 text-xl">✓</span>
            )}
          </button>
        ))}

        {selectedQRId && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mt-2">
            <p className="text-amber-700 text-sm">
              💡 Tiền sẽ tự động được ghi nhận là <strong>{qrCodes.find(q => q.id === selectedQRId)?.ownerName}</strong> giữ hộ
            </p>
          </div>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={amount <= 0}
        className="w-full py-4 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold text-lg rounded-xl hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Xác nhận nhận lì xì
      </button>
    </Modal>
  );
}
