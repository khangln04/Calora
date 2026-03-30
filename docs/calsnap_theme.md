# CalSnap — Theme System
> Hỗ trợ Light Mode & Dark Mode. Tự động theo hệ thống hoặc user tự chọn.

---

## 1. DESIGN TOKENS — MÀU SẮC

### Brand Colors (Bất biến — không đổi theo theme)
```
Brand Orange (Accent chính):   #FF6B35
Brand Orange Dark:             #E55A28   ← pressed state
Brand Orange Light:            #FF8C5A   ← hover / subtle
Brand Orange Muted:            rgba(255, 107, 53, 0.15)

Brand Green (Calo nạp / tích cực):   #27C476
Brand Green Dark:                    #1DA560
Brand Green Muted:                   rgba(39, 196, 118, 0.15)

Brand Yellow (Streak / cảnh báo):    #FFD60A
Brand Yellow Muted:                  rgba(255, 214, 10, 0.15)

Brand Red (Vượt mục tiêu / lỗi):    #FF3B30
Brand Red Muted:                     rgba(255, 59, 48, 0.15)

Brand Purple (Protein macro):        #7B61FF
Brand Purple Muted:                  rgba(123, 97, 255, 0.15)
```

---

### Semantic Color Tokens (Thay đổi theo Light / Dark)

#### BACKGROUND
| Token | Dark Mode | Light Mode |
|---|---|---|
| `bg.base` | `#000000` | `#F2F2F7` |
| `bg.surface` | `#111111` | `#FFFFFF` |
| `bg.elevated` | `#1A1A1A` | `#FFFFFF` |
| `bg.input` | `#1A1A1A` | `#F2F2F7` |
| `bg.overlay` | `rgba(0,0,0,0.6)` | `rgba(0,0,0,0.4)` |
| `bg.scrim` | `rgba(0,0,0,0.85)` | `rgba(0,0,0,0.5)` |
| `bg.card` | `#1A1A1A` | `#FFFFFF` |
| `bg.tabBar` | `rgba(0,0,0,0.92)` | `rgba(255,255,255,0.92)` |
| `bg.modal` | `#1A1A1A` | `#FFFFFF` |
| `bg.skeleton` | `#2A2A2A` | `#E5E5EA` |

#### TEXT
| Token | Dark Mode | Light Mode |
|---|---|---|
| `text.primary` | `#FFFFFF` | `#000000` |
| `text.secondary` | `#8E8E93` | `#6C6C70` |
| `text.tertiary` | `#48484A` | `#AEAEB2` |
| `text.placeholder` | `#3A3A3C` | `#C7C7CC` |
| `text.inverse` | `#000000` | `#FFFFFF` |
| `text.link` | `#FF6B35` | `#FF6B35` |
| `text.danger` | `#FF453A` | `#FF3B30` |

#### BORDER
| Token | Dark Mode | Light Mode |
|---|---|---|
| `border.subtle` | `rgba(255,255,255,0.06)` | `rgba(0,0,0,0.06)` |
| `border.default` | `rgba(255,255,255,0.10)` | `rgba(0,0,0,0.10)` |
| `border.strong` | `rgba(255,255,255,0.18)` | `rgba(0,0,0,0.18)` |
| `border.focus` | `#FF6B35` | `#FF6B35` |

#### ICON
| Token | Dark Mode | Light Mode |
|---|---|---|
| `icon.primary` | `#FFFFFF` | `#000000` |
| `icon.secondary` | `#8E8E93` | `#6C6C70` |
| `icon.inactive` | `#3A3A3C` | `#C7C7CC` |
| `icon.accent` | `#FF6B35` | `#FF6B35` |

---

## 2. TYPOGRAPHY

### Font
```
Primary Font:   SF Pro Display (iOS system)
Fallback:       -apple-system, BlinkMacSystemFont, "Helvetica Neue"
Mono Font:      SF Mono (dùng cho số liệu calo lớn)
```

