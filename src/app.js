import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./interfaces/server.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(` Servidor corriendo en puerto: ${PORT}`);
  });
});
