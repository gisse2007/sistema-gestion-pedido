import ProductRepositoryMongo from "../../../infrastructure/repositories/ProductRepositoryMongo.js";
const productRepository = new ProductRepositoryMongo();

class PutOrderById {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(id, orderData) {
    let total = 0;

    for (const item of orderData.details) {
      const product = await productRepository.findById(item.product);
      if (!product) throw new Error("Producto no encontrado");

      if (product.stock < item.quantity) {
        throw new Error(`Stock insuficiente para el producto: ${product.name}`);
      }

      item.price = product.price;
      total += product.price * item.quantity;

      await productRepository.updateById(product._id, {
        stock: product.stock - item.quantity,
      });
    }

    const order = await this.orderRepository.updateById(id, {
      ...orderData,
      total,
    });

    return order;
  }
}

export default PutOrderById;
