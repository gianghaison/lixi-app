import { useState, useEffect, useRef } from 'react';
import { getActiveChild, addQRCode, deleteQRCode, getQRCodes } from '../../services/storage';
import type { QRCode } from '../../types';
import Modal from '../common/Modal';

interface Article {
  id: string;
  title: string;
  emoji: string;
  category: 'app' | 'tet';
  content: string;
}

const articles: Article[] = [
  {
    id: '1',
    title: 'Giới thiệu về Hũ Lì Xì',
    emoji: '🧧',
    category: 'app',
    content: `**Hũ Lì Xì** là ứng dụng giúp các bé quản lý tiền lì xì một cách vui vẻ và khoa học!

**Tại sao cần Hũ Lì Xì?**
Mỗi dịp Tết, các bé thường nhận được rất nhiều tiền lì xì. Tuy nhiên, nhiều bé chưa biết cách quản lý số tiền này. Hũ Lì Xì ra đời để giúp bé:

• **Ghi chép cẩn thận**: Biết mình nhận được bao nhiêu tiền, từ ai
• **Học cách tiết kiệm**: Phân chia tiền giữ và tiền gửi ba mẹ
• **Hiểu giá trị đồng tiền**: Mỗi khoản chi tiêu đều được ghi nhận

**Cách sử dụng:**
1. Tạo hồ sơ cho bé với tên và avatar cute
2. Mỗi khi nhận lì xì, bé ghi vào app
3. Khi muốn chi tiêu, app sẽ nhắc nhở bé suy nghĩ kỹ
4. Bé có thể gửi tiền cho ba mẹ giữ hộ

Với Hũ Lì Xì, việc quản lý tiền trở nên thú vị như một trò chơi! 🎮`
  },
  {
    id: '2',
    title: 'Hướng dẫn ba mẹ dạy con chi tiêu',
    emoji: '👨‍👩‍👧',
    category: 'app',
    content: `**Dạy con chi tiêu thông minh từ nhỏ**

Ba mẹ có vai trò quan trọng trong việc hình thành thói quen tài chính cho con. Dưới đây là một số gợi ý:

**1. Bắt đầu từ những điều đơn giản**
• Giải thích tiền từ đâu mà có (ba mẹ đi làm)
• Cho bé tham gia mua sắm nhỏ tại siêu thị
• Hỏi bé "Theo con, cái này có cần thiết không?"

**2. Phân loại nhu cầu**
• **Cần thiết**: Đồ dùng học tập, sách vở
• **Muốn có**: Đồ chơi, quà vặt
• **Tiết kiệm**: Để dành cho mục tiêu lớn hơn

**3. Quy tắc 3 chiếc hũ**
Dạy bé chia tiền thành 3 phần:
• 🏦 **Tiết kiệm** (50%): Gửi ba mẹ giữ
• 🎁 **Chi tiêu** (30%): Mua những thứ bé muốn
• ❤️ **Chia sẻ** (20%): Giúp đỡ người khác

**4. Để bé tự quyết định**
Cho bé quyền quyết định một phần tiền nhỏ, để bé học từ kinh nghiệm thực tế. Nếu bé mua sai, đó cũng là bài học quý!

**5. Khen ngợi khi bé tiết kiệm**
Mỗi khi bé gửi tiền cho ba mẹ giữ, hãy khen ngợi và ghi nhận sự trưởng thành của bé! 👏`
  },
  {
    id: '3',
    title: 'Ý nghĩa của việc dùng Hũ Lì Xì',
    emoji: '💝',
    category: 'app',
    content: `**Hũ Lì Xì không chỉ là app ghi chép tiền!**

Mỗi tính năng của Hũ Lì Xí đều mang một ý nghĩa giáo dục sâu sắc:

**🧧 Ghi nhận người lì xì**
Khi bé ghi tên người lì xì, bé sẽ:
• Nhớ được ai đã quan tâm đến mình
• Học cách biết ơn và trân trọng
• Nhớ nói lời cảm ơn

**💡 Suy nghĩ trước khi chi tiêu**
App luôn hỏi bé "có cần thiết không?" trước khi chi tiêu:
• Rèn luyện tính kiên nhẫn
• Tránh mua hàng bốc đồng
• Học phân biệt "cần" và "muốn"

**🏦 Gửi tiền cho ba mẹ giữ**
Tính năng này giúp bé:
• Hiểu giá trị của việc để dành
• Tin tưởng và gắn kết với ba mẹ
• Có mục tiêu tiết kiệm dài hạn

**📊 Xem lịch sử giao dịch**
Bé có thể nhìn lại và học hỏi:
• Tiền đã đi đâu?
• Chi tiêu có hợp lý không?
• Lần sau nên làm gì khác?

Hũ Lì Xì biến việc quản lý tiền thành một hành trình học hỏi đầy thú vị! 🌟`
  },
  {
    id: '4',
    title: 'Tầm quan trọng của dạy bé tiết kiệm',
    emoji: '🐷',
    category: 'app',
    content: `**Tại sao cần dạy bé tiết kiệm từ nhỏ?**

Tiết kiệm là kỹ năng sống quan trọng, và tuổi thơ là thời điểm vàng để hình thành thói quen này!

**Lợi ích của việc tiết kiệm sớm:**

**1. Rèn tính kiên nhẫn**
Bé học cách chờ đợi để có được thứ mình muốn, thay vì đòi hỏi ngay lập tức.

**2. Hiểu giá trị lao động**
Khi bé phải tiết kiệm lâu mới mua được món đồ, bé sẽ trân trọng nó hơn.

**3. Chuẩn bị cho tương lai**
Thói quen tiết kiệm từ nhỏ sẽ theo bé suốt đời, giúp bé có cuộc sống ổn định.

**4. Tăng sự tự tin**
Bé cảm thấy tự hào khi đạt được mục tiêu tiết kiệm của mình.

**Cách khuyến khích bé tiết kiệm:**

• 🎯 **Đặt mục tiêu cụ thể**: "Tiết kiệm 500.000đ để mua bộ LEGO"
• 📈 **Theo dõi tiến độ**: Dùng Hũ Lì Xì để xem bé đã tiết kiệm được bao nhiêu
• 🎉 **Ăn mừng thành công**: Khi đạt mục tiêu, cùng bé đi mua món đồ đã hẹn
• 💰 **Thưởng thêm**: Ba mẹ có thể thêm một ít tiền khi bé đạt mốc

Hãy bắt đầu từ những mục tiêu nhỏ và tăng dần. Bé sẽ rất vui khi thấy số tiền trong "hũ" tăng lên mỗi ngày! 🌱`
  },
  {
    id: '5',
    title: 'Phong tục lì xì của người Việt',
    emoji: '🏮',
    category: 'tet',
    content: `**Lì xì - Nét đẹp văn hóa ngày Tết**

Lì xì (hay còn gọi là "tiền mừng tuổi") là một phong tục đẹp của người Việt Nam mỗi dịp Tết đến Xuân về.

**Nguồn gốc của lì xì:**
Từ "lì xì" bắt nguồn từ tiếng Trung "利是" (lì shì), có nghĩa là "điều tốt lành". Phong tục này đã có từ hàng nghìn năm trước.

**Ý nghĩa của phong tục lì xì:**

• 🍀 **Chúc may mắn**: Tiền lì xì tượng trưng cho lời chúc may mắn, sức khỏe và bình an trong năm mới.

• ❤️ **Thể hiện tình thương**: Người lớn lì xì cho trẻ em là cách thể hiện sự quan tâm, yêu thương.

• 🙏 **Kính trọng người già**: Con cháu lì xì ông bà, cha mẹ thể hiện lòng hiếu thảo.

**Cách nhận lì xì đúng lễ nghĩa:**
1. Chắp tay và cúi chào người lì xì
2. Nhận bao lì xì bằng hai tay
3. Nói "Con cảm ơn [ông/bà/cô/chú]"
4. Chúc lại người lì xì sức khỏe, may mắn
5. KHÔNG mở bao lì xì trước mặt người tặng

**Lưu ý:**
Giá trị của lì xì không nằm ở số tiền nhiều hay ít, mà ở tấm lòng và lời chúc tốt đẹp! 💕`
  },
  {
    id: '6',
    title: 'Tết Nguyên Đán - Ngày hội lớn nhất',
    emoji: '🎊',
    category: 'tet',
    content: `**Tết Nguyên Đán - Linh hồn văn hóa Việt**

Tết Nguyên Đán là lễ hội truyền thống quan trọng nhất của người Việt Nam, đánh dấu sự chuyển giao giữa năm cũ và năm mới theo lịch âm.

**"Nguyên Đán" nghĩa là gì?**
• "Nguyên" = đầu tiên, khởi đầu
• "Đán" = buổi sáng sớm
→ Tết Nguyên Đán là "buổi sáng đầu tiên" của năm mới!

**Các hoạt động đặc trưng:**

🏠 **Trước Tết:**
• Dọn dẹp nhà cửa sạch sẽ
• Mua sắm bánh kẹo, hoa quả
• Gói bánh chưng, bánh tét
• Trang trí hoa đào (miền Bắc), hoa mai (miền Nam)

🎆 **Đêm Giao thừa:**
• Cả gia đình sum họp
• Đếm ngược và đón năm mới
• Xem pháo hoa
• Hái lộc đầu năm

🧧 **Ngày Tết:**
• Chúc Tết ông bà, cha mẹ
• Nhận và phát lì xì
• Thăm họ hàng, bạn bè
• Ăn các món ăn truyền thống

**Món ăn ngày Tết:**
• 🍚 Bánh chưng, bánh tét
• 🥢 Thịt kho tàu, dưa hành
• 🍬 Mứt Tết, hạt dưa
• 🍊 Mâm ngũ quả

Tết là dịp để gia đình sum họp, cùng nhau đón chào một năm mới an khang, thịnh vượng! 🎉`
  },
  {
    id: '7',
    title: 'Màu đỏ và vàng ngày Tết',
    emoji: '🔴',
    category: 'tet',
    content: `**Tại sao Tết lại nhiều màu đỏ và vàng?**

Nếu để ý, các bé sẽ thấy ngày Tết đâu đâu cũng có màu đỏ và vàng: bao lì xì, câu đối, đèn lồng, hoa mai... Đó không phải ngẫu nhiên đâu nhé!

**🔴 Màu đỏ - Màu của may mắn:**

Người Việt và các nước châu Á tin rằng màu đỏ mang lại:
• May mắn và tài lộc
• Xua đuổi điều xui xẻo
• Niềm vui và hạnh phúc

**Truyền thuyết về màu đỏ:**
Ngày xưa, có một con quái vật tên "Niên" (năm) hay đến quấy phá dân làng vào đêm Giao thừa. Người ta phát hiện con Niên sợ màu đỏ và tiếng ồn, nên họ treo đèn lồng đỏ, dán câu đối đỏ và đốt pháo để xua đuổi nó!

**🟡 Màu vàng - Màu của thịnh vượng:**

Màu vàng tượng trưng cho:
• Vàng bạc, châu báu
• Sự giàu có, sung túc
• Hoàng gia, cao quý

**Ứng dụng trong ngày Tết:**
• 🧧 **Bao lì xì đỏ**: Chúc may mắn
• 🌸 **Hoa mai vàng**: Chúc thịnh vượng
• 🏮 **Đèn lồng đỏ**: Xua điều xấu
• 📜 **Câu đối đỏ**: Lời chúc tốt đẹp

Giờ thì các bé hiểu tại sao Hũ Lì Xí cũng dùng nhiều màu đỏ và vàng rồi nhé! Chúc các bé năm mới thật nhiều may mắn! 🎊`
  }
];

