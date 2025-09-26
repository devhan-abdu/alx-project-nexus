
export interface Product {
  id: number;
  slug: string;
  title: string;
  shortDesc: string;
  image: string;
  categoryId: number;
  price: number;
  stock: number;
  rating: number;
  numReviews: number;
  specs: string[];
};
export interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
}
export interface Review {
  id: number;
  rating: number;
  comment: string;
  user: {
    name: string;
  };
}; 

export interface ProductDetail extends Product {
  longDesc: string;
  discount: number;
  reviews: Review[];
}

export interface CartItems {
  image: string;
  title: string;
  desc: string;
  quantity:number;
  price:number;
  productId:number;
}