import bcrypt from "bcrypt";
 class CreateAuth {

  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async execute(userData) {
    const { password, ...rest } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.authRepository.create({
      ...rest,
      password: hashedPassword,
    });
  }
}

export default CreateAuth