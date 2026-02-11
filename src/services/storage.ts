import type { LixiApp, Child, Transaction, ChildBalances, QRCode } from '../types';
import { STORAGE_KEY, LOCK_TIMEOUT_MS } from '../utils/constants';
import { generateId } from '../utils/generateId';

// ============ Core Functions ============

export const getAppData = (): LixiApp | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const saveAppData = (data: LixiApp): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const initializeApp = (passcode: string, firstChild: Omit<Child, 'id' | 'transactions' | 'guardians'>): void => {
  const childId = generateId();
  const data: LixiApp = {
    passcode,
    activeChildId: childId,
    lastActiveTimestamp: Date.now(),
    children: [
      {
        ...firstChild,
        id: childId,
        transactions: [],
        guardians: [],
      },
    ],
  };
  saveAppData(data);
};

// ============ Child Operations ============

export const addChild = (child: Omit<Child, 'id' | 'transactions' | 'guardians'>): string => {
  const data = getAppData();
  if (!data) return '';

  const newChild: Child = {
    ...child,
    id: generateId(),
    transactions: [],
    guardians: [],
  };

  data.children.push(newChild);
  saveAppData(data);
  return newChild.id;
};

export const updateChild = (childId: string, updates: Partial<Pick<Child, 'name' | 'avatar' | 'qrCodeImage'>>): void => {
  const data = getAppData();
  if (!data) return;

  const child = data.children.find((c) => c.id === childId);
  if (!child) return;

  Object.assign(child, updates);
  saveAppData(data);
};

export const deleteChild = (childId: string): void => {
  const data = getAppData();
  if (!data) return;

  data.children = data.children.filter((c) => c.id !== childId);

  // Nếu xóa bé đang active, chuyển sang bé đầu tiên còn lại
  if (data.activeChildId === childId && data.children.length > 0) {
    data.activeChildId = data.children[0].id;
  }

  saveAppData(data);
};

export const getActiveChild = (): Child | null => {
  const data = getAppData();
  if (!data) return null;
  return data.children.find((c) => c.id === data.activeChildId) || null;
};

export const setActiveChild = (childId: string): void => {
  const data = getAppData();
  if (!data) return;

  if (data.children.some((c) => c.id === childId)) {
    data.activeChildId = childId;
    saveAppData(data);
  }
};

export const getAllChildren = (): Child[] => {
  const data = getAppData();
  return data?.children || [];
};

// ============ Transaction Operations ============

export const addTransaction = (childId: string, transaction: Omit<Transaction, 'id' | 'date'>): void => {
  const data = getAppData();
  if (!data) return;

  const child = data.children.find((c) => c.id === childId);
  if (!child) return;

  const newTransaction: Transaction = {
    ...transaction,
    id: generateId(),
    date: new Date().toISOString(),
  };

  child.transactions.unshift(newTransaction); // Newest first

  // Cập nhật guardian amount nếu là deposit
  if (transaction.type === 'deposit' && transaction.guardian) {
    const guardian = child.guardians.find((g) => g.name === transaction.guardian);
    if (guardian) {
      guardian.amount += transaction.amount;
    } else {
      child.guardians.push({ name: transaction.guardian, amount: transaction.amount });
    }
  }

  // Trừ guardian amount nếu là withdraw
  if (transaction.type === 'withdraw' && transaction.guardian) {
    const guardian = child.guardians.find((g) => g.name === transaction.guardian);
    if (guardian) {
      guardian.amount -= transaction.amount;
      // Xóa guardian nếu amount = 0
      if (guardian.amount <= 0) {
        child.guardians = child.guardians.filter((g) => g.name !== transaction.guardian);
      }
    }
  }

  // Trừ guardian amount nếu là spend_from_guardian (chi tiêu từ tiền người giữ hộ)
  if (transaction.type === 'spend_from_guardian' && transaction.guardian) {
    const guardian = child.guardians.find((g) => g.name === transaction.guardian);
    if (guardian) {
      guardian.amount -= transaction.amount;
      // Xóa guardian nếu amount = 0
      if (guardian.amount <= 0) {
        child.guardians = child.guardians.filter((g) => g.name !== transaction.guardian);
      }
    }
  }

  saveAppData(data);
};

export const getTransactions = (childId: string): Transaction[] => {
  const data = getAppData();
  if (!data) return [];

  const child = data.children.find((c) => c.id === childId);
  return child?.transactions || [];
};

export const deleteTransaction = (childId: string, transactionId: string): boolean => {
  const data = getAppData();
  if (!data) return false;

  const child = data.children.find((c) => c.id === childId);
  if (!child) return false;

  const transaction = child.transactions.find((t) => t.id === transactionId);
  if (!transaction) return false;

  // Chỉ cho xóa trong 5 phút
  const fiveMinutes = 5 * 60 * 1000;
  if (Date.now() - new Date(transaction.date).getTime() > fiveMinutes) {
    return false;
  }

  // Cập nhật guardian amount nếu cần
  if (transaction.guardian) {
    const guardian = child.guardians.find((g) => g.name === transaction.guardian);
    if (guardian) {
      if (transaction.type === 'deposit') {
        guardian.amount -= transaction.amount;
      } else if (transaction.type === 'withdraw' || transaction.type === 'spend_from_guardian') {
        guardian.amount += transaction.amount;
      }
      // Xóa guardian nếu amount <= 0
      if (guardian.amount <= 0) {
        child.guardians = child.guardians.filter((g) => g.name !== transaction.guardian);
      }
    }
  }

  // Xóa transaction
  child.transactions = child.transactions.filter((t) => t.id !== transactionId);
  saveAppData(data);
  return true;
};

