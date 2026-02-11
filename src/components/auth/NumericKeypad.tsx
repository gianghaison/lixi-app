interface NumericKeypadProps {
  onKeyPress: (key: string) => void;
  onDelete: () => void;
}

const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'];

export default function NumericKeypad({ onKeyPress, onDelete }: NumericKeypadProps) {
  const handlePress = (key: string) => {
    if (key === 'del') {
      onDelete();
    } else if (key !== '') {
      onKeyPress(key);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 max-w-[280px] mx-auto">
      {keys.map((key, index) => (
        <button
          key={index}
          onClick={() => handlePress(key)}
          disabled={key === ''}
          className={`h-16 w-16 rounded-full text-2xl font-bold transition-all duration-150 flex items-center justify-center mx-auto ${
            key === ''
              ? 'invisible'
              : key === 'del'
              ? 'text-gray-600 hover:bg-gray-100 active:bg-gray-200'
              : 'bg-white text-gray-800 shadow-md hover:shadow-lg active:scale-95 active:bg-gray-50'
          }`}
        >
          {key === 'del' ? '⌫' : key}
        </button>
      ))}
    </div>
  );
}
