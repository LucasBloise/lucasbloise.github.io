class Product {
    constructor(name,price,image) {
        this.name = name,
        this.price = price,
        this.image = image
        this.currentAmountInCart = 0
    }

    static fromJson(data){
        return new Product(data.name,data.price,data.image);
    }

    static fromStorage(data){
        let product = new Product(data.name,data.price,data.image);
        product.currentAmountInCart = data ['currentAmountInCart'];
        return product;
    }
}