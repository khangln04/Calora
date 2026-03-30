# CalSnap — Tech Stack Chi Tiết

---

## 1. MOBILE APP (Frontend)

### Core Framework
| Công nghệ | Phiên bản | Lý do chọn |
|---|---|---|
| **React Native** | 0.75+ | Cross-platform, cộng đồng lớn, Locket dùng cùng stack |
| **Expo SDK** | 52+ | Không cần config Xcode thuần, CI/CD đơn giản hơn |
| **TypeScript** | 5.x | Type safety, dễ maintain về sau |

### Navigation
| Công nghệ | Dùng cho |
|---|---|
| **Expo Router v3** | File-based routing, tương tự Next.js. Quản lý tab bar, modal, stack navigation |
| **React Navigation v7** | Dùng kèm cho các animation transition phức tạp (modal slide-up) |

### Animation & UI
| Công nghệ | Dùng cho |
|---|---|
| **React Native Reanimated 3** | **Quan trọng nhất cho độ mượt.** Chạy animation trên UI thread (không qua JS bridge) → 60fps thực sự trên iOS |
| **React Native Gesture Handler** | Nhận gesture (swipe down đóng modal, long press card, pull-to-refresh) — phải dùng kèm Reanimated |
| **React Native Skia** | Vẽ vòng tròn calo (ring chart), gradient overlay trên ảnh. GPU-accelerated |
| **Moti** | Shorthand wrapper cho Reanimated, dùng cho các animation đơn giản (fade in, slide in) |
| **NativeWind v4** | Tailwind CSS cho React Native — styling nhanh, nhất quán |

### Camera & Media
| Công nghệ | Dùng cho |
|---|---|
| **Expo Camera** | Camera preview, chụp ảnh, flip, flash |
| **Expo Image Picker** | Chọn ảnh từ thư viện điện thoại |
| **Expo Image** | Hiển thị ảnh với caching thông minh (nhanh hơn Image mặc định) |
| **Expo File System** | Đọc file ảnh, convert sang base64 để gửi Gemini API |

### State Management
| Công nghệ | Dùng cho |
|---|---|
| **Zustand** | Global state (user session, daily calo summary, feed data). Nhẹ hơn Redux, đủ dùng cho scale 50 người |
| **TanStack Query v5** | Server state: fetch/cache/sync data từ Supabase (feed, stats, friends). Tự động refetch, background sync |
| **React Hook Form** | Quản lý form (sign up, goal setup, edit profile). Tránh re-render thừa |

### Notifications
| Công nghệ | Dùng cho |
|---|---|
| **Expo Notifications** | Push notification (nhắc log bữa ăn, streak warning, bạn bè đăng post) |

### Utilities
| Công nghệ | Dùng cho |
|---|---|
| **date-fns** | Format ngày giờ ("2 giờ trước", "Thứ 2, 24/03") |
| **zod** | Schema validation cho form input và API response |
| **expo-haptics** | Haptic feedback (shutter, like, save) |
| **expo-blur** | BlurView cho backdrop của modal và overlay |
| **expo-linear-gradient** | Gradient overlay trên ảnh feed cards |

---

## 2. BACKEND & DATABASE

### Supabase (All-in-one backend)
| Service | Dùng cho | Giới hạn free tier |
|---|---|---|
| **Supabase Auth** | Đăng ký, đăng nhập, reset mật khẩu, quản lý session JWT | Unlimited users |
| **Supabase Postgres** | Database chính: users, posts, friendships, daily_logs | 500MB |
| **Supabase Storage** | Lưu trữ ảnh bài post (tối ưu: resize xuống 800px trước khi upload) | 1GB |
| **Supabase Realtime** | Feed tự động cập nhật khi bạn bè đăng post mới (websocket) | 200 concurrent |
| **Supabase Edge Functions** | Chạy Deno serverless — dùng để gọi Gemini API (ẩn API key phía server) | 500K invocations/tháng |
| **Supabase Row Level Security** | Bảo mật: user chỉ đọc được post của mình + bạn bè | — |

### Database Schema (Postgres)

