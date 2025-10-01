// Punto de entrada principal para la API
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();


app.use(express.json());

// Importar rutas
const authRoutes = require('./interfaces/routes/authRoutes');
const productRoutes = require('./interfaces/routes/productRoutes');
const orderRoutes = require('./interfaces/routes/orderRoutes');
const userRoutes = require('./interfaces/routes/userRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto http://localhost:${PORT}/api/products`);
    });
  })
  .catch((err) => {
    console.error('Error al conectar a MongoDB:', err);
  });
