export type Product = {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  oldPrice?: number;
  stock: number;
  images: string[];
  alt: string;
  featured: boolean;
};

export type OrderLine = {
  product: Product;
  quantity: number;
};

export type CustomerDetails = {
  fullName: string;
  email: string;
  phone: string;
  secondaryPhone?: string;
  address: string;
  city: string;
  province: string;
  country: string;
};

export type OrderStatus = "pending" | "dispatched" | "delivered";

export type OrderItem = {
  productId: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  quantity: number;
};

export type AdminOrder = {
  id: string;
  items: OrderItem[];
  customer: CustomerDetails;
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
};
