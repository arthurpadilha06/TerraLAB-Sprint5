class Product{
    constructor(id, name, price){
        this.id = id;
        this.name = name;
        this.price = price; 
    }

    showProduct(){
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Price: ${this.price}`);
    }

    getProduct() {
        return this;
    }

}

export default Product;