### Type Scale
| Token | Size | Weight | Line Height | Tracking | Dùng cho |
|---|---|---|---|---|---|
| `type.display` | 32px | 700 Bold | 38px | -0.5px | Số calo lớn trên ring |
| `type.title1` | 28px | 700 Bold | 34px | -0.3px | Màn onboarding heading |
| `type.title2` | 24px | 700 Bold | 30px | -0.3px | Section heading |
| `type.title3` | 20px | 600 Semibold | 25px | -0.2px | Card heading |
| `type.headline` | 17px | 600 Semibold | 22px | 0px | Navigation title, button |
| `type.body` | 15px | 400 Regular | 20px | 0px | Body text, list item |
| `type.callout` | 13px | 400 Regular | 18px | 0px | Subtitle, secondary info |
| `type.caption1` | 12px | 400 Regular | 16px | 0px | Timestamp, micro label |
| `type.caption2` | 10px | 600 Semibold | 14px | +0.06em | Uppercase tag, badge |

---

## 3. SPACING & LAYOUT

```
spacing.xs    =  4px
spacing.sm    =  8px
spacing.md    = 12px
spacing.base  = 16px
spacing.lg    = 20px
spacing.xl    = 24px
spacing.2xl   = 32px
spacing.3xl   = 40px
spacing.4xl   = 48px

radius.xs   =  4px
radius.sm   =  8px
radius.md   = 12px
radius.lg   = 16px
radius.xl   = 20px
radius.2xl  = 24px   ← Photo card, camera frame
radius.full = 999px  ← Pill badge, avatar, button tròn

layout.screenPadding    = 16px   ← padding ngang mặc định
layout.cardPadding      = 16px
layout.sectionGap       = 12px   ← khoảng cách giữa các card
layout.gridGap          = 2px    ← khoảng cách giữa ảnh trong lưới 3 cột
layout.cameraSquareSize = screenWidth - 32px  ← khung vuông camera
layout.tabBarHeight     = 82px   ← bao gồm home indicator area iOS
layout.topBarHeight     = 52px
```

---

## 4. SHADOWS

> Dark mode: không dùng shadow (depth thể hiện bằng màu nền)
> Light mode: dùng shadow nhẹ để tạo chiều sâu

```
shadow.card (light only):
  shadowColor: #000000
  shadowOffset: { width: 0, height: 2 }
  shadowOpacity: 0.08
  shadowRadius: 8px
  elevation: 3   ← Android

shadow.modal (light only):
  shadowColor: #000000
  shadowOffset: { width: 0, height: -4 }
  shadowOpacity: 0.12
  shadowRadius: 16px
  elevation: 8

shadow.button.accent:
  shadowColor: #FF6B35
  shadowOffset: { width: 0, height: 4 }
  shadowOpacity: 0.35
  shadowRadius: 12px
  elevation: 6
  ← Dùng cho nút camera giữa menu bar (cả 2 mode)
```

---

## 5. COMPONENT STYLES

### Button

#### Primary Button (CTA chính)
```
background:      #FF6B35
text:            #FFFFFF   type.headline
height:          52px
borderRadius:    radius.lg (16px)
paddingH:        24px

State — Pressed:
  background:    #E55A28
  transform:     scale(0.97)

State — Disabled:
  Dark:  background #2A2A2A  /  text #48484A
  Light: background #E5E5EA  /  text #AEAEB2

State — Loading:
  background:    #FF6B35
  spinner:       white, center
```

#### Secondary Button
```
background:      transparent
border:          1px  border.default
text:            text.primary   type.headline
height:          52px
borderRadius:    radius.lg

State — Pressed:
  Dark:  background rgba(255,255,255,0.06)
  Light: background rgba(0,0,0,0.04)
```

#### Ghost / Text Button
```
background:      transparent
text:            text.secondary   type.body
underline:       none

State — Pressed:
  text:          text.primary
```

#### Shutter Button (Nút giữa menu bar)
```
outerSize:       56px circle
outerBg:         #FF6B35
innerSize:       46px circle
innerBg:         rgba(255,255,255,0.25)
shadow:          shadow.button.accent

State — Pressed:
  transform:     scale(0.93)
  haptic:        medium impact
```

