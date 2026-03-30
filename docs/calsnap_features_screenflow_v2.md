# CalSnap — Features & Screen Flow (v2)
> Cập nhật: tái cấu trúc navigation, thêm chat, thêm portrait/feast mode, chuẩn hoá menu bar

---

## 1. DANH SÁCH CHỨC NĂNG

### AUTH & ONBOARDING
- F01 · Splash screen / loading
- F02 · Đăng ký tài khoản (email + password)
- F03 · Đăng nhập
- F04 · Quên mật khẩu / reset qua email
- F05 · Nhập thông tin cá nhân (tên, tuổi, giới tính, cân nặng, chiều cao, % mỡ cơ thể nếu biết)
- F06 · Chọn mục tiêu: Giảm cân / Tăng cơ / Duy trì cân
- F07 · Auto-tính TDEE & đề xuất lượng calo cần nạp mỗi ngày dựa trên thông số + mục tiêu
- F08 · Đăng xuất

### BODY METRICS & CALORIE GOAL
- F09 · Màn khai báo chỉ số cơ thể độc lập (truy cập lại được từ Profile → Cài đặt)
- F10 · Nhập: cân nặng (kg), chiều cao (cm), tuổi, giới tính
- F11 · Chọn mức độ vận động: Ít vận động / Vừa phải / Năng động / Rất năng động
- F12 · Chọn nhu cầu: Giảm cân (thâm hụt -300 đến -500 kcal) / Tăng cơ (+200 đến +300 kcal) / Duy trì (= TDEE)
- F13 · Hệ thống đề xuất mức calo mục tiêu cụ thể (VD: "Bạn nên nạp 1,750 kcal/ngày")
- F14 · Cho phép user tự chỉnh con số đề xuất nếu muốn
- F15 · Cập nhật cân nặng định kỳ → recalculate TDEE tự động

### CAMERA & CAPTURE
- F16 · Màn chính khi mở app là màn Camera (không phải feed)
- F17 · Camera hiển thị ở định dạng VUÔNG (1:1) ở giữa màn hình — KHÔNG full-screen
- F18 · Phía trên khung vuông: 2 nút (Thêm bạn / Avatar cá nhân)
- F19 · Phía dưới khung vuông: lưới ảnh cuộn được (3 ảnh/hàng)
- F20 · Chụp ảnh trực tiếp từ camera (đồ ăn hoặc bài tập)
- F21 · Upload ảnh từ thư viện điện thoại (thay thế chụp mới)
- F22 · Chọn loại log: Đồ ăn / Tập luyện (toggle bên dưới khung vuông, trên lưới ảnh)
- F23 · Flip camera (trước / sau)
- F24 · Bật / tắt flash (auto / on / off)
- F25 · Thêm mô tả text cho ảnh (tuỳ chọn, không bắt buộc)

### PHOTO QUALITY GUIDANCE
- F26 · Hướng dẫn chụp ảnh đúng cách: hiển thị overlay khung vuông với gợi ý "Giữ món ăn trong khung"
- F27 · AI kiểm tra chất lượng ảnh trước khi phân tích: cảnh báo nếu ảnh quá tối / mờ / góc nghiêng quá nhiều
- F28 · Cảnh báo nếu ảnh chứa nhiều món lẫn lộn không rõ ràng: "Ảnh chứa nhiều món — hãy chụp riêng từng món để tracking chính xác hơn"
- F29 · Gợi ý user chụp lại hoặc tiếp tục với cảnh báo sai số cao

