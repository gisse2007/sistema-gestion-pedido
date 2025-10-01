import OrderRepositoryMongo from "../repositories/OrderRepositoryMongo.js";
import CreateOrder from "../../application/use-cases/order/CreateOrder.js";
import PutOrderById from "../../application/use-cases/order/PutOrderById.js";
import GetOrder from "../../application/use-cases/order/GetOrder.js";
import GetOrderById from "../../application/use-cases/order/GetOrderById.js";
import DeleteOrderById from "../../application/use-cases/order/DeleteOrderById.js";

const orderRepository = new OrderRepositoryMongo();

class orderController {
  async create(req, res) {
    try {
      const createOrder = new CreateOrder(orderRepository);
      const order = await createOrder.execute({
        ...req.body,
        user: req.user.id, 
      });
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const getOrder = new GetOrder(orderRepository);
      const orders = await orderRepository.findAll();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const getOrderById = new GetOrderById(orderRepository);
      const order = await orderRepository.findById(req.params.id);
      if (!order) return res.status(404).json({ error: "Pedido no encontrado" });
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateById(req, res) {
    try {
      const updateOrder = new PutOrderById(orderRepository);
      const order = await updateOrder.execute(req.params.id, req.body);
      if (!order) return res.status(404).json({ error: "Pedido no encontrado" });
      res.json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteById(req, res) {
    try {
        const delteOrder = new DeleteOrderById(orderRepository);
      const order = await orderRepository.deleteById(req.params.id);
      if (!order) return res.status(404).json({ error: "Pedido no encontrado" });
      res.json({ message: "Pedido eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new orderController();
