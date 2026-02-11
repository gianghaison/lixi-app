import type { ReactNode } from 'react';

interface AppContainerProps {
  children: ReactNode;
}

export default function AppContainer({ children }: AppContainerProps) {
  return (
    <div className="min-h-screen tet-background">
      <div className="mx-auto max-w-[480px] min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
}
