# CalSnap — Tracking Tiến Độ

> Cập nhật lần cuối: 2026-03-30

---

## TỔNG QUAN TIẾN ĐỘ

| Tuần | Nội dung | Trạng thái |
|---|---|---|
| Tuần 1–2 | Setup + Auth + Navigation | 🔄 Đang làm |
| Tuần 3 | Camera + Gemini AI | ⬜ Chưa bắt đầu |
| Tuần 4 | Feed + Photo Grid UI | ⬜ Chưa bắt đầu |
| Tuần 5 | Profile + Stats + Ring Chart | ⬜ Chưa bắt đầu |
| Tuần 6 | Friends + Realtime Feed | ⬜ Chưa bắt đầu |
| Tuần 7 | Push Notifications + Chat | ⬜ Chưa bắt đầu |
| Tuần 8 | Polish Animation + TestFlight | ⬜ Chưa bắt đầu |

---

## ĐÃ HOÀN THÀNH ✅

### Setup & Cấu hình (2026-03-30)
- [x] Khởi tạo Expo project (SDK 54, TypeScript)
- [x] Cài đặt tất cả dependencies
  - Navigation: expo-router, react-native-screens, safe-area-context
  - Animation: reanimated, gesture-handler, skia, moti
  - Styling: nativewind v4, tailwindcss
  - Camera: expo-camera, expo-image-picker, expo-image, expo-file-system
  - State: zustand, tanstack-query, react-hook-form
  - Backend: @supabase/supabase-js
  - Utilities: date-fns, zod, expo-haptics, expo-blur, expo-linear-gradient, expo-notifications
  - Dev: eslint, prettier, eslint-config-expo