#### Icon Button (nút nhỏ trên camera)
```
Dark:  background rgba(0,0,0,0.45)  /  icon #FFFFFF
Light: background rgba(255,255,255,0.8)  /  icon #000000
size:            32px circle
backdropBlur:    8px
```

---

### Input Field
```
height:          52px
borderRadius:    radius.md (12px)
background:      bg.input
border:          1px  border.default
text:            text.primary   type.body
placeholder:     text.placeholder

State — Focused:
  border:        1px  #FF6B35
  (không đổi background)

State — Error:
  border:        1px  text.danger
  helperText:    text.danger  type.callout below field

Left icon:       icon.secondary  20px
Right icon:      icon.secondary  20px (eye toggle, clear button)
```

---

### Calorie Badge Pill
```
height:          26px
borderRadius:    radius.full
paddingH:        10px
gap:             5px  (giữa dot và text)
leftDot:         6px circle

TYPE — Food (calo nạp — dương):
  background:    rgba(39, 196, 118, 0.15)
  border:        1px rgba(39, 196, 118, 0.35)
  dotColor:      #27C476
  text:          #27C476   type.caption2

TYPE — Workout (calo đốt — âm):
  background:    rgba(255, 107, 53, 0.15)
  border:        1px rgba(255, 107, 53, 0.35)
  dotColor:      #FF6B35
  text:          #FF6B35   type.caption2

TYPE — Over goal (vượt mục tiêu):
  background:    rgba(255, 59, 48, 0.15)
  border:        1px rgba(255, 59, 48, 0.35)
  dotColor:      #FF3B30
  text:          #FF3B30   type.caption2
```

---

### Avatar
```
Sizes:
  xs:   24px  ← overlay trên ảnh
  sm:   32px  ← post detail
  md:   36px  ← top bar camera
  lg:   44px  ← danh sách bạn bè
  xl:   80px  ← profile header

Default (no photo):
  background:   #FF6B35
  text:         #FFFFFF  initials  type.headline

Border — Active friend:
  border:  2.5px  #FF6B35

Border — Story / chưa xem:
  border:  2.5px  border.default
```

---

### Surface Card
```
Dark:   background #1A1A1A  /  border 1px rgba(255,255,255,0.06)
Light:  background #FFFFFF  /  border 1px rgba(0,0,0,0.06)  /  shadow.card

borderRadius:  radius.xl (20px)
padding:       spacing.base (16px)
```

---

### Photo Card (lưới 3 cột)
```
aspectRatio:    1:1
borderRadius:   0px  ← edge-to-edge trong lưới
gap:            layout.gridGap (2px)

Overlay — Calo badge:
  position:     bottom-right corner
  padding:      4px
  badge:        Calorie Badge Pill (size mini)

Overlay — gradient:
  Dark:  linear-gradient(transparent, rgba(0,0,0,0.55))
  Light: linear-gradient(transparent, rgba(0,0,0,0.35))
```

---

### Camera Frame (Khung vuông)
```
size:           layout.cameraSquareSize
borderRadius:   radius.2xl (24px)
overflow:       hidden

Border — Default:
  none

Overlay — Grid (rule of thirds):
  lines:        2H + 2V
  color:        rgba(255,255,255,0.08)
  width:        0.5px

Focus Ring (khi tap):
  size:         60x60px
  border:       1.5px  #FF6B35
  borderRadius: radius.sm (8px)
  animation:    fade in 150ms → dim 500ms
```

---

### Menu Bar
```
Dark:
  background:   rgba(0,0,0,0.92)
  borderTop:    0.5px rgba(255,255,255,0.08)

Light:
  background:   rgba(255,255,255,0.92)
  borderTop:    0.5px rgba(0,0,0,0.08)

backdropBlur:   20px
height:         layout.tabBarHeight (82px)

Icon — Inactive:
  Dark:  icon.inactive  (#3A3A3C)
  Light: icon.tertiary  (#C7C7CC)

Icon — Active:
  color: #FF6B35
```

---

