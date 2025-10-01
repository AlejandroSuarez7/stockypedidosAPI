const ProductService = require('../../application/usecases/productService');

const createProduct = async (req, res) => {
  try {
    const product = await ProductService.createProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllProducts = async (req, res) => {
  const products = await ProductService.getAllProducts();
  res.json(products);
};

const getProductById = async (req, res) => {
  const product = await ProductService.getProductById(req.params.id);
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(product);
};

const updateProduct = async (req, res) => {
  const product = await ProductService.updateProduct(req.params.id, req.body);
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(product);
};

const deleteProduct = async (req, res) => {
  const product = await ProductService.deleteProduct(req.params.id);
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json({ message: 'Producto eliminado' });
};

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
