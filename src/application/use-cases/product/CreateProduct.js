class CreateProduct {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }
  async execute(productData) {
    return await this.productRepository.create(productData);
  }
}

export default CreateProduct;