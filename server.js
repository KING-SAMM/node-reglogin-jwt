import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { User } from './model/user.js';
import bcrypt from 'bcryptjs';


mongoose.connect('mongodb+srv://KCSamm:@score.snwx3.mongodb.net/users?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const __dirname = dirname(fileURLToPath(import.meta.url));


const port = 3000;

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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});