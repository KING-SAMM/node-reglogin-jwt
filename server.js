import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { model } from './model/user.js';
const User = model;

mongoose.connect('mongodb+srv://KCSamm:@score.snwx3.mongodb.net/users?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    userCreateIndex: true
})

const __dirname = dirname(fileURLToPath(import.meta.url));


const port = 3000;

const app = express();

app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, 'static')));

app.post('/api/register', async (req, res) => {
    
    
    res.send('Hello KC Samm');
   
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});