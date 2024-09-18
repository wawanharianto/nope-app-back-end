/* eslint-disable linebreak-style */
const Hapi = require('@hapi/hapi');
const routes = require('./routes');

// Fungsi untuk menginisialisasi server
const init = async () => {
  const server = Hapi.server({    
    port: 5000,
    // Menentukan host berdasarkan NODE_ENV
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'], // Mengizinkan CORS dari semua origin
      },
    },
  });

  // Menambahkan route ke server
  server.route(routes);

  // Menjalankan server
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

// Memanggil fungsi init untuk menjalankan server
init();