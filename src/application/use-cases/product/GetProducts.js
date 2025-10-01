class GetProducts {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }
  async execute() {
    return await this.productRepository.findAll();
  }
}

export default GetProducts;