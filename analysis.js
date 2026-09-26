import fs from "fs";

export function analyzeProducts() {

    const files = fs.readdirSync("products");

    const results = [];

    files.forEach(file => {

        if (!file.endsWith(".csv")) {
            return;
        }

        const content = fs.readFileSync(`products/${file}`, "utf-8");

        const lines = content.split("\n");

        // get the average
        // average,35.67
        const average = Number(lines[0].split(",")[1]);

        // get the date from the name
        // 2026-09-24-products.csv
        const date = file.substring(0, 10);

        results.push({date: date, average: average});
    });

    return results;
}