### PARTY / FEAST MODE — ĂN TIỆC / ĐÁM CỖ
- F30 · Sau khi AI nhận dạng món ăn trong ảnh tiệc/cỗ → hiển thị nút "Ăn chung — nhập phần của bạn"
- F31 · User nhập: ăn 1/n phần (VD: 1/4, 1/6, 1/8...) hoặc kéo thanh slider từ 1/10 đến 1/1
- F32 · Hệ thống tính: calo = tổng calo món ÷ n → hiển thị kết quả đã chia
- F33 · Hiển thị rõ: "Phần của bạn (1/4 đĩa): ~120 kcal" kèm macro tương ứng
- F34 · Cho phép nhập số người ăn chung thay vì nhập phân số thủ công (VD: "5 người ăn" → tự tính 1/5)
- F35 · Lưu bình thường vào log sau khi confirm phần ăn

### AI ANALYSIS (GEMINI)
- F36 · Gửi ảnh lên Gemini Vision API phân tích (qua Supabase Edge Function)
- F37 · Gemini nhận dạng tên món ăn / tên bài tập (tiếng Việt)
- F38 · Gemini ước lượng calo tổng của món (kcal)
- F39 · Gemini ước lượng macro: Protein / Carb / Fat (gram)
- F40 · Gemini trả về % độ tin cậy (confidence score)
- F41 · Gemini kết hợp text mô tả của user để phân tích chính xác hơn (multimodal)
- F42 · Gemini tự động nhận biết Party Mode nếu ảnh chứa nhiều người hoặc bàn tiệc
- F43 · User chỉnh sửa thủ công kết quả AI trước khi lưu (tên món, calo, macro)
- F44 · Hiển thị loading animation khi AI đang xử lý (~2-3 giây)
- F45 · Fallback: nếu AI không nhận ra → hiển thị form nhập tay

### PHOTO GRID (DƯỚI KHUNG CAMERA — MÀN CHÍNH)
- F46 · Lưới ảnh hiển thị dưới khung camera, cuộn dọc được
- F47 · Hiển thị ảnh của bản thân + tất cả bạn bè đã kết nối, sắp xếp theo thời gian mới nhất
- F48 · Mỗi hàng 3 ảnh, tỉ lệ 1:1, không có khoảng cách (edge-to-edge grid)
- F49 · Mỗi ảnh hiển thị badge calo nhỏ ở góc (+ xanh / - cam)
- F50 · Tap ảnh → mở Post Detail (modal trượt lên)
- F51 · Pull-to-refresh để cập nhật grid mới nhất

### SWIPE NAVIGATION (TỪ MÀN CAMERA CHÍNH)
- F52 · Vuốt sang TRÁI từ màn Camera → chuyển sang màn Lịch Sử cá nhân
- F53 · Vuốt sang PHẢI từ màn Camera → chuyển sang màn Chat với bạn bè
- F54 · Indicator nhỏ (3 chấm hoặc gạch ngang) ở dưới khung vuông để biết đang ở màn nào
- F55 · Transition mượt mà khi swipe (spring animation)

### CHAT
- F56 · Màn chat hiển thị danh sách conversation với từng bạn bè
- F57 · Mỗi conversation item: avatar bạn + tên + tin nhắn cuối + thời gian
- F58 · Tap vào conversation → mở màn chat 1-1
- F59 · Gửi tin nhắn text
- F60 · Share bài post (ảnh + calo) vào chat: tap giữ post → "Chia sẻ vào chat"
- F61 · Tin nhắn hiển thị bong bóng chat (bubble): bên phải là mình, trái là bạn
- F62 · Realtime: tin nhắn mới hiển thị ngay không cần refresh
- F63 · Badge số tin nhắn chưa đọc trên nút Chat ở menu bar

### POST DETAIL
- F64 · Xem ảnh full-size (vuông)
- F65 · Xem thông tin calo + macro chi tiết
- F66 · Xem AI nhận xét
- F67 · Nếu là Party Mode: hiển thị "Phần của bạn: 1/4 — ~120 kcal"
- F68 · Chỉnh sửa post của bản thân
- F69 · Xoá post của bản thân
- F70 · Swipe down / nút X để đóng

