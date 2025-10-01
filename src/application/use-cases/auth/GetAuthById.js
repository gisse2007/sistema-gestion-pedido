class GetAuthById {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async execute(id) {
    return await this.authRepository.findById(id);
  }
}

export default GetAuthById;
