import { useState, useCallback } from 'react';
import type { BunnyAction } from '../components/bunny/BunnyMascot';
import { BUNNY_MESSAGES } from '../utils/constants';

interface UseBunnyReturn {
  action: BunnyAction;
  message: string | null;
  showMessage: (message: string, bunnyAction?: BunnyAction) => void;
  hideMessage: () => void;
  triggerReceiveStart: () => void;
  triggerReceiveSuccess: (giverName: string) => void;
  triggerSpendWarning: () => void;
  triggerSpendSuccess: () => void;
  triggerDepositStart: () => void;
  triggerDepositSuccess: (guardianName: string) => void;
  triggerMilestone: () => void;
  resetToIdle: () => void;
}

export function useBunny(): UseBunnyReturn {
  const [action, setAction] = useState<BunnyAction>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const showMessage = useCallback((msg: string, bunnyAction: BunnyAction = 'wave1') => {
    setAction(bunnyAction);
    setMessage(msg);
  }, []);

  const hideMessage = useCallback(() => {
    setMessage(null);
    setAction('idle');
  }, []);

  // Mở form nhận lì xì → ngó trái phải
  const triggerReceiveStart = useCallback(() => {
    showMessage(BUNNY_MESSAGES.receive_start, 'look_around');
  }, [showMessage]);

  // Nhận lì xì thành công → vẫy tay rồi rút sổ ghi chép
  const triggerReceiveSuccess = useCallback((giverName: string) => {
    showMessage(BUNNY_MESSAGES.receive_success(giverName), 'write_note');
  }, [showMessage]);

  // Chi tiêu → lắc đầu cảnh báo
  const triggerSpendWarning = useCallback(() => {
    showMessage(BUNNY_MESSAGES.spend_warning, 'shake_head');
  }, [showMessage]);

  // Chi tiêu thành công → vẫy tay nhẹ
  const triggerSpendSuccess = useCallback(() => {
    showMessage(BUNNY_MESSAGES.spend_success, 'wave1');
  }, [showMessage]);

  // Gửi tiền cho bố mẹ → vẫy tay khen ngợi
  const triggerDepositStart = useCallback(() => {
    showMessage(BUNNY_MESSAGES.deposit_start, 'wave2');
  }, [showMessage]);

  // Gửi tiền thành công
  const triggerDepositSuccess = useCallback((guardianName: string) => {
    showMessage(BUNNY_MESSAGES.deposit_success(guardianName), 'wave1');
  }, [showMessage]);

  // Đạt mốc tiền → đi tới rồi vẫy tay
  const triggerMilestone = useCallback(() => {
    showMessage(BUNNY_MESSAGES.milestone, 'walk');
  }, [showMessage]);

  const resetToIdle = useCallback(() => {
    setAction('idle');
    setMessage(null);
  }, []);

  return {
    action,
    message,
    showMessage,
    hideMessage,
    triggerReceiveStart,
    triggerReceiveSuccess,
    triggerSpendWarning,
    triggerSpendSuccess,
    triggerDepositStart,
    triggerDepositSuccess,
    triggerMilestone,
    resetToIdle,
  };
}