export default function QRCodeTab() {
  const [qrCodes, setQrCodes] = useState<QRCode[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedQR, setSelectedQR] = useState<QRCode | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const [ownerName, setOwnerName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadQRCodes = () => {
    const child = getActiveChild();
    if (child) {
      setQrCodes(getQRCodes(child.id));
    }
  };

  useEffect(() => {
    loadQRCodes();
  }, []);

  // Nén ảnh để tránh vượt quá dung lượng localStorage
  const compressImage = (file: File, maxWidth = 400, quality = 0.7): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Resize nếu ảnh quá lớn
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Cannot get canvas context'));
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedBase64);
        };
        img.onerror = () => reject(new Error('Cannot load image'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Cannot read file'));
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);

    try {
      const compressedBase64 = await compressImage(file);
      setPendingImage(compressedBase64);
      setShowAddForm(true);
    } catch (error) {
      console.error('Error compressing image:', error);
      alert('Không thể đọc file. Vui lòng thử lại!');
    } finally {
      setIsLoading(false);
      // Reset input để có thể chọn cùng file lần nữa
      event.target.value = '';
    }
  };

  const handleSaveQRCode = () => {
    if (!pendingImage || !ownerName.trim()) {
      return;
    }

    const child = getActiveChild();
    if (!child) {
      alert('Không tìm thấy thông tin bé. Vui lòng thử lại!');
      return;
    }

    try {
      addQRCode(child.id, ownerName.trim(), pendingImage);
      loadQRCodes();
      setShowAddForm(false);
      setPendingImage(null);
      setOwnerName('');
    } catch (error) {
      console.error('Error saving QR code:', error);
      alert('Không thể lưu mã QR. Bộ nhớ có thể đã đầy. Vui lòng xóa bớt dữ liệu cũ!');
    }
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
    setPendingImage(null);
    setOwnerName('');
  };

  const handleRemoveQR = (qrCodeId: string) => {
    const child = getActiveChild();
    if (child) {
      deleteQRCode(child.id, qrCodeId);
      loadQRCodes();
      setSelectedQR(null);
    }
  };

  const ownerSuggestions = ['Bố', 'Mẹ', 'Ông nội', 'Bà nội', 'Ông ngoại', 'Bà ngoại'];

  return (
    <div className="flex-1 overflow-y-auto hide-scrollbar pb-20 px-4 pt-6">
      {/* Title */}
      <div className="text-center mb-6">
        <p className="text-5xl mb-2">📱</p>
        <h1 className="text-2xl font-bold text-gray-700">Mã QR nhận lì xì</h1>
      </div>

      {/* Danh sách mã QR */}
      {qrCodes.length > 0 && (
        <div className="space-y-3 mb-4">
          {qrCodes.map((qr) => (
            <button
              key={qr.id}
              onClick={() => setSelectedQR(qr)}
              className="w-full bg-white/80 backdrop-blur rounded-2xl p-4 shadow-md flex items-center gap-4 hover:bg-pink-50/80 transition-all active:scale-[0.98]"
            >
              <img
                src={qr.image}
                alt={qr.ownerName}
                className="w-16 h-16 rounded-xl object-cover shadow-sm"
              />
              <div className="flex-1 text-left">
                <p className="font-bold text-gray-700 text-lg">{qr.ownerName}</p>
                <p className="text-gray-500 text-sm">Bấm để xem mã QR</p>
              </div>
              <span className="text-gray-400 text-2xl">›</span>
            </button>
          ))}
        </div>
      )}

      {/* Nút thêm mã QR */}
      <div className="bg-white/80 backdrop-blur rounded-3xl p-6 shadow-lg text-center">
        {qrCodes.length === 0 && (
          <>
            <div className="text-6xl mb-4">🧧</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              Chưa có mã QR
            </h3>
            <p className="text-gray-500 mb-6 text-sm">
              Thêm ảnh mã QR ngân hàng để người lớn có thể quét và chuyển tiền lì xì cho bé!
            </p>
          </>
        )}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
          className="w-full py-4 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold text-lg rounded-2xl hover:opacity-90 transition-all disabled:opacity-50 shadow-lg"
        >
          {isLoading ? 'Đang tải...' : qrCodes.length > 0 ? '➕ Thêm mã QR mới' : '📷 Thêm mã QR'}
        </button>
      </div>

      {/* Modal xem mã QR */}
      <Modal
        isOpen={!!selectedQR}
        onClose={() => setSelectedQR(null)}
        title={`Mã QR của ${selectedQR?.ownerName || ''}`}
      >
        {selectedQR && (
          <div className="text-center">
            <img
              src={selectedQR.image}
              alt={selectedQR.ownerName}
              className="w-full max-w-[280px] mx-auto rounded-2xl shadow-md mb-4"
            />
            <p className="text-gray-600 text-sm mb-4">
              Cho người lớn quét mã này để chuyển tiền lì xì nha!
            </p>
            <p className="text-amber-600 bg-amber-50 rounded-xl p-3 text-sm mb-4">
              💡 Tiền chuyển vào mã QR này sẽ do <strong>{selectedQR.ownerName}</strong> giữ hộ
            </p>
            <button
              onClick={() => handleRemoveQR(selectedQR.id)}
              className="w-full py-3 bg-red-100 text-red-500 font-semibold rounded-xl hover:bg-red-200 transition-colors"
            >
              🗑️ Xóa mã QR này
            </button>
          </div>
        )}
      </Modal>

      {/* Modal thêm mã QR mới */}
      <Modal
        isOpen={showAddForm}
        onClose={handleCancelAdd}
        title="Thêm mã QR mới"
      >
        <div className="text-center">
          {pendingImage && (
            <img
              src={pendingImage}
              alt="QR Preview"
              className="w-full max-w-[200px] mx-auto rounded-2xl shadow-md mb-4"
            />
          )}

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
              Đây là mã QR của ai?
            </label>
            <input
              type="text"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              placeholder="Nhập tên người giữ tài khoản..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-pink-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {ownerSuggestions.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setOwnerName(name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  ownerName === name
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {name}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleCancelAdd}
              className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleSaveQRCode}
              disabled={!ownerName.trim()}
              className="flex-1 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold rounded-xl hover:opacity-90 disabled:opacity-50 transition-all"
            >
              Lưu
            </button>
          </div>
        </div>
      </Modal>

      {/* Hướng dẫn */}
      <div className="mt-6 bg-white/60 backdrop-blur border border-pink-100 rounded-2xl p-4">
        <h4 className="font-bold text-gray-700 mb-2">💡 Hướng dẫn</h4>
        <ol className="text-sm text-gray-600 space-y-1">
          <li>1. Mở app ngân hàng của bố mẹ</li>
          <li>2. Chụp ảnh màn hình mã QR nhận tiền</li>
          <li>3. Bấm "Thêm mã QR" và chọn ảnh vừa chụp</li>
        </ol>
      </div>

      {/* Bài viết về ứng dụng */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
          <span className="text-2xl">📚</span>
          Tìm hiểu về Hũ Lì Xì
        </h3>
        <div className="space-y-3">
          {articles.filter(a => a.category === 'app').map((article) => (
            <button
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="w-full bg-white/80 backdrop-blur border border-amber-100 rounded-2xl p-4 text-left hover:bg-amber-50/80 hover:border-amber-200 transition-all active:scale-[0.98] shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{article.emoji}</span>
                <span className="font-semibold text-gray-700 flex-1">{article.title}</span>
                <span className="text-gray-400 text-xl">›</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bài viết về Tết */}
      <div className="mt-8 mb-4">
        <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
          <span className="text-2xl">🎋</span>
          Phong tục ngày Tết
        </h3>
        <div className="space-y-3">
          {articles.filter(a => a.category === 'tet').map((article) => (
            <button
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="w-full bg-white/80 backdrop-blur border border-rose-100 rounded-2xl p-4 text-left hover:bg-rose-50/80 hover:border-rose-200 transition-all active:scale-[0.98] shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{article.emoji}</span>
                <span className="font-semibold text-gray-700 flex-1">{article.title}</span>
                <span className="text-gray-400 text-xl">›</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal đọc bài viết */}
      <Modal
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        title={selectedArticle?.title || ''}
      >
        {selectedArticle && (
          <div className="article-content">
            <div className="text-center mb-4">
              <span className="text-5xl">{selectedArticle.emoji}</span>
            </div>
            <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed">
              {selectedArticle.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4 whitespace-pre-line">
                  {paragraph.split('**').map((part, i) =>
                    i % 2 === 1 ? (
                      <strong key={i} className="text-gray-800 font-bold">{part}</strong>
                    ) : (
                      <span key={i}>{part}</span>
                    )
                  )}
                </p>
              ))}
            </div>
          </div>
        )}
      </Modal>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
}
