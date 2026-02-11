import { useState, useEffect, useCallback } from 'react';
import AppContainer from './components/layout/AppContainer';
import BottomTabBar from './components/layout/BottomTabBar';
import PasscodeScreen from './components/auth/PasscodeScreen';
import SetupWizard from './components/auth/SetupWizard';
import QRCodeTab from './components/tabs/QRCodeTab';
import DashboardTab from './components/tabs/DashboardTab';
import SettingsTab from './components/tabs/SettingsTab';
import { isFirstTime, isSessionExpired, updateLastActiveTimestamp } from './services/storage';
import type { TabType } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('qr');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [needsSetup, setNeedsSetup] = useState(false);
  const [showPasscode, setShowPasscode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check initial state
  useEffect(() => {
    if (isFirstTime()) {
      setNeedsSetup(true);
    } else if (isSessionExpired()) {
      setShowPasscode(true);
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  // Activity listener for auto-lock refresh
  useEffect(() => {
    if (!isAuthenticated) return;

    const refreshOnActivity = () => {
      updateLastActiveTimestamp();
    };

    window.addEventListener('click', refreshOnActivity);
    window.addEventListener('touchstart', refreshOnActivity);
    window.addEventListener('keydown', refreshOnActivity);

    return () => {
      window.removeEventListener('click', refreshOnActivity);
      window.removeEventListener('touchstart', refreshOnActivity);
      window.removeEventListener('keydown', refreshOnActivity);
    };
  }, [isAuthenticated]);

  // Check session expiry when tab becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isAuthenticated) {
        if (isSessionExpired()) {
          setIsAuthenticated(false);
          setShowPasscode(true);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isAuthenticated]);

  const handleTabChange = useCallback((tab: TabType) => {
    // QR tab doesn't require auth
    if (tab === 'qr') {
      setActiveTab(tab);
      return;
    }

    // Check auth for dashboard and settings
    if (!isAuthenticated && isSessionExpired()) {
      setShowPasscode(true);
      setActiveTab(tab);
      return;
    }

    setActiveTab(tab);
  }, [isAuthenticated]);

  const handlePasscodeSuccess = () => {
    setIsAuthenticated(true);
    setShowPasscode(false);
  };

  const handleSetupComplete = () => {
    setNeedsSetup(false);
    setIsAuthenticated(true);
  };

  if (isLoading) {
    return (
      <AppContainer>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-5xl mb-4">🧧</p>
            <p className="text-gray-600">Đang tải...</p>
          </div>
        </div>
      </AppContainer>
    );
  }

  // First time setup
  if (needsSetup) {
    return <SetupWizard onComplete={handleSetupComplete} />;
  }

  // Passcode required for dashboard/settings
  if (showPasscode && activeTab !== 'qr') {
    return <PasscodeScreen onSuccess={handlePasscodeSuccess} />;
  }

  // Render active tab
  const renderTab = () => {
    switch (activeTab) {
      case 'qr':
        return <QRCodeTab />;
      case 'dashboard':
        return <DashboardTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <AppContainer>
      {renderTab()}
      <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </AppContainer>
  );
}

export default App;
