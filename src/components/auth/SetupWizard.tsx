import { useState } from 'react';
import PasscodeDots from './PasscodeDots';
import NumericKeypad from './NumericKeypad';
import { initializeApp } from '../../services/storage';
import { AVATARS } from '../../utils/constants';

interface SetupWizardProps {
  onComplete: () => void;
}

type Step = 'passcode' | 'confirm' | 'child';

export default function SetupWizard({ onComplete }: SetupWizardProps) {
  const [step, setStep] = useState<Step>('passcode');
  const [passcode, setPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [error, setError] = useState(false);
  const [childName, setChildName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);

  const currentPasscode = step === 'passcode' ? passcode : confirmPasscode;
  const setCurrentPasscode = step === 'passcode' ? setPasscode : setConfirmPasscode;

  const handleKeyPress = (key: string) => {
    if (currentPasscode.length < 4 && !error) {
      const newPasscode = currentPasscode + key;
      setCurrentPasscode(newPasscode);

      if (newPasscode.length === 4) {
        if (step === 'passcode') {
          setTimeout(() => setStep('confirm'), 300);
        } else if (step === 'confirm') {
          if (newPasscode === passcode) {
            setTimeout(() => setStep('child'), 300);
          } else {
            setError(true);
            setTimeout(() => {
              setError(false);
              setConfirmPasscode('');
            }, 500);
          }
        }
      }
    }
  };

  const handleDelete = () => {
    if (!error) {
      setCurrentPasscode(currentPasscode.slice(0, -1));
    }
  };

  const handleCreateChild = () => {
    if (childName.trim()) {
      initializeApp(passcode, {
        name: childName.trim(),
        avatar: selectedAvatar,
      });
      onComplete();
    }
  };

  if (step === 'child') {
    return (
      <div className="min-h-screen tet-background flex flex-col items-center justify-center px-6">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">👋</div>
          <h1 className="text-2xl font-bold text-gray-800">Chào mừng!</h1>
          <p className="text-gray-600 mt-2">Tạo hồ sơ cho bé nào!</p>
        </div>

        <div className="w-full max-w-[320px] bg-white rounded-2xl p-6 shadow-lg">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tên bé
            </label>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="Nhập tên bé..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-tet-red focus:outline-none"
              autoFocus
            />
            <p className="text-xs text-gray-500 mt-2">
              💡 Có nhiều bé? Bạn có thể thêm bé khác trong phần <strong>Cài đặt</strong> sau.
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Chọn avatar
            </label>
            <div className="flex flex-wrap gap-3 justify-center">
              {AVATARS.map((avatar) => (
                <button
                  key={avatar}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`w-12 h-12 text-2xl rounded-full flex items-center justify-center transition-all ${
                    selectedAvatar === avatar
                      ? 'bg-amber-300 scale-110 shadow-md'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleCreateChild}
            disabled={!childName.trim()}
            className="w-full py-4 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold text-lg rounded-xl hover:bg-gradient-to-r from-pink-400 to-rose-400-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Bắt đầu! 🎉
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen tet-background flex flex-col items-center justify-center px-6">
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">{step === 'passcode' ? '🔒' : '🔑'}</div>
        <h1 className="text-2xl font-bold text-gray-800">
          {step === 'passcode' ? 'Tạo mã PIN' : 'Xác nhận mã PIN'}
        </h1>
        <p className="text-gray-600 mt-2">
          {step === 'passcode'
            ? 'Đặt mã PIN 4 số để bảo vệ hũ lì xì'
            : 'Nhập lại mã PIN để xác nhận'}
        </p>
        {error && (
          <p className="text-red-500 mt-2 text-sm">Mã PIN không khớp!</p>
        )}
      </div>

      <div className="mb-12">
        <PasscodeDots enteredCount={currentPasscode.length} error={error} />
      </div>

      <NumericKeypad onKeyPress={handleKeyPress} onDelete={handleDelete} />

      {step === 'confirm' && (
        <button
          onClick={() => {
            setStep('passcode');
            setPasscode('');
            setConfirmPasscode('');
          }}
          className="mt-8 text-gray-500 hover:text-gray-700"
        >
          ← Quay lại
        </button>
      )}
    </div>
  );
}
