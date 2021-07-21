    /**
     * 
     * @param id 
     * @param title 
     * @param price 
     * @param description 
     */
export class Product{
    constructor(
        public id:string,
        public title:string,
        public price:number,
        public description:string){}
}