### PROFILE (MÀN RIÊNG)
- F71 · Avatar cá nhân hiển thị lớn ở trên cùng (80px, viền cam)
- F72 · Tên + username hiển thị dưới avatar
- F73 · Stats row: số bài đăng / streak ngày liên tiếp / số bạn bè
- F74 · Daily summary ring hôm nay (calo nạp / đốt / còn lại)
- F75 · Biểu đồ macro hôm nay (Protein / Carb / Fat)
- F76 · Chỉnh sửa thông tin cá nhân (tên, avatar)
- F77 · Truy cập màn Khai báo chỉ số cơ thể (F09–F15)
- F78 · Truy cập Settings
- F79 · KHÔNG có biểu tượng camera trên màn này

### LỊCH SỬ (MÀN RIÊNG — TÁCH KHỎI PROFILE)
- F80 · Màn lịch sử là màn độc lập, truy cập bằng vuốt trái từ màn Camera
- F81 · Xem biểu đồ calo theo tuần / tháng / 3 tháng (tab selector)
- F82 · Highlight ngày đạt mục tiêu (xanh) / vượt mục tiêu (cam) / chưa log (xám)
- F83 · Xem danh sách log theo ngày (dạng timeline dọc)
- F84 · Mỗi log item: ảnh thumbnail + tên món + calo + thời gian
- F85 · Swipe trái để xoá log cũ
- F86 · Tap log item → mở Post Detail

### FRIENDS / KẾT BẠN (MODAL TRƯỢT LÊN)
- F87 · Nút "Thêm bạn" ở góc trên trái màn Camera → modal trượt lên từ dưới
- F88 · Trong modal: ô tìm kiếm username / tên
- F89 · Kết quả tìm kiếm: avatar + tên + nút "Kết bạn"
- F90 · Gửi / chấp nhận / từ chối lời mời kết bạn
- F91 · Tab "Lời mời đến" trong modal (badge số lời mời chưa xử lý)
- F92 · Tab "Bạn bè" trong modal: danh sách bạn + nút Unfriend
- F93 · Đóng modal bằng swipe down hoặc tap vùng tối bên ngoài

### MENU BAR (3 NÚT CỐ ĐỊNH)
- F94 · Menu bar luôn hiển thị 3 nút — không thay đổi dù ở màn nào
- F95 · Nút trái: biểu tượng tin nhắn / chat (badge số tin chưa đọc)
- F96 · Nút giữa: biểu tượng shutter / chụp ảnh (hình tròn lớn màu cam) → luôn đưa về màn Camera
- F97 · Nút phải: biểu tượng avatar người dùng → mở màn Profile
- F98 · Nút giữa KHÔNG phải biểu tượng camera truyền thống — dùng icon vòng tròn shutter

### THÔNG BÁO
- F99  · Push notification khi bạn bè đăng post mới
- F100 · Push notification nhắc nhở log bữa ăn (7AM / 12PM / 7PM)
- F101 · Push notification chuỗi streak sắp bị gãy (21:00 nếu chưa log)
- F102 · In-app: badge số trên nút chat khi có tin nhắn mới

### SETTINGS
- F103 · Bật / tắt push notifications
- F104 · Chọn giờ nhắc nhở log
- F105 · Đổi mật khẩu
- F106 · Xoá tài khoản

---

## 2. NAVIGATION MODEL

### Cấu trúc tổng quan
```
                    ◄── SWIPE PHẢI ──      ── SWIPE TRÁI ──►
          ┌─────────────┐  ┌──────────────────┐  ┌──────────────┐
          │  S07 CHAT   │  │  S05 CAMERA      │  │  S08 LỊCH SỬ │
          │  với bạn bè │◄─┤  (MÀN CHÍNH)     ├─►│  cá nhân     │
          └─────────────┘  │                  │  └──────────────┘
                           │ ┌──────────────┐ │
                           │ │ Khung VUÔNG  │ │
                           │ │  1:1 Camera  │ │
                           │ └──────────────┘ │
                           │  [Đồ ăn|Tập luyện]
                           │                  │
                           │ ┌──────────────┐ │
                           │ │  LƯỚI ẢNH    │ │
                           │ │  3 ảnh/hàng  │ │
                           │ │  (cuộn được) │ │
                           │ └──────────────┘ │
                           └──────────────────┘

          MENU BAR (cố định ở dưới mọi màn):
          ┌──────────┬────────────────┬──────────┐
          │  💬 Chat │  ⊙ Chụp ảnh   │  👤 Tôi  │
          │  (badge) │  (nút cam chính│          │
          └──────────┴────────────────┴──────────┘
```

