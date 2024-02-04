export interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export type CreateProductData = Omit<Product, 'id'>

export type UpdateProductData = Partial<CreateProductData>