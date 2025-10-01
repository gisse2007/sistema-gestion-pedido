import mongoose from "mongoose";

const connectDB = async () => {
try {
    await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, // Nuevo parser de URL de MongoDB
    useUnifiedTopology: true // Nuevo motor de monitoreo de servidores

});
console.log(" Conectado a MongoDB");
} catch (err) {
console.error("Error de conexión", err);
process.exit(1); // Finaliza la ejecución si falla la conexión
}
};

export default connectDB; 