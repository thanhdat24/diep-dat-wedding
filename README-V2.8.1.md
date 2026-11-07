# Wedding HTML Optimizer V2.8.1

Bộ này dành cho cấu trúc website cưới V2.7 hiện tại.

## Cách dùng

1. Giải nén toàn bộ nội dung ZIP vào **cùng thư mục với `index.html`**.
2. Đảm bảo project có:
   - `index.html`
   - `css/custom.css`
   - `js/config.js`
   - `js/customize.js`
   - `assets/images/...`
3. Nhấp đúp `APPLY-OPTIMIZE-V2.8.1.bat`.
4. Script tự tạo `index.before-v2.8.html` trước khi sửa.
5. Chạy web local và Ctrl+F5 để kiểm tra.
6. Nếu ổn, deploy lại Vercel.

## Những phần được dọn

- Xóa SECTION4 (Timeline/Dresscode) vì hiện đã bị ẩn.
- Xóa form RSVP và popup xác nhận không dùng.
- Xóa backdrop/lightbox LadiPage không dùng.
- Xóa class animation runtime cũ.
- Chuyển CSS layout lớn ra `css/base-v2.8.css`.
- Bỏ CSS form/checkout/popup/lightbox thừa.
- Xóa 10 slide gallery hard-code; `customize.js` V2.7 tự tạo từ `config.js`.
- Xóa fallback tiếng Anh cũ để không nháy nội dung sai khi F5.
- Đưa `config.js` + `customize.js` lên `<head>` bằng `defer`.
- Preload `cover.jpg`.
- Gộp Google Fonts thành một request.
- Thêm responsive an toàn cho canvas gốc 420px.

## Responsive

- Màn hình rộng đến 500px (mọi iPhone dọc, từ iPhone 8 375px đến 16 Pro Max 440px): scale toàn trang vừa khít chiều rộng, không còn viền trắng hai bên.
- Rộng hơn 500px (điện thoại xoay ngang, tablet, máy tính): giữ 420px 1:1 ở giữa, không phóng ảnh làm giảm chất lượng.
- Khi xoay màn hình: tự tính lại scale.
- Không dùng `window.ladi_viewport()`, tránh double-scale trong Messenger/Zalo.

## Khôi phục

Nếu có vấn đề, xóa `index.html` mới và đổi:

`index.before-v2.8.html` -> `index.html`


## Fix V2.8.1

- Sửa đường dẫn asset trong CSS: `assets/...` -> `../assets/...`.
- Tránh lỗi request `/css/assets/images/...`.
