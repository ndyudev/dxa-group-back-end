# DXA Group Backend

## Mô tả
Backend cho website DXA Group, sử dụng Node.js, Express, MongoDB (Mongoose), JWT Auth, Nodemailer, Multer, v.v.

---

## 1. Cài đặt

```bash
cd dxa-back-end-website
npm install
```

---

## 2. Cấu hình môi trường
Tạo file `.env` ở thư mục gốc (cùng cấp với `package.json`):

```
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority&appName=dxagroup
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
ADMIN_EMAIL=admin@yourdomain.com
```

- Thay `<user>`, `<password>`, ... bằng thông tin thực tế của bạn.
- Nếu chạy local, có thể dùng:
  ```
  MONGODB_URI=mongodb://localhost:27017/dxa-group
  ```

---

## 3. Chạy server

```bash
npm run dev
```

Server mặc định chạy ở: [http://localhost:5001](http://localhost:5001)

---

## 4. Các lỗi thường gặp & cách khắc phục

### **FATAL ERROR: MONGODB_URI is not defined**
- Đảm bảo file `.env` nằm ở đúng thư mục gốc backend, không nằm trong `src`.
- Đảm bảo tên file là `.env` (không phải `.env.txt`).
- Đảm bảo có dòng `require('dotenv').config();` ở đầu file `src/index.js` hoặc `src/config/database.js`.

### **Route.get() requires a callback function but got a [object Undefined]**
- Do import middleware hoặc controller bị undefined.
- Đảm bảo import middleware đúng:
  ```js
  const auth = require('../middleware/auth');
  const isAdmin = require('../middleware/auth').isAdmin;
  ```
- Đảm bảo các hàm controller đều được export đúng tên.

### **Token is not valid / No token, authorization denied**
- Khi gọi API cần truyền header `x-auth-token` hoặc `Authorization: Bearer <token>`.

### **Không gửi được email**
- Đảm bảo cấu hình đúng `EMAIL_USER`, `EMAIL_PASS` (nên dùng Gmail App Password).
- Kiểm tra quyền truy cập ứng dụng của Gmail.

### **Không kết nối được MongoDB Atlas**
- Kiểm tra lại connection string.
- Kiểm tra mục Network Access trên Atlas đã cho phép IP của bạn.

---

## 5. Cấu trúc thư mục

```
dxa-back-end-website/
  .env
  package.json
  src/
    config/
    controllers/
    middleware/
    models/
    routes/
    scripts/
    index.js
```

---

## 6. Một số lệnh hữu ích

- Khởi động server: `npm run dev`
- Chạy seed data: `node src/scripts/seedData.js`

---

## 7. Đóng góp & phát triển
- Fork, tạo branch, PR như các dự án open source chuẩn.
- Gặp lỗi, tạo issue hoặc gửi log lên để được hỗ trợ.

---

## 8. Liên hệ
- Email: hello@dxagroup.com
- Website: https://dxagroup.com 