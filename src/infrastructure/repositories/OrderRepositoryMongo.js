import mongoose from "mongoose";

const OrderDetailSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }, 
});

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Auth", required: true },
    details: [OrderDetailSchema],
    total: { type: Number, required: true },
    status: { type: String, enum: ["activo", "cancelado"], default: "activo" },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", OrderSchema);

class OrderRepositoryMongo {
  async create(data) {
    const order = new OrderModel(data);
    return await order.save();
  }

  async findAll() {
    return await OrderModel.find().populate("user").populate("details.product");
  }

  async findById(id) {
    return await OrderModel.findById(id).populate("user").populate("details.product");
  }

  async updateById(id, data) {
    return await OrderModel.findByIdAndUpdate(id, data, { new: true })
      .populate("user")
      .populate("details.product");
  }

  async deleteById(id) {
    return await OrderModel.findByIdAndDelete(id);
  }
}

export default OrderRepositoryMongo;
