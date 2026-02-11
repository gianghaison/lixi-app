import { useRive } from '@rive-app/react-canvas';

interface MascotProps {
  size?: number;
  className?: string;
}

function BunnyMascot({ size = 100, className = '' }: MascotProps) {
  const { RiveComponent } = useRive({
    src: '/kawaii-emoji.riv',
    artboard: 'FFW3USK 5',
    animations: 'FFW3USK 5',
    autoplay: true,
  });

  return (
    <div
      className={`mascot-container ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      <RiveComponent />
    </div>
  );
}

export default BunnyMascot;
