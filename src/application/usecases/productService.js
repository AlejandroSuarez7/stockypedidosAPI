const ProductModel = require('../../infrastructure/database/ProductModel');

class ProductService {
  static async createProduct(data) {
    const product = new ProductModel(data);
    await product.save();
    return product;
  }

  static async getAllProducts() {
    return ProductModel.find();
  }

  static async getProductById(id) {
    return ProductModel.findById(id);
  }

  static async updateProduct(id, data) {
    return ProductModel.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteProduct(id) {
    return ProductModel.findByIdAndDelete(id);
  }
}

module.exports = ProductService;
