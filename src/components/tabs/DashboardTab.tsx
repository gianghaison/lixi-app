import { useState, useEffect, useCallback } from 'react';
import ChildSelector from '../dashboard/ChildSelector';
import BalanceSummary from '../dashboard/BalanceSummary';
import ActionButtons from '../dashboard/ActionButtons';
import TransactionList from '../dashboard/TransactionList';
import ReceiveLixiForm from '../forms/ReceiveLixiForm';
import SpendForm from '../forms/SpendForm';
import DepositForm from '../forms/DepositForm';
import WithdrawForm from '../forms/WithdrawForm';
import EditTransactionForm from '../forms/EditTransactionForm';
import BunnySpeechPopup, { type SpeechType } from '../bunny/BunnySpeechPopup';
import { getActiveChild, calculateBalances, getTransactions } from '../../services/storage';
import type { Child, ChildBalances, Transaction } from '../../types';

export default function DashboardTab() {
  const [activeChild, setActiveChild] = useState<Child | null>(null);
  const [balances, setBalances] = useState<ChildBalances>({ total: 0, holding: 0, guardianTotal: 0, guardians: [] });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showReceiveForm, setShowReceiveForm] = useState(false);
  const [showSpendForm, setShowSpendForm] = useState(false);
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [showWithdrawForm, setShowWithdrawForm] = useState(false);
  const [withdrawGuardian, setWithdrawGuardian] = useState({ name: '', maxAmount: 0 });
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [speechType, setSpeechType] = useState<SpeechType | null>(null);

  const refreshData = useCallback(() => {
    const child = getActiveChild();
    if (child) {
      setActiveChild(child);
      setBalances(calculateBalances(child));
      setTransactions(getTransactions(child.id));
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const handleReceive = () => {
    setSpeechType('receive');
  };

  const handleSpend = () => {
    setSpeechType('spend');
  };

  const handleDeposit = () => {
    setSpeechType('deposit');
  };

  const handleWithdraw = (guardianName: string, maxAmount: number) => {
    setWithdrawGuardian({ name: guardianName, maxAmount });
    setShowWithdrawForm(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setShowEditForm(true);
  };

  const handleSpeechClose = () => {
    const type = speechType;
    setSpeechType(null);

    // Mở form tương ứng sau khi đóng popup
    if (type === 'receive') {
      setShowReceiveForm(true);
    } else if (type === 'spend') {
      setShowSpendForm(true);
    } else if (type === 'deposit') {
      setShowDepositForm(true);
    }
  };

  const handleSuccess = () => {
    refreshData();
  };

  if (!activeChild) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto hide-scrollbar pb-20">
      <div className="py-4">
        <ChildSelector activeChild={activeChild} onChildChange={refreshData} />
      </div>

      <BalanceSummary balances={balances} onWithdraw={handleWithdraw} />

      <ActionButtons
        onReceive={handleReceive}
        onSpend={handleSpend}
        onDeposit={handleDeposit}
      />

      <TransactionList transactions={transactions} onEdit={handleEditTransaction} />

      {/* Bunny Speech Popup */}
      {speechType && (
        <BunnySpeechPopup type={speechType} onClose={handleSpeechClose} />
      )}

      {/* Forms */}
      <ReceiveLixiForm
        isOpen={showReceiveForm}
        onClose={() => setShowReceiveForm(false)}
        onSuccess={handleSuccess}
      />

      <SpendForm
        isOpen={showSpendForm}
        onClose={() => setShowSpendForm(false)}
        onSuccess={handleSuccess}
        maxAmount={balances.holding}
      />

      <DepositForm
        isOpen={showDepositForm}
        onClose={() => setShowDepositForm(false)}
        onSuccess={handleSuccess}
        maxAmount={balances.holding}
      />

      <WithdrawForm
        isOpen={showWithdrawForm}
        onClose={() => setShowWithdrawForm(false)}
        onSuccess={handleSuccess}
        guardianName={withdrawGuardian.name}
        maxAmount={withdrawGuardian.maxAmount}
      />

      <EditTransactionForm
        isOpen={showEditForm}
        onClose={() => {
          setShowEditForm(false);
          setEditingTransaction(null);
        }}
        onSuccess={handleSuccess}
        transaction={editingTransaction}
        childId={activeChild?.id || ''}
      />
    </div>
  );
}
