import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  scale: number;
  type: 'circle' | 'square' | 'star';
}

const COLORS = [
  '#FF6B6B', '#FFE66D', '#4ECDC4', '#FF8ED4',
  '#A78BFA', '#60A5FA', '#34D399', '#FBBF24',
  '#F472B6', '#FB923C', '#A3E635', '#22D3EE'
];

export default function Confetti({ isActive, onComplete }: { isActive: boolean; onComplete?: () => void }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (isActive) {
      // Generate confetti pieces - increased to 150
      const newPieces: ConfettiPiece[] = [];
      for (let i = 0; i < 150; i++) {
        newPieces.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 30 - 15,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          rotation: Math.random() * 360,
          scale: 0.4 + Math.random() * 0.8,
          type: ['circle', 'square', 'star'][Math.floor(Math.random() * 3)] as 'circle' | 'square' | 'star',
        });
      }
      setPieces(newPieces);

      // Clean up after animation
      const timer = setTimeout(() => {
        setPieces([]);
        onComplete?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  if (!isActive && pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Confetti pieces */}
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${2 + Math.random() * 1}s`,
          }}
        >
          {piece.type === 'circle' && (
            <div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: piece.color,
                transform: `scale(${piece.scale})`,
              }}
            />
          )}
          {piece.type === 'square' && (
            <div
              className="w-3 h-3"
              style={{
                backgroundColor: piece.color,
                transform: `scale(${piece.scale}) rotate(${piece.rotation}deg)`,
              }}
            />
          )}
          {piece.type === 'star' && (
            <div
              className="text-lg"
              style={{
                color: piece.color,
                transform: `scale(${piece.scale})`,
              }}
            >
              ★
            </div>
          )}
        </div>
      ))}

    </div>
  );
}
