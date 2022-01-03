export interface IProductMedia{
    images: string[],
    videos: string[],
    coverImage:string,
    
}

export interface IProductPrice{
    tax: number,
    purcahsePrice: number,
    salePrice:number
}


export interface IProductStats{
    likes: number,
    purcahsed:number
}
export interface IProductVariant{
    unit: string,
    isAvalaible: boolean,
    _id: string,
    quantity: number,
    price:number
    
}


export interface IProduct{
    _id:string,
    category: string,
    createdAt: string,
    description: string,
    isAvaialible: string,
    isDeleted: boolean,
    media: IProductMedia,
    name: string,
    price: IProductPrice,
    stats: IProductStats,
    updatedAt: string,
    variants:IProductVariant,
    
    
}

export interface ICartProduct{
    _id:string,
    category: string,
    createdAt: string,
    description: string,
    isAvaialible: string,
    isDeleted: boolean,
    media: IProductMedia,
    name: string,
    price: IProductPrice,
    stats: IProductStats,
    updatedAt: string,
    variants: IProductVariant[],
    selectedVariant: IProductVariant,
    selectedQuantity:number,
    
    
    
}
