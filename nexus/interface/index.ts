export type Category = 'Smartphones' | 'Headphones' | 'Laptops' | 'Accessories';

export interface Product{
    id: string;
    title: string;
    price: number;
    rating?: number;
    category: Category;
    description: string;
    image: any;

}

export interface Cart extends Omit<Product, 'rating' | 'category'> {
  quantity: number;
}