```sql
-- Người dùng
users
  id uuid PRIMARY KEY
  email text UNIQUE
  display_name text
  avatar_url text
  age int
  gender text         -- 'male' | 'female'
  weight_kg float
  height_cm float
  goal text           -- 'lose' | 'gain' | 'maintain'
  tdee_kcal int       -- tính từ Harris-Benedict formula
  target_kcal int     -- TDEE ± deficit/surplus
  created_at timestamp

-- Bài đăng (mỗi bữa ăn / buổi tập)
posts
  id uuid PRIMARY KEY
  user_id uuid → users.id
  type text           -- 'food' | 'workout'
  image_url text      -- Supabase Storage URL
  description text    -- mô tả tuỳ chọn của user
  food_name text      -- kết quả AI
  kcal int            -- kết quả AI
  protein_g float
  carb_g float
  fat_g float
  ai_confidence int   -- % tin cậy (100 - sai_số)
  is_manual bool      -- user tự nhập hay AI
  created_at timestamp

-- Kết bạn
friendships
  id uuid PRIMARY KEY
  requester_id uuid → users.id
  addressee_id uuid → users.id
  status text         -- 'pending' | 'accepted' | 'rejected'
  created_at timestamp

-- Likes / Reactions
reactions
  id uuid PRIMARY KEY
  post_id uuid → posts.id
  user_id uuid → users.id
  created_at timestamp
```

---

## 3. AI — GEMINI VISION

### Gemini 1.5 Flash (Google AI)
| Thông số | Chi tiết |
|---|---|
| **Model** | `gemini-1.5-flash` (nhanh nhất, rẻ nhất trong dòng Gemini) |
| **Input** | Image (base64) + optional text prompt |
| **Output** | JSON structured response |
| **Latency** | ~1.5–3 giây/request |
| **Giá** | $0.075 / 1M input tokens — ảnh ~300-500 tokens → **~$0.00004/ảnh** |
| **Ước tính chi phí** | 50 người × 3 ảnh/ngày × 30 ngày = 4,500 ảnh/tháng → **~$0.18/tháng** |

### Prompt gửi Gemini

```
Bạn là chuyên gia dinh dưỡng. Phân tích ảnh này và trả về JSON.

Nếu là ĐỒ ĂN:
- Tên món ăn (tiếng Việt)
- Calo ước tính (kcal)
- Protein (gram), Carb (gram), Fat (gram)
- Sai số ước tính (%)
- Nhận xét ngắn 1-2 câu

Nếu là BÀI TẬP / DỤNG CỤ TẬP:
- Tên bài tập hoặc mô tả thiết bị
- Calo đốt ước tính dựa trên người 70kg (kcal)
- Sai số (%)
- Nhận xét ngắn

Thêm thông tin từ user: "{user_description}"

Chỉ trả về JSON, không giải thích thêm:
{
  "type": "food" | "workout",
  "name": "...",
  "kcal": 000,
  "protein_g": 00,
  "carb_g": 00,
  "fat_g": 00,
  "confidence": 00,
  "note": "..."
}
```

### Luồng gọi Gemini (qua Supabase Edge Function)
```
App (Expo)
  → Upload ảnh lên Supabase Storage
  → Gọi Edge Function /analyze-image với image_url + description
  → Edge Function gọi Gemini API (API key ẩn phía server)
  → Parse JSON response
  → Trả kết quả về app
  → App hiển thị cho user xem + confirm
  → User nhấn Lưu → Edge Function lưu vào bảng posts
```

---

## 4. NOTIFICATIONS

### Expo Push Notification Service (APNS qua Expo)
| Thành phần | Chi tiết |
|---|---|
| **Expo Push Service** | Miễn phí, relay thông báo đến APNS (Apple Push Notification) |
| **APNS** | Apple server gửi notification đến thiết bị iOS |
| **Trigger từ đâu** | Supabase Edge Function + Postgres scheduled cron jobs |

