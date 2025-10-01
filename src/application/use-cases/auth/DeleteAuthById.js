class DeleteAuthById {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }
  async execute(id) {
    return await this.authRepository.deleteById(id);
  }
}

export default DeleteAuthById;