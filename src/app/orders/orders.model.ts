export interface Order{
    _id: string;
  user: {
    email: string;
    userName: string;
  };
  totalPrice: number;
  phone: string;
  shippingAddress: string;
  paymentMethod: string;
  status: string;
  items: {
    drug: {
      name: string;
    };
    quantity: number;
    price: number;
  }[];
  createdAt: string;
}