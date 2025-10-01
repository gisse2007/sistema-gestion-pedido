class PutAuthById {
  constructor(authRepository) {
    this.authRepository= authRepository;
  }

  async execute(id, data) {
    return await this.authRepository.updateById(id, data);
  }
}

export default PutAuthById;