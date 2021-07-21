import { Controller, Post, Body,Get,Param } from "@nestjs/common";
import { Product } from "./product.model";
import { ProductsService } from "./products.service";
@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) { }
    @Post()
    addProduct(
        // @Body() completeBody:{title:string,price:number,description:string}
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
    ) {
        return this.productService.addProduct(prodTitle, prodDesc, prodPrice)
    }

    @Get()
    getAllProducts() {
        return this.productService.getAllProducts()
    }

    @Get(':id')
    getProduct(@Param('id') prodId:string) {
        return this.productService.getProduct(prodId)
    }
}