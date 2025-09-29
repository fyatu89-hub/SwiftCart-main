export enum View {
  Shop,
  Admin,
}

export enum OrderStatus {
  Pending = 'Pending',
  Approved = 'Approved',
}

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  category: string;
}

export interface Order {
  id: string;
  timestamp: string;
  status: OrderStatus;
  product: Product;
  customerName: string;
  address: string;
  phone: string;
  city: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  finalPrice: number;
  discountApplied?: {
    code: string;
    discount: number;
  };
}

export interface DiscountCode {
  code: string;
  discount: number; // percentage
}

export interface NavigationLink {
  id: number;
  label: string;
  href: string;
}

export interface SocialLinks {
  facebook: string;
  twitter: string;
  instagram: string;
}

export interface Settings {
  siteName: string;
  logoUrl: string;
  currency: string;
  primaryColor: string;
  navLinks: NavigationLink[];
  footerLinks: NavigationLink[];
  socialLinks: SocialLinks;
  footerDescription: string;
  footerCopyrightText: string;
}

export interface Admin {
  id: number;
  username: string;
  password?: string;
}

export interface Page {
  id: number;
  title: string;
  slug: string; // e.g., "/about-us"
  content: string;
}