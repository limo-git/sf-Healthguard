import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = 'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json';
const outputPath = path.join(__dirname, '../public/world-110m.json');

https.get(url, (response) => {
    const file = fs.createWriteStream(outputPath);
    response.pipe(file);
    file.on('finish', () => {
        file.close();
        console.log('World map JSON file downloaded successfully');
    });
}).on('error', (err) => {
    console.error('Error downloading the file:', err);
}); 