### Phần đầu màn Camera (trên khung vuông)
```
┌─────────────────────────────────────┐
│  [+ Thêm bạn]          [Avatar 👤] │  ← 2 nút ở trên
├─────────────────────────────────────┤
│                                     │
│         ┌───────────────┐           │
│         │               │           │
│         │  Khung vuông  │           │
│         │  1:1 Camera   │           │
│         │               │           │
│         └───────────────┘           │
│         [🍜 Đồ ăn | 💪 Tập luyện]  │
├─────────────────────────────────────┤
│  Ảnh gần đây (lưới 3 cột, cuộn)    │
│  ┌────┐ ┌────┐ ┌────┐              │
│  │+120│ │ -80│ │+340│              │
│  └────┘ └────┘ └────┘              │
│  ┌────┐ ┌────┐ ┌────┐              │
│  │ ...│ │ ...│ │ ...│              │
│  └────┘ └────┘ └────┘              │
└─────────────────────────────────────┘
```

---

## 3. SCREEN FLOW ĐẦY ĐỦ

```
APP LAUNCH
    │
    ▼
┌──────────┐
│ S01      │ Splash
│ SPLASH   │
└────┬─────┘
     │
     ├── Đã có session ──────────────────► S05 CAMERA (màn chính)
     │
     └── Chưa login ──► S02 ONBOARDING
                              │
                    ┌─────────┴──────────┐
                    ▼                    ▼
              S03a SIGN UP         S03b LOGIN
                    │                    │
                    ▼                    ├──► S03d RESET PASSWORD
              S03c BODY METRICS         │
              & GOAL SETUP              │
                    │                    │
                    └──────────┬─────────┘
                               ▼
                    ┌──────────────────────────────────────────┐
                    │         S05 CAMERA (MÀN CHÍNH)           │
                    │                                          │
                    │  Top: [Thêm bạn] ........... [Avatar]   │
                    │  Mid: [ Khung vuông camera ]             │
                    │       [Đồ ăn | Tập luyện toggle]         │
                    │  Bot: [ Lưới ảnh 3 cột - cuộn ]         │
                    └──┬───────────────────────────┬───────────┘
                       │                           │
              SWIPE PHẢI                      SWIPE TRÁI
                       │                           │
                       ▼                           ▼
              ┌────────────────┐        ┌─────────────────────┐
              │  S07 CHAT      │        │  S08 LỊCH SỬ        │
              │                │        │                      │
              │  Danh sách     │        │  Biểu đồ calo        │
              │  conversation  │        │  Timeline log        │
              │                │        │  theo ngày           │
              └────────┬───────┘        └──────────────────────┘
                       │
                       ▼
              S07b CHAT 1-1 (tap vào conversation)


                    TỪ MÀN CAMERA:
                    │
                    ├── Nhấn nút Chụp / Upload
                    │         │
                    │         ▼
                    │   S06 PREVIEW + AI RESULT
                    │         │
                    │         ├── [Party Mode] Nhập 1/n phần
                    │         │         │
                    │         │         ▼
                    │         │   S06b PORTION SELECTOR
                    │         │         │
                    │         └─────────┘
                    │         │ Confirm & Lưu
                    │         ▼
                    │   Quay về S05 CAMERA
                    │   (ảnh mới xuất hiện trong grid)
                    │
                    ├── Tap ảnh trong lưới
                    │         ▼
                    │   S10 POST DETAIL (modal trượt lên)
                    │         │
                    │         ├── Của mình → Edit / Delete
                    │         └── Swipe down → đóng modal
                    │
                    ├── Nhấn [+ Thêm bạn] (top left)
                    │         ▼
                    │   S11 MODAL KẾT BẠN (trượt lên từ dưới)
                    │         │ Tìm kiếm / Gửi lời mời
                    │         │ Swipe down → đóng
                    │
                    └── Nhấn [Avatar] (top right) hoặc nút 👤 menu bar
                              ▼
                        S09 PROFILE
                              │
                              ├── Chỉnh sửa thông tin
                              ├── Body Metrics → S03c
                              └── Settings → S09b SETTINGS
                                                │
                                                └── Đăng xuất → S02

```

