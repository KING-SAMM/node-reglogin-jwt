import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;

const app = express();

app.use('/', express.static(path.join(__dirname, 'static')));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});