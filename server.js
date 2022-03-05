import express from 'express';
import path from 'path';
const port = 3000;

const app = express();

app.use('/', express.static(path.join(__dirname, 'static')));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});