interface PasscodeDotsProps {
  enteredCount: number;
  total?: number;
  error?: boolean;
}

export default function PasscodeDots({ enteredCount, total = 4, error = false }: PasscodeDotsProps) {
  return (
    <div className="flex gap-4 justify-center">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
            error
              ? 'border-red-500 bg-red-500 animate-shake'
              : i < enteredCount
              ? 'bg-pink-400 border-tet-red scale-110'
              : 'bg-white border-gray-400'
          }`}
        />
      ))}
    </div>
  );
}
