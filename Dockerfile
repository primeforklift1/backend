# Gunakan node image versi 16.20.2 sebagai base image
FROM node:18.20.3

# Buat direktori app
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json ke direktori app
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file dari direktori saat ini ke direktori app pada image
COPY . .

RUN chmod -R 777 /usr/src/app/uploads

# Expose port 5000
EXPOSE 5000

# Command untuk menjalankan aplikasi ketika container dijalankan
CMD ["node", "server.js"]
