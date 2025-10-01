class DeleteProductsById {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }
  async execute(id) {
    return await this.productRepository.deleteById(id);
  }
}

export default DeleteProductsById;