export interface LixiApp {
  passcode: string;
  activeChildId: string;
  children: Child[];
  lastActiveTimestamp: number;
}

export interface QRCode {
  id: string;
  image: string; // base64
  ownerName: string; // Tên chủ tài khoản (Bố, Mẹ, ...)
}

export interface Child {
  id: string;
  name: string;
  avatar: string;
  qrCodeImage?: string; // deprecated - keeping for backward compatibility
  qrCodes?: QRCode[]; // Danh sách mã QR
  transactions: Transaction[];
  guardians: Guardian[];
}

export interface Transaction {
  id: string;
  type: 'receive' | 'spend' | 'deposit' | 'withdraw' | 'spend_from_guardian';
  amount: number;
  note: string;
  date: string;
  guardian?: string;
}

export interface Guardian {
  name: string;
  amount: number;
}

export type TabType = 'qr' | 'dashboard' | 'settings';

export interface ChildBalances {
  total: number;
  holding: number;
  guardianTotal: number;
  guardians: Guardian[];
}