export const canDeleteTransaction = (transaction: Transaction): boolean => {
  const fiveMinutes = 5 * 60 * 1000;
  return Date.now() - new Date(transaction.date).getTime() <= fiveMinutes;
};

export const updateTransaction = (
  childId: string,
  transactionId: string,
  updates: Partial<Pick<Transaction, 'amount' | 'note' | 'date'>>
): void => {
  const data = getAppData();
  if (!data) return;

  const child = data.children.find((c) => c.id === childId);
  if (!child) return;

  const transaction = child.transactions.find((t) => t.id === transactionId);
  if (!transaction) return;

  // Nếu là deposit hoặc withdraw/spend_from_guardian và amount thay đổi, cần cập nhật guardian
  if (transaction.guardian && updates.amount !== undefined) {
    const guardian = child.guardians.find((g) => g.name === transaction.guardian);
    if (guardian) {
      const diff = updates.amount - transaction.amount;
      if (transaction.type === 'deposit') {
        guardian.amount += diff;
      } else if (transaction.type === 'withdraw' || transaction.type === 'spend_from_guardian') {
        guardian.amount -= diff;
      }
      // Xóa guardian nếu amount <= 0
      if (guardian.amount <= 0) {
        child.guardians = child.guardians.filter((g) => g.name !== transaction.guardian);
      }
    }
  }

  Object.assign(transaction, updates);
  saveAppData(data);
};

// ============ Balance Calculations ============

export const calculateBalances = (child: Child): ChildBalances => {
  let holding = 0;

  child.transactions.forEach((tx) => {
    if (tx.type === 'receive') {
      holding += tx.amount;
    } else if (tx.type === 'spend') {
      holding -= tx.amount;
    } else if (tx.type === 'deposit') {
      holding -= tx.amount;
    } else if (tx.type === 'withdraw') {
      holding += tx.amount;
    }
  });

  const guardianTotal = child.guardians.reduce((sum, g) => sum + g.amount, 0);
  const total = holding + guardianTotal;

  return { total, holding, guardianTotal, guardians: child.guardians };
};

// ============ Passcode Operations ============

export const verifyPasscode = (input: string): boolean => {
  const data = getAppData();
  return data?.passcode === input;
};

export const changePasscode = (newPasscode: string): void => {
  const data = getAppData();
  if (!data) return;

  data.passcode = newPasscode;
  saveAppData(data);
};

export const hasPasscode = (): boolean => {
  const data = getAppData();
  return !!data?.passcode;
};

// ============ Session Management ============

export const updateLastActiveTimestamp = (): void => {
  const data = getAppData();
  if (!data) return;

  data.lastActiveTimestamp = Date.now();
  saveAppData(data);
};

export const isSessionExpired = (): boolean => {
  const data = getAppData();
  if (!data) return true;
  return Date.now() - data.lastActiveTimestamp > LOCK_TIMEOUT_MS;
};

// ============ QR Code Operations ============

export const addQRCode = (childId: string, ownerName: string, base64Image: string): string => {
  const data = getAppData();
  if (!data) return '';

  const child = data.children.find((c) => c.id === childId);
  if (!child) return '';

  const newQRCode: QRCode = {
    id: generateId(),
    image: base64Image,
    ownerName,
  };

  if (!child.qrCodes) {
    child.qrCodes = [];
  }
  child.qrCodes.push(newQRCode);
  saveAppData(data);
  return newQRCode.id;
};

export const updateQRCode = (childId: string, qrCodeId: string, updates: Partial<Pick<QRCode, 'ownerName' | 'image'>>): void => {
  const data = getAppData();
  if (!data) return;

  const child = data.children.find((c) => c.id === childId);
  if (!child || !child.qrCodes) return;

  const qrCode = child.qrCodes.find((q) => q.id === qrCodeId);
  if (!qrCode) return;

  Object.assign(qrCode, updates);
  saveAppData(data);
};

export const deleteQRCode = (childId: string, qrCodeId: string): void => {
  const data = getAppData();
  if (!data) return;

  const child = data.children.find((c) => c.id === childId);
  if (!child || !child.qrCodes) return;

  child.qrCodes = child.qrCodes.filter((q) => q.id !== qrCodeId);
  saveAppData(data);
};

export const getQRCodes = (childId: string): QRCode[] => {
  const data = getAppData();
  if (!data) return [];

  const child = data.children.find((c) => c.id === childId);
  return child?.qrCodes || [];
};

// Legacy function for backward compatibility
export const saveQRCode = (childId: string, base64Image: string): void => {
  updateChild(childId, { qrCodeImage: base64Image });
};

export const getQRCode = (childId: string): string | null => {
  const data = getAppData();
  if (!data) return null;

  const child = data.children.find((c) => c.id === childId);
  return child?.qrCodeImage || null;
};

// ============ Utility ============

export const clearAllData = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const isFirstTime = (): boolean => {
  return getAppData() === null;
};
