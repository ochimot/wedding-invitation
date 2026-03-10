# 💐 Wedding Invitation - Thiệp Cưới Online

Ứng dụng thiệp cưới online hiện đại với Next.js, TypeScript, và MongoDB.

## ✨ Tính năng

- 🎨 **Giao diện hiện đại**: Thiết kế đẹp mắt với gradient và hiệu ứng chuyển động
- 🎵 **Nhạc nền**: Phát nhạc nền với điều khiển play/pause và mute
- ✨ **Hiệu ứng Animation**: Sử dụng Framer Motion cho các hiệu ứng mượt mà
- 💝 **Thiệp mời động**: Tạo thiệp mời riêng biệt cho từng khách mời theo URL
- 📝 **Form lời chúc**: Khách mời có thể gửi lời chúc và xác nhận tham dự
- 💾 **Lưu trữ MongoDB**: Lưu trữ và hiển thị tất cả lời chúc từ khách mời
- 📱 **Responsive**: Hoạt động tốt trên mọi thiết bị

## 🛠️ Công nghệ sử dụng

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Database**: MongoDB với Mongoose
- **Icons**: React Icons

## 🚀 Cài đặt

### Yêu cầu

- Node.js 18+
- MongoDB (local hoặc MongoDB Atlas)

## Getting Started

1. **Cài đặt dependencies**:
```bash
npm install
```

2. **Cấu hình MongoDB**:
   - Sao chép file `.env.example` thành `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   - Cập nhật `MONGODB_URI` trong `.env.local`:
     ```
     MONGODB_URI=mongodb://localhost:27017/wedding-invitation
     # Hoặc MongoDB Atlas:
     # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wedding-invitation
     ```

3. **Thêm nhạc nền** (tùy chọn):
   - Đặt file nhạc `.mp3` vào `public/music/wedding-song.mp3`

4. **Chạy development server**:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Cấu trúc dự án

```
wedding-invitation/
├── app/
│   ├── api/wishes/route.ts       # API endpoint cho lời chúc
│   ├── invitation/[id]/page.tsx  # Trang thiệp mời động
│   ├── layout.tsx                # Layout chính
│   └── page.tsx                  # Trang chủ
├── components/
│   ├── BackgroundMusic.tsx       # Component nhạc nền
│   ├── FloatingHearts.tsx        # Hiệu ứng tim bay
│   ├── GuestWishForm.tsx         # Form gửi lời chúc
│   ├── InvitationHeader.tsx      # Header thiệp mời
│   └── WishesList.tsx            # Danh sách lời chúc
├── lib/mongodb.ts                # Kết nối MongoDB
├── models/GuestWish.ts           # Model Mongoose
└── public/music/                 # Thư mục nhạc nền
```

## 🎯 Sử dụng

### Tạo thiệp mời mới

Truy cập URL: `/invitation/[id]` với `[id]` là mã định danh duy nhất.

Ví dụ:
- `/invitation/demo`
- `/invitation/nguyen-van-a`

### Tùy chỉnh thông tin

Chỉnh sửa file `app/invitation/[id]/page.tsx`:

```typescript
const invitationData = {
  brideName: 'Ngọc Anh',
  groomName: 'Minh Tuấn',
  date: 'Chủ Nhật, 15 tháng 06, 2026',
  venue: 'Nhà Hàng Tiệc Cưới Riverside',
  time: '18:00',
  address: '123 Đường Nguyễn Huệ, Quận 1, TP.HCM',
};
```

## 📝 Scripts

```bash
npm run dev    # Development
npm run build  # Build
npm start      # Production
npm run lint   # Lint
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
