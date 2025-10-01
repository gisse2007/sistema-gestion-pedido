class OrderDetail {
  constructor({ productId, quantity, price }) {
    this.productId = productId;
    this.quantity = quantity;   
    this.price = price;         
  }

  getSubtotal() {
    return this.quantity * this.price;
  }
}

class Order {
  constructor({ id, userId, details = [], total = 0, status = "activo", createdAt, updatedAt }) {
    this.id = id;              
    this.userId = userId;       
    this.details = details.map(d => new OrderDetail(d)); 
    this.total = total;        
    this.status = status;       
    this.updatedAt = updatedAt || new Date();
  }
  calculateTotal() {
    this.total = this.details.reduce((sum, d) => sum + d.getSubtotal(), 0);
    return this.total;
  }

  updateStatus(newStatus) {
    this.status = newStatus;
    this.updatedAt = new Date();
  }
}

export default Order;