### Ring Chart (Vòng tròn calo)
```
strokeLinecap:  round
trackColor:     
  Dark:  #222222
  Light: #E5E5EA

Ring Ngoài (Calo nạp):
  color:        #FF6B35
  strokeWidth:  5px

Ring Trong (Calo đốt):
  color:        #27C476
  strokeWidth:  4px

Center text — số calo:
  font:         SF Mono  type.display
  color:        text.primary

Center text — label:
  font:         type.caption2
  color:        text.tertiary
```

---

### Skeleton Loading
```
Dark:
  base:        #1A1A1A
  shimmer:     #2A2A2A

Light:
  base:        #E5E5EA
  shimmer:     #F2F2F7

animation:     shimmer chạy từ trái → phải, 1.2s loop
```

---

### Chat Bubble
```
Bubble — Của mình (right):
  background:   #FF6B35
  text:         #FFFFFF
  borderRadius: 18px 18px 4px 18px

Bubble — Của bạn (left):
  Dark:  background #2A2A2A  /  text #FFFFFF
  Light: background #E5E5EA  /  text #000000
  borderRadius: 18px 18px 18px 4px

timestamp:      type.caption1  text.tertiary  centered
```

---

## 6. MOTION & ANIMATION

### Easing Presets
```
spring.default:    damping 0.8,  stiffness 300,  mass 1
spring.snappy:     damping 0.75, stiffness 400,  mass 0.8
spring.gentle:     damping 0.9,  stiffness 200,  mass 1
easing.easeOut:    cubic-bezier(0.0, 0.0, 0.2, 1.0)
easing.easeInOut:  cubic-bezier(0.4, 0.0, 0.2, 1.0)
```

### Duration Presets
```
duration.instant:  100ms
duration.fast:     200ms
duration.normal:   300ms
duration.slow:     500ms
duration.ring:     600ms   ← ring chart draw animation
duration.ai:       800ms   ← pulse loop khi AI loading
```

### Transition Catalog
| Tên | Trigger | Animation |
|---|---|---|
| `swipe.horizontal` | Vuốt ngang giữa Camera / Chat / Lịch sử | Slide + spring.default |
| `modal.slideUp` | Mở Post Detail, Modal Kết bạn | Slide từ dưới + spring.snappy |
| `modal.dismiss` | Swipe down đóng modal | Follow gesture + spring.gentle |
| `camera.open` | Nhấn nút Camera menu bar | Scale up từ vị trí nút + fade, 250ms |
| `shutter.press` | Nhấn nút chụp | Scale 0.93 + haptic medium + flash white 80ms |
| `flash.capture` | Ngay sau chụp | White overlay opacity 0→0.6→0, 120ms |
| `badge.appear` | Badge calo xuất hiện sau AI | Scale 0→1.1→1 + spring, delay 400ms |
| `ring.draw` | Vào màn có ring chart | strokeDashoffset từ full → value, 600ms easeOut |
| `ai.pulse` | Khi đang gọi Gemini | Opacity 1→0.4→1, 800ms loop |
| `post.save` | Lưu bài thành công | Nút đổi sang ✓ green + scale, ảnh mới trượt vào lưới |
| `grid.appear` | Ảnh mới vào lưới | Fade + scale từ 0.9, delay stagger 50ms |
| `streak.celebrate` | Đạt streak mới | Confetti nhỏ từ trên + badge bounce |

---

## 7. HAPTIC FEEDBACK

| Hành động | Loại haptic |
|---|---|
| Nhấn nút Chụp ảnh | `ImpactFeedbackStyle.Medium` |
| Lưu bài thành công | `NotificationFeedbackType.Success` |
| Like / react bài | `ImpactFeedbackStyle.Light` |
| Xoá bài / log | `NotificationFeedbackType.Warning` |
| Lỗi / thất bại | `NotificationFeedbackType.Error` |
| Swipe tab / đổi màn | `ImpactFeedbackStyle.Light` |
| Bật / tắt toggle | `ImpactFeedbackStyle.Light` |
| Long press card | `ImpactFeedbackStyle.Heavy` |

---

## 8. ICON SYSTEM

### Thư viện: SF Symbols (iOS native)
> Dùng SF Symbols để đảm bảo look & feel hoàn toàn native trên iOS.
> Fallback cho Android: Lucide Icons (same naming convention)

