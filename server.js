import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { User } from './model/user.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();

app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, 'static')));

app.post('/api/register', async (req, res) => {
    console.log(req.body);

    // Destructure request body object
    const { fullname, username, password: plainTextPassword } = req.body;

    // Hash the password
    const password = await bcrypt.hash(plainTextPassword, 10);
    
    // Handle request (Register/create user)
    try {
        const response = await User.create({
            fullname,
            username,
            password
        });
        console.log(`User created successfully`, response);
    } catch (error) {
        console.log(error);
        return res.json({ status: "Error" });
    }
    res.send('Hello KC Samm');
   
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});