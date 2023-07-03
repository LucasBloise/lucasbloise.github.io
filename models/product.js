class Product {
    constructor(name,price,imagePath) {
        this.name = name,
        this.price = price,
        this.imagePath = imagePath
        this.currentAmountInCart = 0
    }

    static fromJson(data){
        return new Product(data.name,data.price,data.imagePath);
    }

    static fromStorage(data){
        let product = new Product(data.name,data.price,data.imagePath);
        product.currentAmountInCart = data ['currentAmountInCart'];
        return product;
    }
}