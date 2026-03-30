# CLAUDE.md — CalSnap Project Guide
> File này giúp Claude Code hiểu toàn bộ dự án CalSnap nhanh nhất có thể.
> Đọc file này trước khi làm bất kỳ task nào. Tham chiếu chi tiết tại 3 file gốc:
> - `calsnap_techstack.md` — Stack, DB schema, kiến trúc hệ thống
> - `calsnap_theme.md` — Design tokens, component styles, animation
> - `calsnap_features_screenflow_v2.md` — Danh sách features, navigation, screen flow

---

## 1. DỰ ÁN LÀ GÌ?

**CalSnap** là app iOS (React Native + Expo) cho **50 người dùng thử nghiệm**. Người dùng **chụp ảnh đồ ăn / buổi tập**, AI tự động nhận dạng và tính calo. App có tính năng mạng xã hội nhỏ: xem ảnh bạn bè, chat, kết bạn.

Cảm hứng UI từ **Locket Widget** — màn chính là camera vuông 1:1, feed ảnh là lưới 3 cột phía dưới.

---

## 2. TECH STACK (TÓM TẮT)

| Layer | Công nghệ chính |
|---|---|
| **App** | React Native 0.75 + Expo SDK 52 + TypeScript |
| **Navigation** | Expo Router v3 (file-based) + React Navigation v7 |
| **Animation** | Reanimated 3 (UI thread, 60fps) + Skia (ring chart) + Moti |
| **Styling** | NativeWind v4 (Tailwind cho RN) |
| **State** | Zustand (global) + TanStack Query v5 (server) |
| **Camera** | Expo Camera + Expo Image Picker |
| **Backend** | Supabase (Auth + Postgres + Storage + Realtime + Edge Functions) |
| **AI** | Gemini 1.5 Flash — qua Supabase Edge Function (ẩn API key) |
| **Notifications** | Expo Push → APNS |
| **Distribution** | EAS Build → TestFlight |

> **Chi phí thực tế duy nhất:** Apple Developer $99/năm. Mọi thứ còn lại free tier.

---

## 3. CẤU TRÚC NAVIGATION

```
SWIPE PHẢI ◄── [S07 CHAT] ←── [S05 CAMERA chính] ──► [S08 LỊCH SỬ] ──► SWIPE TRÁI

MENU BAR (cố định mọi màn):
  [💬 Chat (badge)] ── [⊙ Shutter cam] ── [👤 Profile]
```

### Các màn hình chính:
| ID | Màn | Vào bằng |
|---|---|---|
| **S05** | Camera (màn chính) | Nút giữa menu bar / mở app |
| **S06** | Preview + AI Result | Sau khi chụp/upload |
| **S06b** | Portion Selector (Party Mode) | Từ S06 |
| **S07** | Chat — danh sách | Swipe phải hoặc nút chat |
| **S07b** | Chat 1-1 | Tap conversation |
| **S08** | Lịch Sử | Swipe trái từ S05 |
| **S09** | Profile | Nút phải menu bar |
| **S09b** | Settings | Từ S09 |
| **S10** | Post Detail | Tap ảnh trong lưới |
| **S11** | Modal Kết Bạn | Nút "+ Thêm bạn" |

### Màn Camera (S05) layout:
```
┌─────────────────────────────┐
│ [+ Thêm bạn]   [Avatar 👤] │  ← top row
│                             │
│    ┌───────────────────┐    │
│    │  Camera vuông 1:1 │    │  ← cameraSquareSize = screenWidth - 32px
│    │  borderRadius 24px│    │
│    └───────────────────┘    │
│    [🍜 Đồ ăn | 💪 Tập]     │  ← type toggle
│                             │
│  Lưới 3 cột — ảnh bạn bè   │  ← cuộn được, tap → S10
└─────────────────────────────┘
```

---

## 4. DATABASE SCHEMA (Postgres trên Supabase)

```sql
users        — id, email, display_name, avatar_url, age, gender,
               weight_kg, height_cm, goal, tdee_kcal, target_kcal

posts        — id, user_id, type ('food'|'workout'), image_url,
               description, food_name, kcal, protein_g, carb_g, fat_g,
               ai_confidence, is_manual, created_at

friendships  — id, requester_id, addressee_id,
               status ('pending'|'accepted'|'rejected')

reactions    — id, post_id, user_id, created_at
```

> **Bảo mật:** Row Level Security — user chỉ đọc được post của mình + bạn bè.

---

## 5. LUỒNG AI (GEMINI)

