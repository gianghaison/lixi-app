import { useState, useEffect } from 'react';
import { getAllChildren, deleteChild, clearAllData, changePasscode, verifyPasscode } from '../../services/storage';
import { AVATARS } from '../../utils/constants';
import type { Child } from '../../types';
import Modal from '../common/Modal';
import PasscodeDots from '../auth/PasscodeDots';
import NumericKeypad from '../auth/NumericKeypad';
import { addChild, updateChild } from '../../services/storage';

export default function SettingsTab() {
  const [children, setChildren] = useState<Child[]>([]);
  const [showAddChild, setShowAddChild] = useState(false);
  const [showChangePasscode, setShowChangePasscode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingChild, setEditingChild] = useState<Child | null>(null);

  // Add/Edit child form state
  const [childName, setChildName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);

  // Delete child confirmation state
  const [deletingChild, setDeletingChild] = useState<Child | null>(null);
  const [deleteStep, setDeleteStep] = useState<'confirm' | 'passcode'>('confirm');
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deletePasscode, setDeletePasscode] = useState('');
  const [deletePasscodeError, setDeletePasscodeError] = useState(false);

  // Delete all data confirmation state
  const [deleteAllStep, setDeleteAllStep] = useState<'confirm' | 'passcode'>('confirm');
  const [deleteAllConfirmText, setDeleteAllConfirmText] = useState('');
  const [deleteAllPasscode, setDeleteAllPasscode] = useState('');
  const [deleteAllPasscodeError, setDeleteAllPasscodeError] = useState(false);
  const DELETE_ALL_CONFIRM_TEXT = 'XÓA HẾT';

  // Change passcode state
  const [passcodeStep, setPasscodeStep] = useState<'old' | 'new' | 'confirm'>('old');
  const [oldPasscode, setOldPasscode] = useState('');
  const [newPasscode, setNewPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  useEffect(() => {
    refreshChildren();
  }, []);

  const refreshChildren = () => {
    setChildren(getAllChildren());
  };

  const handleAddChild = () => {
    if (!childName.trim()) return;
    addChild({ name: childName.trim(), avatar: selectedAvatar });
    setChildName('');
    setSelectedAvatar(AVATARS[0]);
    setShowAddChild(false);
    refreshChildren();
  };

  const handleEditChild = () => {
    if (!editingChild || !childName.trim()) return;
    updateChild(editingChild.id, { name: childName.trim(), avatar: selectedAvatar });
    setChildName('');
    setSelectedAvatar(AVATARS[0]);
    setEditingChild(null);
    refreshChildren();
  };

  const openDeleteChildConfirm = (child: Child) => {
    setDeletingChild(child);
    setDeleteStep('confirm');
    setDeleteConfirmText('');
    setDeletePasscode('');
    setDeletePasscodeError(false);
  };

  const closeDeleteChildConfirm = () => {
    setDeletingChild(null);
    setDeleteStep('confirm');
    setDeleteConfirmText('');
    setDeletePasscode('');
    setDeletePasscodeError(false);
  };

  const handleDeletePasscodeKeyPress = (key: string) => {
    if (deletePasscode.length < 4 && !deletePasscodeError) {
      const newCode = deletePasscode + key;
      setDeletePasscode(newCode);

      if (newCode.length === 4) {
        if (verifyPasscode(newCode)) {
          // Passcode correct, delete the child
          if (deletingChild) {
            deleteChild(deletingChild.id);
            refreshChildren();
            closeDeleteChildConfirm();
          }
        } else {
          setDeletePasscodeError(true);
          setTimeout(() => {
            setDeletePasscodeError(false);
            setDeletePasscode('');
          }, 500);
        }
      }
    }
  };

  const handleDeletePasscodeDelete = () => {
    if (!deletePasscodeError) {
      setDeletePasscode(deletePasscode.slice(0, -1));
    }
  };

  const proceedToDeletePasscode = () => {
    if (deletingChild && deleteConfirmText === deletingChild.name) {
      setDeleteStep('passcode');
    }
  };

  const openEditChild = (child: Child) => {
    setEditingChild(child);
    setChildName(child.name);
    setSelectedAvatar(child.avatar);
  };

  const closeDeleteAllConfirm = () => {
    setShowDeleteConfirm(false);
    setDeleteAllStep('confirm');
    setDeleteAllConfirmText('');
    setDeleteAllPasscode('');
    setDeleteAllPasscodeError(false);
  };

  const handleDeleteAllPasscodeKeyPress = (key: string) => {
    if (deleteAllPasscode.length < 4 && !deleteAllPasscodeError) {
      const newCode = deleteAllPasscode + key;
      setDeleteAllPasscode(newCode);

      if (newCode.length === 4) {
        if (verifyPasscode(newCode)) {
          clearAllData();
          window.location.reload();
        } else {
          setDeleteAllPasscodeError(true);
          setTimeout(() => {
            setDeleteAllPasscodeError(false);
            setDeleteAllPasscode('');
          }, 500);
        }
      }
    }
  };

  const handleDeleteAllPasscodeDelete = () => {
    if (!deleteAllPasscodeError) {
      setDeleteAllPasscode(deleteAllPasscode.slice(0, -1));
    }
  };

  const proceedToDeleteAllPasscode = () => {
    if (deleteAllConfirmText === DELETE_ALL_CONFIRM_TEXT) {
      setDeleteAllStep('passcode');
    }
  };

  // Passcode handling
  const currentPasscode = passcodeStep === 'old' ? oldPasscode : passcodeStep === 'new' ? newPasscode : confirmPasscode;
  const setCurrentPasscode = passcodeStep === 'old' ? setOldPasscode : passcodeStep === 'new' ? setNewPasscode : setConfirmPasscode;

  const handlePasscodeKeyPress = (key: string) => {
    if (currentPasscode.length < 4 && !passcodeError) {
      const newCode = currentPasscode + key;
      setCurrentPasscode(newCode);

      if (newCode.length === 4) {
        if (passcodeStep === 'old') {
          if (verifyPasscode(newCode)) {
            setTimeout(() => setPasscodeStep('new'), 300);
          } else {
            setPasscodeError(true);
            setTimeout(() => {
              setPasscodeError(false);
              setOldPasscode('');
            }, 500);
          }
        } else if (passcodeStep === 'new') {
          setTimeout(() => setPasscodeStep('confirm'), 300);
        } else if (passcodeStep === 'confirm') {
          if (newCode === newPasscode) {
            changePasscode(newCode);
            resetPasscodeState();
            setShowChangePasscode(false);
            alert('Đã đổi mã PIN thành công!');
          } else {
            setPasscodeError(true);
            setTimeout(() => {
              setPasscodeError(false);
              setConfirmPasscode('');
            }, 500);
          }
        }
      }
    }
  };

  const handlePasscodeDelete = () => {
    if (!passcodeError) {
      setCurrentPasscode(currentPasscode.slice(0, -1));
    }
  };

  const resetPasscodeState = () => {
    setPasscodeStep('old');
    setOldPasscode('');
    setNewPasscode('');
    setConfirmPasscode('');
    setPasscodeError(false);
  };

  const closePasscodeModal = () => {
    resetPasscodeState();
    setShowChangePasscode(false);
  };

  return (
    <div className="flex-1 overflow-y-auto hide-scrollbar pb-20">
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">⚙️ Cài đặt</h1>

        {/* Children List */}
        <div className="bg-white rounded-2xl shadow-sm mb-4">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-800">Danh sách bé</h2>
            <button
              onClick={() => setShowAddChild(true)}
              className="text-pink-500 font-semibold text-sm"
            >
              + Thêm bé
            </button>
          </div>
          <div className="divide-y divide-gray-100">
            {children.map((child) => (
              <div key={child.id} className="px-4 py-3 flex items-center gap-3">
                <span className="text-2xl">{child.avatar}</span>
                <span className="flex-1 font-semibold text-gray-800">{child.name}</span>
                <button
                  onClick={() => openEditChild(child)}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  Sửa
                </button>
                {children.length > 1 && (
                  <button
                    onClick={() => openDeleteChildConfirm(child)}
                    className="px-3 py-1 text-sm text-red-500 hover:text-red-700"
                  >
                    Xóa
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tip for parents */}
        <div className="bg-green-50 border border-green-100 rounded-xl p-3 mb-6">
          <p className="text-sm text-green-700">
            👨‍👩‍👧‍👦 <strong>Dành cho bố mẹ:</strong> Bấm "+ Thêm bé" để tạo hồ sơ riêng cho từng bé. Mỗi bé sẽ có hũ lì xì và lịch sử riêng!
          </p>
        </div>

        {/* Security */}
        <div className="bg-white rounded-2xl shadow-sm mb-6">
          <h2 className="px-4 py-3 font-bold text-gray-800 border-b border-gray-100">
            Bảo mật
          </h2>
          <button
            onClick={() => setShowChangePasscode(true)}
            className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-50"
          >
            <span className="text-xl">🔐</span>
            <span className="flex-1 text-gray-800">Đổi mã PIN</span>
            <span className="text-gray-400">→</span>
          </button>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl shadow-sm mb-6">
          <h2 className="px-4 py-3 font-bold text-red-600 border-b border-gray-100">
            Vùng nguy hiểm
          </h2>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-red-50"
          >
            <span className="text-xl">🗑️</span>
            <span className="flex-1 text-red-600">Xóa toàn bộ dữ liệu</span>
          </button>
        </div>

        {/* Privacy Notice */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-xl">🔒</span>
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Quyền riêng tư của bạn</p>
              <p className="text-blue-600">
                Dữ liệu được lưu trữ hoàn toàn trên thiết bị của bạn. Ứng dụng không thu thập, không gửi bất kỳ thông tin nào lên máy chủ.
              </p>
            </div>
          </div>
        </div>

        {/* Data Warning */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div className="text-sm text-amber-800">
              <p className="font-semibold mb-1">Lưu ý về dữ liệu</p>
              <p className="text-amber-700 mb-2">
                Dữ liệu sẽ bị mất nếu bạn:
              </p>
              <ul className="text-amber-600 space-y-1 list-disc list-inside">
                <li>Đổi sang trình duyệt khác</li>
                <li>Xóa dữ liệu trình duyệt (Clear cache)</li>
                <li>Dùng chế độ ẩn danh (Incognito)</li>
                <li>Cài lại trình duyệt</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Credits */}
        <div className="text-center text-gray-500 text-sm">
          <p>Phát triển bởi huvang.vn</p>
          <p className="mt-1">Phiên bản 1.0.0</p>
        </div>
      </div>

      {/* Add/Edit Child Modal */}
      <Modal
        isOpen={showAddChild || !!editingChild}
        onClose={() => {
          setShowAddChild(false);
          setEditingChild(null);
          setChildName('');
          setSelectedAvatar(AVATARS[0]);
        }}
        title={editingChild ? 'Sửa thông tin bé' : 'Thêm bé mới'}
      >
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tên bé
          </label>
          <input
            type="text"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            placeholder="Nhập tên bé..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-pink-400 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Chọn avatar
          </label>
          <div className="flex flex-wrap gap-3 justify-center">
            {AVATARS.map((avatar) => (
              <button
                key={avatar}
                onClick={() => setSelectedAvatar(avatar)}
                className={`w-12 h-12 text-2xl rounded-full flex items-center justify-center transition-all ${
                  selectedAvatar === avatar
                    ? 'bg-tet-yellow scale-110 shadow-md'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {avatar}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={editingChild ? handleEditChild : handleAddChild}
          disabled={!childName.trim()}
          className="w-full py-4 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold text-lg rounded-xl hover:bg-gradient-to-r from-pink-400 to-rose-400-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {editingChild ? 'Lưu thay đổi' : 'Thêm bé'}
        </button>
      </Modal>

      {/* Change Passcode Modal */}
      <Modal
        isOpen={showChangePasscode}
        onClose={closePasscodeModal}
        title="Đổi mã PIN"
      >
        <div className="text-center mb-8">
          <p className="text-gray-600">
            {passcodeStep === 'old' && 'Nhập mã PIN hiện tại'}
            {passcodeStep === 'new' && 'Nhập mã PIN mới'}
            {passcodeStep === 'confirm' && 'Xác nhận mã PIN mới'}
          </p>
          {passcodeError && (
            <p className="text-red-500 mt-2 text-sm">
              {passcodeStep === 'old' ? 'Mã PIN không đúng!' : 'Mã PIN không khớp!'}
            </p>
          )}
        </div>

        <div className="mb-8">
          <PasscodeDots enteredCount={currentPasscode.length} error={passcodeError} />
        </div>

        <NumericKeypad
          onKeyPress={handlePasscodeKeyPress}
          onDelete={handlePasscodeDelete}
        />

        {passcodeStep !== 'old' && (
          <button
            onClick={() => {
              if (passcodeStep === 'new') {
                setPasscodeStep('old');
                setNewPasscode('');
              } else {
                setPasscodeStep('new');
                setConfirmPasscode('');
              }
            }}
            className="w-full mt-6 text-gray-500 hover:text-gray-700"
          >
            ← Quay lại
          </button>
        )}
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal
        isOpen={showDeleteConfirm}
        onClose={closeDeleteAllConfirm}
        title="Xóa toàn bộ dữ liệu"
      >
        {deleteAllStep === 'confirm' && (
          <div>
            <div className="text-center mb-6">
              <p className="text-5xl mb-4">🚨</p>
              <p className="text-red-600 font-bold mb-2">
                CẢNH BÁO: Hành động này không thể hoàn tác!
              </p>
              <p className="text-gray-600 text-sm">
                Tất cả dữ liệu của tất cả các bé, lịch sử lì xì, mã QR sẽ bị xóa vĩnh viễn.
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nhập "<span className="text-red-600">{DELETE_ALL_CONFIRM_TEXT}</span>" để xác nhận:
              </label>
              <input
                type="text"
                value={deleteAllConfirmText}
                onChange={(e) => setDeleteAllConfirmText(e.target.value.toUpperCase())}
                placeholder={`Nhập ${DELETE_ALL_CONFIRM_TEXT}...`}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-red-400 focus:outline-none uppercase"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={closeDeleteAllConfirm}
                className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={proceedToDeleteAllPasscode}
                disabled={deleteAllConfirmText !== DELETE_ALL_CONFIRM_TEXT}
                className="flex-1 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Tiếp tục
              </button>
            </div>
          </div>
        )}

        {deleteAllStep === 'passcode' && (
          <div>
            <div className="text-center mb-6">
              <p className="text-gray-600">
                Nhập mã PIN để xác nhận <strong className="text-red-600">xóa toàn bộ dữ liệu</strong>
              </p>
              {deleteAllPasscodeError && (
                <p className="text-red-500 mt-2 text-sm">Mã PIN không đúng!</p>
              )}
            </div>

            <div className="mb-8">
              <PasscodeDots enteredCount={deleteAllPasscode.length} error={deleteAllPasscodeError} />
            </div>

            <NumericKeypad
              onKeyPress={handleDeleteAllPasscodeKeyPress}
              onDelete={handleDeleteAllPasscodeDelete}
            />

            <button
              type="button"
              onClick={() => {
                setDeleteAllStep('confirm');
                setDeleteAllPasscode('');
                setDeleteAllPasscodeError(false);
              }}
              className="w-full mt-6 text-gray-500 hover:text-gray-700"
            >
              ← Quay lại
            </button>
          </div>
        )}
      </Modal>

      {/* Delete Child Confirm Modal */}
      <Modal
        isOpen={!!deletingChild}
        onClose={closeDeleteChildConfirm}
        title="Xóa bé"
      >
        {deletingChild && deleteStep === 'confirm' && (
          <div>
            <div className="text-center mb-6">
              <p className="text-5xl mb-4">{deletingChild.avatar}</p>
              <p className="text-gray-600 mb-2">
                Bạn có chắc muốn xóa <strong className="text-red-600">{deletingChild.name}</strong>?
              </p>
              <p className="text-gray-500 text-sm">
                Tất cả lịch sử lì xì và dữ liệu của bé sẽ bị xóa vĩnh viễn!
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nhập "<span className="text-red-600">{deletingChild.name}</span>" để xác nhận:
              </label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder={`Nhập ${deletingChild.name}...`}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-red-400 focus:outline-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={closeDeleteChildConfirm}
                className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={proceedToDeletePasscode}
                disabled={deleteConfirmText !== deletingChild.name}
                className="flex-1 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Tiếp tục
              </button>
            </div>
          </div>
        )}

        {deletingChild && deleteStep === 'passcode' && (
          <div>
            <div className="text-center mb-6">
              <p className="text-gray-600">
                Nhập mã PIN để xác nhận xóa <strong className="text-red-600">{deletingChild.name}</strong>
              </p>
              {deletePasscodeError && (
                <p className="text-red-500 mt-2 text-sm">Mã PIN không đúng!</p>
              )}
            </div>

            <div className="mb-8">
              <PasscodeDots enteredCount={deletePasscode.length} error={deletePasscodeError} />
            </div>

            <NumericKeypad
              onKeyPress={handleDeletePasscodeKeyPress}
              onDelete={handleDeletePasscodeDelete}
            />

            <button
              type="button"
              onClick={() => {
                setDeleteStep('confirm');
                setDeletePasscode('');
                setDeletePasscodeError(false);
              }}
              className="w-full mt-6 text-gray-500 hover:text-gray-700"
            >
              ← Quay lại
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
