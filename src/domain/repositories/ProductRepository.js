const ProductModel = require('../../infrastructure/database/ProductModel');

class ProductRepository {
  async create(productData) {
    const product = new ProductModel(productData);
    return await product.save();
  }

  async findById(id) {
    return await ProductModel.findById(id);
  }

  async findAll() {
    return await ProductModel.find();
  }

  async findByCategory(categoria) {
    return await ProductModel.find({ categoria });
  }

  async update(id, productData) {
    return await ProductModel.findByIdAndUpdate(id, productData, { new: true });
  }

  async delete(id) {
    return await ProductModel.findByIdAndDelete(id);
  }

  async updateStock(id, stock) {
    return await ProductModel.findByIdAndUpdate(id, { stock }, { new: true });
  }
}

module.exports = ProductRepository;