```
App chụp ảnh
  → Upload lên Supabase Storage
  → Gọi Edge Function /analyze-image (image_url + mô tả tùy chọn)
  → Edge Function gọi Gemini 1.5 Flash (API key ẩn server-side)
  → Nhận JSON: { type, name, kcal, protein_g, carb_g, fat_g, confidence, note }
  → Trả về app → User xem / chỉnh → Confirm lưu vào bảng posts
```

**Các trường hợp đặc biệt:**
- Ảnh mờ/tối → cảnh báo sai số cao, gợi ý chụp lại
- AI không nhận ra → fallback form nhập tay
- Ảnh tiệc/nhiều người → tự gợi ý **Party Mode** (chia phần ăn 1/n)

---

## 6. DESIGN SYSTEM (QUAN TRỌNG — ĐỌC KỸ)

### Brand colors (KHÔNG đổi theo theme)
```
Orange (accent chính): #FF6B35
Green (calo nạp):      #27C476
Yellow (streak):       #FFD60A
Red (vượt mục tiêu):   #FF3B30
Purple (protein):      #7B61FF
```

### Semantic tokens (đổi theo Light/Dark)
Dùng `useTheme()` hook — KHÔNG hardcode màu trực tiếp:
```typescript
const { colors, brand, isDark } = useTheme()
// colors.bg.card, colors.text.primary, colors.border.default...
```

| Token | Dark | Light |
|---|---|---|
| `bg.base` | `#000000` | `#F2F2F7` |
| `bg.card` | `#1A1A1A` | `#FFFFFF` |
| `text.primary` | `#FFFFFF` | `#000000` |
| `text.secondary` | `#8E8E93` | `#6C6C70` |
| `border.default` | `rgba(255,255,255,0.10)` | `rgba(0,0,0,0.10)` |

> Default theme: **Dark Mode**. User có thể chọn Light / theo hệ thống.
> Setting lưu vào `AsyncStorage` key `'calsnap_theme'`.

### Spacing & Radius
```
spacing: xs=4 sm=8 md=12 base=16 lg=20 xl=24 2xl=32
radius:  sm=8 md=12 lg=16 xl=20 2xl=24 full=999
tabBarHeight: 82px | topBarHeight: 52px | screenPadding: 16px
```

### Typography — SF Pro Display (iOS native)
```
display  32px/700 — số calo lớn
title1   28px/700 — onboarding heading
title2   24px/700 — section heading
title3   20px/600 — card heading
headline 17px/600 — button, nav title
body     15px/400 — body text
callout  13px/400 — secondary info
caption1 12px/400 — timestamp
caption2 10px/600 — uppercase badge (letter-spacing +0.06em)
```

### Animation presets
```
spring.snappy: damping 0.75, stiffness 400  ← modal slide up
spring.default: damping 0.8, stiffness 300  ← swipe navigation
duration: fast=200ms, normal=300ms, ring=600ms, ai=800ms
```

---

## 7. COMPONENT PATTERNS HAY DÙNG

### Primary Button
```typescript
// height: 52px, borderRadius: 16px, bg: #FF6B35
// pressed: scale(0.97) + bg #E55A28
// loading: white spinner ở giữa
```

### Shutter Button (nút giữa menu bar)
```typescript
// outer: 56px circle, bg #FF6B35
// inner: 46px circle, bg rgba(255,255,255,0.25)
// pressed: scale(0.93) + haptic medium
// shadow: shadowColor #FF6B35, opacity 0.35, radius 12
```

### Calorie Badge Pill
```typescript
// Food (nạp): bg rgba(39,196,118,0.15) / border rgba(39,196,118,0.35) / text #27C476
// Workout (đốt): bg rgba(255,107,53,0.15) / text #FF6B35
// Over goal: bg rgba(255,59,48,0.15) / text #FF3B30
// height: 26px, borderRadius: full, paddingH: 10px
```

### Ring Chart (Skia)
```typescript
// Outer ring: calo nạp, color #FF6B35, strokeWidth 5
// Inner ring: calo đốt, color #27C476, strokeWidth 4
// Track: dark #222222 / light #E5E5EA
// Center: SF Mono, số calo to
// Draw animation: 600ms easeOut khi mount
```

### Surface Card
```typescript
// Dark: bg #1A1A1A, border rgba(255,255,255,0.06)
// Light: bg #FFFFFF, border rgba(0,0,0,0.06) + shadow
// borderRadius: 20px, padding: 16px
```

---

## 8. HAPTIC FEEDBACK — GHI NHỚ

```typescript
// Chụp ảnh:       ImpactFeedbackStyle.Medium
// Lưu thành công: NotificationFeedbackType.Success
// Like:           ImpactFeedbackStyle.Light
// Xoá:            NotificationFeedbackType.Warning
// Lỗi:            NotificationFeedbackType.Error
```

---

## 9. NOTIFICATIONS (3 LOẠI)