---

## 4. CHI TIẾT TỪNG MÀN HÌNH

| Screen ID | Tên màn hình | Vào từ | Ra đến | Features |
|---|---|---|---|---|
| S01 | Splash | App launch | S02 hoặc S05 | F01 |
| S02 | Onboarding | S01 (chưa login) | S03a, S03b | F02, F03 |
| S03a | Sign Up | S02 | S03c | F02, F05 |
| S03b | Login | S02 | S05 | F03 |
| S03c | Body Metrics & Goal | S03a hoặc S09 Profile | S05 | F09–F15 |
| S03d | Reset Password | S03b | S03b | F04 |
| S05 | **Camera (Màn chính)** | Mọi nơi (nút giữa menu) | S06, S07, S08, S09, S10, S11 | F16–F55 |
| S06 | Preview + AI Result | S05 (sau chụp/upload) | S05 (sau lưu) | F36–F45 |
| S06b | Portion Selector | S06 (Party Mode) | S06 | F30–F35 |
| S07 | Chat — Danh sách | S05 (swipe phải) hoặc menu trái | S07b | F56–F63 |
| S07b | Chat 1-1 | S07 (tap conversation) | S07 | F58–F63 |
| S08 | Lịch Sử | S05 (swipe trái) | S05, S10 | F80–F86 |
| S09 | Profile | S05 (nút phải menu / avatar) | S03c, S09b | F71–F79 |
| S09b | Settings | S09 | S09, S02 | F103–F106 |
| S10 | Post Detail | S05 (tap ảnh grid) hoặc S08 | S05 / S08 | F64–F70 |
| S11 | Modal Kết Bạn | S05 (nút Thêm bạn) | S05 | F87–F93 |

---

## 5. USER JOURNEY — CÁC LUỒNG CHÍNH

### Luồng A: Đăng ký lần đầu
```
Mở app → Splash → Onboarding → Sign Up
→ Khai báo thông tin cơ thể + mục tiêu
→ Hệ thống đề xuất mục tiêu calo → User confirm
→ Màn Camera chính
```

### Luồng B: Log bữa ăn thường ngày
```
Mở app (vào thẳng màn Camera)
→ Chọn "Đồ ăn" → Chụp hoặc Upload ảnh
→ AI phân tích (~2-3s) → Xem kết quả calo/macro
→ [Tuỳ chọn] Thêm mô tả / Chỉnh số thủ công
→ Lưu → Ảnh xuất hiện trong lưới bên dưới
```

### Luồng C: Log ăn tiệc / đám cỗ (Party Mode)
```
Màn Camera → Chụp ảnh bàn tiệc / đĩa ăn chung
→ AI nhận dạng món + tổng calo cả đĩa
→ Nhấn "Ăn chung — nhập phần của bạn"
→ Màn Portion Selector: kéo slider hoặc nhập "X người ăn"
→ Hệ thống tính phần calo của bạn
→ Confirm → Lưu → Về màn Camera
```

### Luồng D: Upload ảnh từ thư viện
```
Màn Camera → Nhấn biểu tượng thư viện (góc dưới khung)
→ Chọn ảnh từ điện thoại → AI phân tích
→ Tiếp tục như luồng B
```

