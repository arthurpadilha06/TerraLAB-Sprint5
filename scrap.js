import * as cheerio from "cheerio"; // for the scraping
import fs from "fs"; // for the .csv

import Product from "./Product.js"; // here is my object

export async function scrapBooks() {
    const response = await fetch("https://books.toscrape.com/");
    const html = await response.text();
    const $ = cheerio.load(html);

    const products = [];
    let productsPriceAverage = 0;

    $(".product_pod").each((i, element) => {
        const name = $(element).find("h3").text().trim();
        const priceText = $(element).find(".price_color").text().trim();
        const price = parseFloat(priceText.replace("£", ""));
        
        productsPriceAverage += price;

        const product = new Product(i + 1, name, price);

        products.push(product);
    });

    //calculate the products' price average
    productsPriceAverage = productsPriceAverage / products.length;

    //create a csv variable with all the information
    let csv = `average, ${productsPriceAverage}\n`; 
    csv += "id,name,price\n";

    products.forEach(product => {
        csv += `${product.id},${product.name},${product.price}\n`;
    });

    const today = new Date();
    const date = today.toISOString().slice(0, 10);

    const fileName = `products/${date}-products.csv`;
    fs.writeFileSync(fileName, csv);

    console.log(`Scrap Saved! ${fileName}`); // successful message

    return products;
}