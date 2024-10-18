import { pool } from '../config/db_config.js';

export const getProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await pool.query('SELECT * FROM productos WHERE id = $1', [
      id,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Producto no encontrado' });
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { nombre, descripcion, precio, cantidad } = req.body;
    if (!nombre || !descripcion || !precio || !cantidad)
      return res.status(400).send('Faltan datos obligatorios');

    if (nombre.length > 50 || descripcion.length > 255)
      return res.status(400).send('Longitud de nombre o descripción excedida');

    if (precio <= 0 || cantidad <= 0)
      return res.status(400).send('Precio o cantidad no válidos');

    await pool.query(
      'INSERT INTO productos (nombre, descripcion, precio, cantidad, fecha_creacion, fecha_actualizacion) VALUES ($1, $2, $3, $4, NOW(), NOW())',
      [nombre, descripcion, precio, cantidad]
    );
    res.status(201).json({ message: 'Producto creado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto' });
  }
};

export const updateProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, descripcion, precio, cantidad } = req.body;
    if (!nombre || !descripcion || !precio || !cantidad)
      return res.status(400).send('Faltan datos obligatorios');

    if (nombre.length > 50 || descripcion.length > 255)
      return res.status(400).send('Longitud de nombre o descripción excedida');

    if (precio <= 0 || cantidad <= 0)
      return res.status(400).send('Precio o cantidad no válidos');

    await pool.query(
      'UPDATE productos SET nombre = $1, descripcion = $2, precio = $3, cantidad = $4, fecha_actualizacion = NOW() WHERE id = $5',
      [nombre, descripcion, precio, cantidad, id]
    );
    res.status(200).json({ message: 'Producto actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
};
