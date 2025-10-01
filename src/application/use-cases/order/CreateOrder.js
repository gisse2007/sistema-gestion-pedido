import ProductRepositoryMongo from "../../../infrastructure/repositories/ProductRepositoryMongo.js";
const productRepository = new ProductRepositoryMongo();

class CreateOrder {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(orderData) {
    let total = 0;

    for (const item of orderData.details) {
      const product = await productRepository.findById(item.product);
      if (!product) throw new Error("Producto no encontrado");

      if (product.stock < item.quantity) {
        throw new Error(`Stock insuficiente para el producto: ${product.name}`);
      }

      // Calcular subtotal
      item.price = product.price;
      total += product.price * item.quantity;

      // Restar del stock
      await productRepository.updateById(product._id, {
        stock: product.stock - item.quantity,
      });
    }

    const order = await this.orderRepository.create({
      ...orderData,
      total,
    });

    return order;
  }
}

export default CreateOrder;
