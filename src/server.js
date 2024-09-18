/* eslint-disable linebreak-style */
const Hapi = require('@hapi/hapi');
const https = require('https'); // Mengimpor modul https
const fs = require('fs'); // Mengimpor modul fs untuk membaca file
const routes = require('./routes');

// Fungsi untuk menginisialisasi server
const init = async () => {
  // Membaca sertifikat dan kunci
  const options = {
    key: fs.readFileSync('./certs/server.key'), // Ganti dengan path ke file kunci
    cert: fs.readFileSync('./certs/server.crt'), // Ganti dengan path ke file sertifikat
  };

  // Mengatur server dengan Hapi
  const server = Hapi.server({    
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'], // Mengizinkan CORS dari semua origin
      },
    },
  });

  // Menambahkan route ke server
  server.route(routes);

  // Menggunakan https untuk server
  const httpsServer = https.createServer(options, server.listener);

  // Menjalankan server
  await new Promise((resolve, reject) => {
    httpsServer.listen(5000, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });

  console.log(`Server berjalan pada https://${server.info.host}:${server.info.port}`);
};

// Memanggil fungsi init untuk menjalankan server
init();
