class DeleteOrderById {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }
  async execute(id) {
    return await this.orderRepository.deleteById(id);
  }
}

export default DeleteOrderById;