class Product {
  constructor({ id, nombre, descripcion, precio, stock, categoria, createdAt }) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.stock = stock;
    this.categoria = categoria;
    this.createdAt = createdAt;
  }
}

module.exports = Product;
