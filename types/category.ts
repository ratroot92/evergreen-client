import { IProduct } from './product';
export interface ICategory{
    _id:string,
    coverImage: string,
    products: IProduct[],
    createdAt: string,
    description: string,
    name: string,
}