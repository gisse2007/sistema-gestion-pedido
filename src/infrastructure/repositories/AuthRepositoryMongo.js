import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true }
);

const AuthModel = mongoose.model("Auth", AuthSchema);

class AuthRepositoryMongo {
  async create(data) {
    const user = new AuthModel(data);
    return await user.save();
  }

  async findAll() {
    return await AuthModel.find();
  }

  async findById(id) {
    return await AuthModel.findById(id);
  }

  async updateById(id, data) {
    return await AuthModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id) {
    return await AuthModel.findByIdAndDelete(id);
  }

  async findByEmail(email) {
    return await AuthModel.findOne({ email });
  }
}

export default AuthRepositoryMongo;
