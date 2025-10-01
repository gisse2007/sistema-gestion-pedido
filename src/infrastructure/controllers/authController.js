import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import CreateAuth from "../../application/use-cases/auth/CreateAuth.js";
import DeleteAuthById from "../../application/use-cases/auth/DeleteAuthById.js";
import GetAuth from "../../application/use-cases/auth/GetAuth.js";
import GetAuthById from "../../application/use-cases/auth/GetAuthById.js";
import PutAuthById from "../../application/use-cases/auth/PutAuthById.js";
import AuthRepositoryMongo from "../repositories/AuthRepositoryMongo.js";

const authRepository = new AuthRepositoryMongo();

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "5minutes";

class authController {
  async register(req, res) {
    try {
      const createAuth = new CreateAuth(authRepository);
      const user = await createAuth.execute(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await authRepository.findByEmail(email);
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      const token = jwt.sign(
        { id: user._id, email: user.email, rol: user.rol },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      res.json({ message: "Login exitoso", token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const getAuth = new GetAuth(authRepository);
      const users = await getAuth.execute();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const getAuthById = new GetAuthById(authRepository);
      const user = await getAuthById.execute(req.params.id);
      if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async updateById(req, res) {
    try {
      const putAuthById = new PutAuthById(authRepository);
      const user = await putAuthById.execute(req.params.id, req.body);
      if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteById(req, res) {
    try {
      const deleteAuthById = new DeleteAuthById(authRepository);
      const user = await deleteAuthById.execute(req.params.id);
      if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
      res.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new authController();
