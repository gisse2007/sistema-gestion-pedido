import ProductRepositoryMongo from "../repositories/ProductRepositoryMongo.js";

import CreateProduct from "../../application/use-cases/product/CreateProduct.js";
import GetProducts from "../../application/use-cases/product/GetProducts.js";
import GetProductsById from "../../application/use-cases/product/GetProductsById.js";
import PutProductsById from "../../application/use-cases/product/PutProductsByd.js";
import DeleteProductsById from "../../application/use-cases/product/DeleteProductsById.js";

const productRepository = new ProductRepositoryMongo();

class productController {
  async create(req, res) {
    try {
      const createProduct = new CreateProduct(productRepository);
      const product = await createProduct.execute(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const getProducts = new GetProducts(productRepository);
      const products = await getProducts.execute();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const getProductsById = new GetProductsById(productRepository);
      const product = await getProductsById.execute(req.params.id);
      if (!product) return res.status(404).json({ error: "Producto no encontrado" });
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async updateById(req, res) {
    try {
      const putProductsById = new PutProductsById(productRepository);
      const product = await putProductsById.execute(req.params.id, req.body);
      if (!product) return res.status(404).json({ error: "Producto no encontrado" });
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteById(req, res) {
    try {
      const deleteProductsById = new DeleteProductsById(productRepository);
      const product = await deleteProductsById.execute(req.params.id);
      if (!product) return res.status(404).json({ error: "Producto no encontrado" });
      res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new productController();