| Vị trí | SF Symbol | Lucide fallback |
|---|---|---|
| Camera / Chụp | `camera.circle.fill` | `camera` |
| Shutter (nút giữa) | `circle.inset.filled` | `circle-dot` |
| Chat / Tin nhắn | `message.fill` | `message-circle` |
| Profile / Avatar | `person.crop.circle.fill` | `user-circle` |
| Thêm bạn | `person.badge.plus` | `user-plus` |
| Lịch sử | `chart.bar.fill` | `bar-chart-2` |
| Flash bật | `bolt.fill` | `zap` |
| Flash tắt | `bolt.slash.fill` | `zap-off` |
| Flash auto | `bolt.badge.a.fill` | `zap` |
| Flip camera | `arrow.triangle.2.circlepath.camera` | `refresh-cw` |
| Upload / Thư viện | `photo.on.rectangle` | `image` |
| Đồ ăn | `fork.knife` | `utensils` |
| Tập luyện | `flame.fill` | `flame` |
| Cài đặt | `gearshape.fill` | `settings` |
| Đóng / X | `xmark` | `x` |
| Back | `chevron.left` | `chevron-left` |
| Streak | `flame.fill` | `flame` |
| Chỉnh sửa | `pencil` | `edit-2` |
| Xoá | `trash.fill` | `trash-2` |
| Chia sẻ | `square.and.arrow.up` | `share-2` |
| Party Mode | `person.3.fill` | `users` |
| Đạt mục tiêu | `checkmark.seal.fill` | `check-circle` |

---

## 9. THEME SWITCHING

### Logic chọn theme
```
Priority order:
  1. User setting trong app (nếu đã tự chọn Light / Dark)
  2. iOS System Appearance (Appearance.getColorScheme())
  3. Default: Dark Mode

User có thể chọn:
  - "Theo hệ thống" (auto)
  - "Sáng" (light)
  - "Tối" (dark)

Lưu setting vào:  AsyncStorage  key: 'calsnap_theme'
```

### Implementation (React Native)
```typescript
// theme/colors.ts
export const darkTheme = {
  bg: {
    base:     '#000000',
    surface:  '#111111',
    elevated: '#1A1A1A',
    card:     '#1A1A1A',
    input:    '#1A1A1A',
    tabBar:   'rgba(0,0,0,0.92)',
    modal:    '#1A1A1A',
    overlay:  'rgba(0,0,0,0.6)',
    skeleton: '#2A2A2A',
  },
  text: {
    primary:     '#FFFFFF',
    secondary:   '#8E8E93',
    tertiary:    '#48484A',
    placeholder: '#3A3A3C',
    inverse:     '#000000',
    link:        '#FF6B35',
    danger:      '#FF453A',
  },
  border: {
    subtle:  'rgba(255,255,255,0.06)',
    default: 'rgba(255,255,255,0.10)',
    strong:  'rgba(255,255,255,0.18)',
    focus:   '#FF6B35',
  },
  icon: {
    primary:   '#FFFFFF',
    secondary: '#8E8E93',
    inactive:  '#3A3A3C',
    accent:    '#FF6B35',
  },
}

export const lightTheme = {
  bg: {
    base:     '#F2F2F7',
    surface:  '#FFFFFF',
    elevated: '#FFFFFF',
    card:     '#FFFFFF',
    input:    '#F2F2F7',
    tabBar:   'rgba(255,255,255,0.92)',
    modal:    '#FFFFFF',
    overlay:  'rgba(0,0,0,0.4)',
    skeleton: '#E5E5EA',
  },
  text: {
    primary:     '#000000',
    secondary:   '#6C6C70',
    tertiary:    '#AEAEB2',
    placeholder: '#C7C7CC',
    inverse:     '#FFFFFF',
    link:        '#FF6B35',
    danger:      '#FF3B30',
  },
  border: {
    subtle:  'rgba(0,0,0,0.06)',
    default: 'rgba(0,0,0,0.10)',
    strong:  'rgba(0,0,0,0.18)',
    focus:   '#FF6B35',
  },
  icon: {
    primary:   '#000000',
    secondary: '#6C6C70',
    inactive:  '#C7C7CC',
    accent:    '#FF6B35',
  },
}

// Brand không đổi theo theme
export const brand = {
  orange:       '#FF6B35',
  orangeDark:   '#E55A28',
  orangeLight:  '#FF8C5A',
  orangeMuted:  'rgba(255,107,53,0.15)',
  green:        '#27C476',
  greenDark:    '#1DA560',
  greenMuted:   'rgba(39,196,118,0.15)',
  yellow:       '#FFD60A',
  red:          '#FF3B30',
  purple:       '#7B61FF',
}
```