### Luồng E: Log buổi tập gym
```
Màn Camera → Chọn "Tập luyện"
→ Chụp ảnh thiết bị / gương phòng gym
→ [Tuỳ chọn] Gõ thêm: "Bench press 5x5 80kg"
→ AI ước tính calo đốt → Lưu
```

### Luồng F: Xem lịch sử cá nhân
```
Màn Camera → Vuốt sang TRÁI → Màn Lịch Sử
→ Xem biểu đồ tuần / tháng
→ Tap vào ngày cụ thể → xem danh sách log ngày đó
→ Tap vào log → Post Detail
```

### Luồng G: Chat với bạn bè
```
Màn Camera → Vuốt sang PHẢI (hoặc nhấn nút Chat menu bar)
→ Màn Chat — danh sách conversation
→ Tap vào bạn → Chat 1-1
→ Gõ tin nhắn / Share bài post vào chat
```

### Luồng H: Kết bạn mới
```
Màn Camera → Nhấn [+ Thêm bạn] trên cùng
→ Modal trượt lên → Tìm kiếm username
→ Nhấn "Kết bạn" → gửi lời mời
→ Khi bạn chấp nhận → ảnh của bạn xuất hiện trong lưới
```

### Luồng I: Cập nhật chỉ số cơ thể
```
Menu bar → Nút Avatar → Màn Profile
→ "Khai báo chỉ số" → Màn Body Metrics
→ Cập nhật cân nặng mới → Hệ thống recalculate TDEE
→ Hiển thị mục tiêu calo mới
```

---

## 6. TRẠNG THÁI ĐẶC BIỆT

| Tình huống | Xử lý |
|---|---|
| Không có internet khi chụp | Toast error "Không có mạng, thử lại" — không gửi API |
| AI không nhận ra được ảnh | Hiện "Không nhận dạng được" + form nhập tay |
| Ảnh quá tối / mờ | Cảnh báo "Ảnh không đủ rõ — sai số cao (±35%)" + gợi ý chụp lại |
| Ảnh chứa nhiều món lẫn lộn | Cảnh báo + gợi ý chụp riêng từng món |
| AI nhận ra bàn tiệc / nhiều người | Tự động gợi ý Party Mode |
| User không thêm mô tả | AI chỉ dùng ảnh — vẫn hoạt động |
| Lưới ảnh trống (ngày đầu) | Placeholder "Chưa có ảnh nào — chụp bữa đầu tiên" |
| Streak bị gãy | Notification 21:00 + streak counter reset |
| Tin nhắn mới trong chat | Badge đỏ trên nút Chat ở menu bar |
| Bạn bè gửi lời mời kết bạn | Badge trên nút [+ Thêm bạn] ở màn Camera |

---

## 7. SO SÁNH THAY ĐỔI SO VỚI V1

| Hạng mục | Version 1 | Version 2 |
|---|---|---|
| Màn chính khi mở app | Home Feed (danh sách dọc) | Camera vuông (1:1) |
| Navigation chính | Tab bar 3 tab | Swipe ngang + menu bar 3 nút |
| Màn lịch sử | Nằm trong Profile | Màn riêng (swipe trái) |
| Màn chat | Không có | Có (swipe phải) |
| Feed ảnh | Full-width cards dọc | Lưới 3 cột bên dưới camera |
| Kết bạn | Màn riêng | Modal trượt lên từ nút Thêm bạn |
| Ăn tiệc / ăn chung | Không có | Party Mode + Portion Selector |
| Upload ảnh | Có nhưng ẩn | Nổi bật ngang hàng với chụp |
| Hướng dẫn chất lượng ảnh | Không có | Cảnh báo AI + overlay khung |
| Khai báo chỉ số cơ thể | Trong onboarding | Màn riêng, cập nhật được |
| Camera format | Full-screen | Khung vuông 1:1 giữa màn |