- [x] Cấu hình NativeWind (tailwind.config.js, babel.config.js, metro.config.js, global.css)
- [x] Cấu hình Expo Router (app.json, package.json main entry)
- [x] Cấu hình TypeScript path alias (@/*)
- [x] Cấu hình app.json (scheme, plugins: camera, image-picker, notifications)
- [x] Fix lỗi bundle (cài babel-preset-expo)
- [x] Bundle test thành công (1460 modules, 0 errors)

### Theme System (2026-03-30)
- [x] Brand colors (orange, green, yellow, red, purple)
- [x] Dark theme tokens (bg, text, border, icon)
- [x] Light theme tokens (bg, text, border, icon)
- [x] Spacing & radius constants
- [x] Typography scale (display → caption2)
- [x] useTheme() hook
- [x] Zustand themeStore (system/light/dark preference)

### Cấu trúc thư mục (2026-03-30)
- [x] app/(auth) — layout + 5 màn skeleton
- [x] app/(main) — layout + 9 màn skeleton
- [x] components/ — 5 folders (camera, feed, post, ui, chat)
- [x] hooks/, store/, theme/, lib/

---

## ĐANG LÀM 🔄

### Tuần 1–2: Auth + Navigation cơ bản
- [ ] Tạo project Supabase (lấy URL + anon key)
- [ ] Tạo database schema (users, posts, friendships, reactions)
- [ ] Setup Row Level Security (RLS)
- [ ] Điền Supabase credentials vào lib/supabase.ts
- [ ] Màn Onboarding (S02) — UI hoàn chỉnh
- [ ] Màn Sign Up (S03a) — form + Supabase Auth
- [ ] Màn Login (S03b) — form + Supabase Auth
- [ ] Màn Reset Password (S03d) — gửi email reset
- [ ] Màn Body Metrics & Goal (S03c) — form nhập chỉ số + tính TDEE
- [ ] Auth flow: redirect dựa trên session (đã login → Camera, chưa → Onboarding)
- [ ] Đăng xuất (F08)

---

## CẦN LÀM TIẾP ⬜

### Tuần 3: Camera + Gemini AI
- [ ] Camera Screen (S05) — khung vuông 1:1, top bar, toggle đồ ăn/tập luyện
- [ ] Chụp ảnh (F20) + Flip camera (F23) + Flash (F24)
- [ ] Upload ảnh từ thư viện (F21)
- [ ] Supabase Edge Function: /analyze-image (gọi Gemini 1.5 Flash)
- [ ] Preview + AI Result screen (S06) — hiển thị kết quả calo/macro
- [ ] Chỉnh sửa thủ công kết quả AI (F43)
- [ ] Fallback form nhập tay khi AI fail (F45)
- [ ] Loading animation khi AI xử lý (F44)
- [ ] Photo Quality Guidance — cảnh báo ảnh mờ/tối (F26–F29)

### Tuần 4: Feed + Photo Grid
- [ ] Photo Grid dưới camera — lưới 3 cột (F46–F51)
- [ ] Calorie Badge Pill trên mỗi ảnh (F49)
- [ ] Post Detail modal (S10) — slide up (F64–F70)
- [ ] Xoá post (F69)
- [ ] Pull-to-refresh grid (F51)
- [ ] Party/Feast Mode — Portion Selector (S06b, F30–F35)

### Tuần 5: Profile + Stats
- [ ] Profile screen (S09) — avatar, tên, stats row (F71–F78)
- [ ] Ring Chart (Skia) — calo nạp/đốt/còn lại (F74)
- [ ] Biểu đồ macro hôm nay (F75)
- [ ] Settings screen (S09b, F103–F106)
- [ ] Cập nhật chỉ số cơ thể + recalculate TDEE (F15)

### Tuần 6: Friends + Realtime
- [ ] Lịch Sử screen (S08) — biểu đồ tuần/tháng, timeline (F80–F86)
- [ ] Swipe navigation: Camera ↔ Chat ↔ Lịch Sử (F52–F55)
- [ ] Modal Kết Bạn (S11) — tìm kiếm, gửi/nhận lời mời (F87–F93)
- [ ] Supabase Realtime — feed tự cập nhật khi bạn bè đăng post
- [ ] Menu Bar 3 nút cố định (F94–F98)

### Tuần 7: Notifications + Chat
- [ ] Chat danh sách (S07, F56–F57)
- [ ] Chat 1-1 (S07b, F58–F62)
- [ ] Share post vào chat (F60)
- [ ] Realtime chat (F62)
- [ ] Badge tin nhắn chưa đọc (F63)
- [ ] Push notification: bạn bè đăng post (F99)
- [ ] Push notification: nhắc log bữa ăn 7AM/12PM/7PM (F100)
- [ ] Push notification: streak sắp gãy 21:00 (F101)
- [ ] Supabase cron jobs cho notifications

### Tuần 8: Polish + TestFlight
- [ ] Animation mượt với Reanimated (swipe, modal, shutter)
- [ ] Haptic feedback theo bảng chuẩn
- [ ] Skeleton loading screens
- [ ] Xử lý trạng thái đặc biệt (không mạng, grid trống, streak gãy...)
- [ ] Theme switching (Dark/Light/System)
- [ ] EAS Build → .ipa
- [ ] Upload TestFlight
- [ ] Distribute cho 50 người test

---

## GHI CHÚ

### Vấn đề đã gặp & cách fix
| Ngày | Vấn đề | Cách fix |
|---|---|---|
| 2026-03-30 | create-expo-app conflict với .claude, docs | Di chuyển tạm ra ngoài, tạo project, đưa lại |
| 2026-03-30 | Bundle fail: Cannot find module 'babel-preset-expo' | `npx expo install babel-preset-expo` |

### Tài khoản & API cần setup
| Service | Trạng thái | Ghi chú |
|---|---|---|
| Supabase | ⬜ Chưa tạo | Cần tạo project + schema |
| Google AI (Gemini) | ⬜ Chưa tạo | Cần API key cho Edge Function |
| Apple Developer | ⬜ Chưa đăng ký | $99/năm — cần cho TestFlight |
| EAS (Expo) | ⬜ Chưa login | `eas login` khi cần build |
