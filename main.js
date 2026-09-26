import { scrapBooks } from "./scrap.js";
import { analyzeProducts } from "./analysis.js";

// make the scap
await scrapBooks();

// read the all of the .csv and return the best day 
const results = analyzeProducts();

console.log("\n=== PRICE ANALYSIS ===");

results.forEach(result => {
    console.log(
        `${result.date} -> £${result.average.toFixed(2)}`
    );
});

// 3. Encontra o dia com menor preço médio
if (results.length > 0) {

    const bestDay = results.reduce((best, current) => {
        if (current.average < best.average) {
            return current;
        }

        return best;
    });

    console.log("\n=== BEST DAY TO BUY ===");

    console.log(`Date: ${bestDay.date}`);
    console.log(`Average price: £${bestDay.average.toFixed(2)}`);

} 
else {
    console.log("No CSV files found.");
}