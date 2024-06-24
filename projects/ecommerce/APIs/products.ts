import { IProduct } from "@/types/product";
import products from '@/fakedata/products.json'

export const getProducts = async (): Promise<IProduct[]> => { 
    const response = await fetch('/api/products', {
    method: 'GET',
    });

    // if (!response.ok) {
    //     throw new Error('Failed to submit the data. Please try again.');
    // }
    
    return products;
};
