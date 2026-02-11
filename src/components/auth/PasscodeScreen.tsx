import { useState, useEffect } from 'react';
import PasscodeDots from './PasscodeDots';
import NumericKeypad from './NumericKeypad';
import { verifyPasscode, updateLastActiveTimestamp } from '../../services/storage';

interface PasscodeScreenProps {
  onSuccess: () => void;
  title?: string;
}

export default function PasscodeScreen({ onSuccess, title = 'Nhập mã PIN' }: PasscodeScreenProps) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (passcode.length === 4) {
      if (verifyPasscode(passcode)) {
        updateLastActiveTimestamp();
        onSuccess();
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
          setPasscode('');
        }, 500);
      }
    }
  }, [passcode, onSuccess]);

  const handleKeyPress = (key: string) => {
    if (passcode.length < 4 && !error) {
      setPasscode((prev) => prev + key);
    }
  };

  const handleDelete = () => {
    if (!error) {
      setPasscode((prev) => prev.slice(0, -1));
    }
  };

  return (
    <div className="min-h-screen tet-background flex flex-col items-center justify-center px-6">
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">🔐</div>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        {error && (
          <p className="text-red-500 mt-2 text-sm">Mã PIN không đúng!</p>
        )}
      </div>

      <div className="mb-12">
        <PasscodeDots enteredCount={passcode.length} error={error} />
      </div>

      <NumericKeypad onKeyPress={handleKeyPress} onDelete={handleDelete} />
    </div>
  );
}
