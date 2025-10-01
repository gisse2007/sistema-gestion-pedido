import ProductRepositoryMongo from "../../../infrastructure/repositories/ProductRepositoryMongo.js";
const productRepository = new ProductRepositoryMongo();

class PutOrderById {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(id, orderData) {
    // Buscar la orden original
    const existingOrder = await this.orderRepository.findById(id);
    if (!existingOrder) {
      throw new Error("Pedido no encontrado");
    }

    let total = 0;

    // 🟢 Caso: CANCELAR PEDIDO
    if (orderData.status === "cancelado") {
      for (const item of existingOrder.details) {
        const product = await productRepository.findById(item.product);
        if (product) {
          // Restaurar stock al valor original
          await productRepository.updateById(product._id, {
            stock: product.stock + item.quantity,
          });
        }
      }

      // Actualizar solo status y fecha
      return await this.orderRepository.updateById(id, {
        status: "cancelado",
        updatedAt: new Date(),
      });
    }

    // 🟢 Caso: ACTUALIZAR PEDIDO NORMAL
    if (orderData.details && orderData.details.length > 0) {
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
    }

    const order = await this.orderRepository.updateById(id, {
      ...orderData,
      total,
      updatedAt: new Date(),
    });

    return order;
  }
}

export default PutOrderById;