### Các loại notification
```
1. Bạn bè đăng post mới
   Trigger: Postgres trigger sau INSERT vào posts → gọi Edge Function → push

2. Nhắc log bữa ăn (7:00 / 12:00 / 19:00)
   Trigger: Supabase cron job mỗi ngày 3 lần → check user chưa log → push

3. Streak sắp gãy (21:00 nếu chưa log gì)
   Trigger: Supabase cron job 21:00 hàng đêm → check streak → push
```

---

## 5. DEVOPS & TOOLING

### Development
| Công nghệ | Dùng cho |
|---|---|
| **Expo Go / Expo Dev Build** | Preview app trên thiết bị thật iOS trong khi dev |
| **EAS Build** | Build file `.ipa` để cài lên TestFlight (distribute 50 người) |
| **EAS Update** | OTA update — push code mới không cần submit lại App Store |

### Distribution cho 50 người
| Bước | Công cụ | Chi phí |
|---|---|---|
| Build .ipa | EAS Build | Free tier: 30 builds/tháng |
| Distribute | TestFlight (Apple) | Miễn phí, tối đa 10,000 testers |
| Update code | EAS Update | Free tier đủ dùng |
| Apple Developer Account | Bắt buộc để dùng TestFlight | **$99/năm — khoản duy nhất phải trả** |

### Code Quality
| Công nghệ | Dùng cho |
|---|---|
| **ESLint** | Lint TypeScript/React Native code |
| **Prettier** | Format code tự động |
| **Husky** | Git hooks — chạy lint trước khi commit |

---

## 6. TỔNG CHI PHÍ ƯỚC TÍNH

| Khoản | Mô hình | Chi phí |
|---|---|---|
| Supabase | Free tier | $0/tháng |
| Gemini 1.5 Flash | ~4,500 ảnh/tháng | ~$0.18/tháng |
| Expo EAS | Free tier | $0/tháng |
| Apple Developer | Bắt buộc cho TestFlight | $99/năm ($8.25/tháng) |
| **Tổng** | | **~$8.5/tháng** |

> Chi phí duy nhất thực sự bắt buộc là Apple Developer Account ($99/năm).
> Gemini gần như miễn phí ở quy mô 50 người.
> Mọi thứ còn lại đều trong free tier.

---

## 7. SƠ ĐỒ KIẾN TRÚC

```
┌─────────────────────────────────────────────────────┐
│                  iOS App (Expo RN)                   │
│                                                      │
│  Zustand │ TanStack Query │ Reanimated │ Skia        │
│  Expo Camera │ Expo Router │ NativeWind              │
└──────────┬──────────────────────────┬────────────────┘
           │                          │
           │ REST / Realtime WS       │ REST
           ▼                          ▼
┌─────────────────────┐    ┌─────────────────────────┐
│   SUPABASE          │    │  SUPABASE EDGE FUNCTIONS │
│                     │    │  (Deno serverless)       │
│  • Auth (JWT)       │    │                          │
│  • Postgres DB      │◄───│  /analyze-image          │
│  • Storage (images) │    │  /send-notification      │
│  • Realtime WS      │    │  /calculate-tdee         │
│  • Cron Jobs        │    │                          │
└─────────────────────┘    └───────────┬─────────────┘
                                       │
                            ┌──────────▼──────────┐
                            │  GEMINI 1.5 FLASH   │
                            │  (Google AI API)    │
                            │                     │
                            │  Image + Text →     │
                            │  JSON (calo, macro) │
                            └─────────────────────┘

        Push Notification Flow:
        Supabase Cron / DB Trigger
          → Edge Function
            → Expo Push Service
              → APNS
                → iPhone
```

---

## 8. THỨ TỰ BUILD GỢI Ý

```
Tuần 1–2:  Setup Expo + Supabase Auth + Navigation cơ bản
Tuần 3:    Camera screen + tích hợp Gemini API
Tuần 4:    Feed screen + post card UI (y hệt Locket)
Tuần 5:    Profile + Stats + biểu đồ
Tuần 6:    Friends system + Realtime feed
Tuần 7:    Push notifications + Cron jobs
Tuần 8:    Polish animation (Reanimated) + TestFlight distribute
```
