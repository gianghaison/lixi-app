import { formatMoney } from '../../utils/formatMoney';

interface MoneyDisplayProps {
  amount: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'red' | 'green' | 'orange' | 'gray';
  showSign?: boolean;
}

const sizeClasses = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-4xl',
};

const colorClasses = {
  red: 'text-tet-red',
  green: 'text-tet-green',
  orange: 'text-tet-orange',
  gray: 'text-gray-600',
};

export default function MoneyDisplay({
  amount,
  size = 'md',
  color = 'red',
  showSign = false,
}: MoneyDisplayProps) {
  const sign = showSign ? (amount >= 0 ? '+' : '') : '';

  return (
    <span className={`font-bold ${sizeClasses[size]} ${colorClasses[color]} animate-count-up`}>
      {sign}{formatMoney(amount)}
    </span>
  );
}