### useTheme Hook
```typescript
// hooks/useTheme.ts
import { useColorScheme } from 'react-native'
import { useThemeStore } from '@/store/themeStore'
import { darkTheme, lightTheme, brand } from '@/theme/colors'

export function useTheme() {
  const systemScheme = useColorScheme()         // 'light' | 'dark' | null
  const userPreference = useThemeStore(s => s.preference) // 'system' | 'light' | 'dark'

  const resolvedScheme =
    userPreference === 'system'
      ? (systemScheme ?? 'dark')
      : userPreference

  const colors = resolvedScheme === 'dark' ? darkTheme : lightTheme
  const isDark  = resolvedScheme === 'dark'

  return { colors, brand, isDark, scheme: resolvedScheme }
}
```

---

## 10. DARK vs LIGHT — VISUAL PREVIEW

### Dark Mode
```
┌────────────────────────────┐
│ bg: #000000                │
│ ┌──────────────────────┐   │
│ │ surface: #111111      │  │
│ │  ┌────────────────┐  │  │
│ │  │ card: #1A1A1A  │  │  │
│ │  │                │  │  │
│ │  │ text: #FFFFFF  │  │  │
│ │  │ sub:  #8E8E93  │  │  │
│ │  │ hint: #48484A  │  │  │
│ │  │                │  │  │
│ │  │ [■ #FF6B35  ] │  │  │  ← button
│ │  └────────────────┘  │  │
│ └──────────────────────┘   │
│                            │
│ tabbar: rgba(0,0,0,0.92)   │
└────────────────────────────┘
```

### Light Mode
```
┌────────────────────────────┐
│ bg: #F2F2F7                │
│ ┌──────────────────────┐   │
│ │ surface: #FFFFFF      │  │
│ │  ┌────────────────┐  │  │
│ │  │ card: #FFFFFF  │  │  │
│ │  │ shadow: ✓      │  │  │
│ │  │                │  │  │
│ │  │ text: #000000  │  │  │
│ │  │ sub:  #6C6C70  │  │  │
│ │  │ hint: #AEAEB2  │  │  │
│ │  │                │  │  │
│ │  │ [■ #FF6B35  ] │  │  │  ← button (same)
│ │  └────────────────┘  │  │
│ └──────────────────────┘   │
│                            │
│ tabbar: rgba(255,255,255,  │
│              0.92)         │
└────────────────────────────┘
```

---

## 11. ACCESSIBILITY

```
Contrast ratios (WCAG AA — tối thiểu 4.5:1 cho text thường):

Dark Mode:
  text.primary  (#FFF) on bg.card (#1A1A1A):    contrast ~15.3:1  ✅
  text.secondary (#8E8E93) on bg.card (#1A1A1A): contrast ~4.6:1  ✅
  brand.orange (#FF6B35) on bg.base (#000):      contrast ~5.8:1  ✅

Light Mode:
  text.primary  (#000) on bg.card (#FFF):        contrast ~21:1   ✅
  text.secondary (#6C6C70) on bg.card (#FFF):    contrast ~5.9:1  ✅
  brand.orange (#FF6B35) on bg.card (#FFF):      contrast ~3.5:1  ⚠️
    → Chỉ dùng orange cho heading lớn (>18px) hoặc bold text

Minimum tap target:  44 x 44px  (Apple HIG standard)
Font scaling:        Hỗ trợ Dynamic Type của iOS (text scale theo cài đặt accessibility)
```
