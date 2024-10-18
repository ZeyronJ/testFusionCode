import express from 'express';
import cors from 'cors';
import routerProducts from './routes/productos.routes.js';
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/productos', routerProducts);

app.listen(PORT, () => {
  console.log(`Server corriendo en http://localhost:${PORT}/`);
}); // Inicia servidor
