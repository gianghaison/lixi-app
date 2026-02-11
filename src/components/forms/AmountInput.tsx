import { AMOUNT_SUGGESTIONS } from '../../utils/constants';
import { formatMoney } from '../../utils/formatMoney';

interface AmountInputProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  label?: string;
}

export default function AmountInput({
  value,
  onChange,
  max,
  label = 'Số tiền',
}: AmountInputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d]/g, '');
    const num = parseInt(raw, 10) || 0;
    onChange(max ? Math.min(num, max) : num);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <input
        type="text"
        inputMode="numeric"
        value={value ? formatMoney(value).replace('đ', '') : ''}
        onChange={handleInputChange}
        placeholder="0"
        className="w-full px-4 py-3 border-2 border-pink-200 rounded-2xl text-2xl font-bold text-center text-pink-500 focus:border-pink-400 focus:outline-none bg-pink-50/50"
      />
      {max && (
        <p className="text-sm text-gray-500 mt-1 text-center">
          Tối đa: {formatMoney(max)}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mt-3 justify-center">
        {AMOUNT_SUGGESTIONS.map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={() => onChange(max ? Math.min(amount, max) : amount)}
            className={`px-3 py-2 rounded-full text-sm font-semibold transition-all ${
              value === amount
                ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-pink-100'
            }`}
          >
            {formatMoney(amount)}
          </button>
        ))}
      </div>
    </div>
  );
}
