# Sử dụng một hình ảnh Node.js có sẵn
FROM node:20-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép mã nguồn của ứng dụng vào thư mục làm việc
COPY . .

# Mở cổng 3000, có thể điều chỉnh tùy ý
EXPOSE 9000

# Khởi chạy ứng dụng
CMD ["npm", "start"]
