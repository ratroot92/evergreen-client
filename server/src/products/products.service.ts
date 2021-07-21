import { Injectable,NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductsService {
    products: Product[] = []
    addProduct(
        title: string,
        desc: string,
        price: number

    ) {
        const prodId = Math.random().toString()
        const newProduct = new Product(prodId, title, price, desc)
        this.products.push(newProduct)
        return newProduct;
    }
    getAllProducts(){
        return [...this.products];
    }
    getProduct(prodId:string){
        const product=this.products.find((prod)=>prod.id===prodId)
        if(!product){
            throw new NotFoundException('Could not find product.')
        }
        return {...product}
    }
}