class PutProductsById {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }
  async execute(id, data) {
    return await this.productRepository.updateById(id, data);
  }
}

export default PutProductsById;