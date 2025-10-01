class GetAuth {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async execute() {
    return await this.authRepository.findAll();
  }
}

export default GetAuth;