| Trigger | Nội dung | Lúc nào |
|---|---|---|
| Bạn bè đăng post | "X vừa đăng bữa ăn mới" | Realtime (DB trigger) |
| Nhắc log bữa ăn | "Đừng quên log bữa trưa!" | 7:00 / 12:00 / 19:00 |
| Streak sắp gãy | "Hôm nay chưa log gì — streak X ngày sắp mất!" | 21:00 nếu chưa log |

---

## 10. CÁC TÍNH NĂNG ĐẶC BIỆT CẦN CHÚ Ý

### Party Mode (F30–F35)
Khi AI nhận ra ảnh tiệc hoặc nhiều người → hiện nút "Ăn chung":
- User nhập số người hoặc kéo slider 1/n
- Tính: `calo_của_bạn = total_kcal / n`
- Hiển thị: "Phần của bạn (1/4 đĩa): ~120 kcal"

### Photo Quality Guidance (F26–F29)
- Overlay khung với gợi ý "Giữ món ăn trong khung"
- Cảnh báo ảnh quá tối / mờ → đề xuất sai số, gợi ý chụp lại
- Cảnh báo nhiều món lẫn lộn → "Chụp riêng từng món để chính xác hơn"

### Swipe Navigation (F52–F55)
- Camera là trung tâm, swipe phải → Chat, swipe trái → Lịch Sử
- 3 chấm indicator ở dưới khung vuông để biết vị trí hiện tại
- Transition: spring animation mượt

---

## 11. FILE CẤU TRÚC GỢI Ý

```
app/
  (auth)/          ← S02–S03d: onboarding, sign up, login
  (main)/
    index.tsx      ← S05: Camera (màn chính) — swipeable
    history.tsx    ← S08: Lịch sử (swipe trái)
    chat/
      index.tsx    ← S07: Danh sách chat
      [id].tsx     ← S07b: Chat 1-1
    profile/
      index.tsx    ← S09: Profile
      settings.tsx ← S09b: Settings
    post/
      [id].tsx     ← S10: Post Detail (modal)
    friends.tsx    ← S11: Modal kết bạn

components/
  camera/          ← CameraFrame, ShutterButton, FlashToggle
  feed/            ← PhotoGrid, PhotoCard, CalorieBadge
  post/            ← PostDetail, AIResult, PortionSelector
  ui/              ← Button, Input, Avatar, RingChart, Skeleton
  chat/            ← ChatBubble, ConversationItem

hooks/
  useTheme.ts      ← QUAN TRỌNG: luôn dùng hook này để lấy màu
  useCamera.ts
  useFeed.ts

store/
  themeStore.ts    ← Zustand: preference 'system'|'light'|'dark'
  sessionStore.ts  ← Zustand: user session, daily summary

theme/
  colors.ts        ← darkTheme, lightTheme, brand constants
  spacing.ts
  typography.ts

lib/
  supabase.ts      ← Supabase client
  gemini.ts        ← Edge function caller
```

---

## 12. QUY TẮC VIẾT CODE

1. **Màu sắc:** Luôn dùng `useTheme()` — KHÔNG hardcode hex trực tiếp trong component (trừ brand colors)
2. **Animation:** Dùng Reanimated 3 cho animation quan trọng (swipe, modal). Moti cho animation đơn giản (fade, slide)
3. **Hình ảnh:** Dùng `expo-image` (không phải `Image` mặc định) để có caching
4. **Forms:** Dùng React Hook Form — tránh re-render thừa
5. **API calls:** Mọi call Gemini phải qua Supabase Edge Function — KHÔNG gọi trực tiếp từ app
6. **Type safety:** Luôn định nghĩa type cho Gemini response và Supabase data
7. **Haptic:** Thêm haptic feedback theo bảng mục 8 — đây là UX quan trọng
8. **Tap targets:** Tối thiểu 44×44px (Apple HIG) cho mọi interactive element

---

## 13. TRẠNG THÁI ĐẶC BIỆT CẦN HANDLE

```
Không có mạng      → Toast error, không gọi API
AI fail            → Fallback form nhập tay
Ảnh mờ/tối        → Warning overlay + gợi ý chụp lại
Ảnh nhiều món      → Warning + gợi ý chụp riêng
Grid trống         → Placeholder illustration
Streak gãy         → Notification + reset counter
Tin nhắn mới       → Badge đỏ trên nút Chat menu bar
Lời mời kết bạn   → Badge trên nút [+ Thêm bạn]
```

---

> **Tài liệu chi tiết:**
> - Stack & DB schema → `calsnap_techstack.md`
> - Design tokens & components → `calsnap_theme.md`
> - Features & navigation → `calsnap_features_screenflow_v2.md`
