import { useState } from 'react';
import type { TabType } from '../../types';
import Confetti from '../common/Confetti';

interface BottomTabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function BottomTabBar({ activeTab, onTabChange }: BottomTabBarProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  const handleDashboardClick = () => {
    setShowConfetti(true);
    onTabChange('dashboard');
  };

  return (
    <>
      <Confetti isActive={showConfetti} onComplete={() => setShowConfetti(false)} />
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-pink-100 safe-bottom z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      <div className="mx-auto max-w-[480px] flex items-end">
        {/* QR Code Tab */}
        <button
          onClick={() => onTabChange('qr')}
          className={`flex-1 flex flex-col items-center justify-center py-3 min-h-[60px] transition-all ${
            activeTab === 'qr'
              ? 'text-pink-500'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <span className={`text-2xl mb-1 ${activeTab === 'qr' ? 'animate-bounce-in' : ''}`}>
            📲
          </span>
          <span className={`text-xs ${activeTab === 'qr' ? 'font-bold' : 'font-medium'}`}>
            QR Code
          </span>
        </button>

        {/* Hũ Lì Xì Tab - Main Button */}
        <button
          onClick={handleDashboardClick}
          className="flex flex-col items-center justify-center -mt-4 px-2"
        >
          <div className="relative">
            {/* Ripple waves */}
            <div className="ripple-wave"></div>
            <div className="ripple-wave ripple-wave-2"></div>
            <div className="ripple-wave ripple-wave-3"></div>

            {/* Main button */}
            <div
              className={`relative w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all animate-pulse-scale ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-br from-red-500 via-pink-500 to-rose-400 shadow-pink-400/50 shadow-xl'
                  : 'bg-gradient-to-br from-red-400 via-pink-400 to-rose-300 hover:shadow-xl'
              }`}
            >
              <span className={`text-3xl ${activeTab === 'dashboard' ? 'animate-bounce-in' : ''}`}>
                🧧
              </span>
            </div>
          </div>
          <span
            className={`text-xs mt-1 ${
              activeTab === 'dashboard' ? 'font-bold text-pink-500' : 'font-medium text-gray-400'
            }`}
          >
            Hũ Lì Xì
          </span>
        </button>

        {/* Settings Tab */}
        <button
          onClick={() => onTabChange('settings')}
          className={`flex-1 flex flex-col items-center justify-center py-3 min-h-[60px] transition-all ${
            activeTab === 'settings'
              ? 'text-pink-500'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <span className={`text-2xl mb-1 ${activeTab === 'settings' ? 'animate-bounce-in' : ''}`}>
            🔧
          </span>
          <span className={`text-xs ${activeTab === 'settings' ? 'font-bold' : 'font-medium'}`}>
            Cài đặt
          </span>
        </button>
      </div>
    </nav>
    </>
  );
}
