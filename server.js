import express from 'express';
import path, { dirname } from 'path';
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
    const { fullname, username, password } = req.body;

    // Validate request information
    if (username === '' || typeof(username) !== 'string')
    {
        return res.json({ status: 'error', error: 'Invalid username', message: '' });
    }
    else if ( password === '' || typeof(password) !== 'string')
    {
        return res.json({ status: 'error', error: 'Invalid password', message: '' });
    }
    else
    {
         // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Handle request (Register/create user) and send response
        try {
            const response = await User.create({
                fullname,
                username,
                password: hashedPassword
            });
            console.log(`User created successfully`, response);
            // res.send(`Hello ${response.fullname}`);
            return res.json({ status: 'ok', error: '', message: 'User created successfully' });
        } catch (error) {
            if(error.code === 11000)
            {
                // res.send('Username already exists');
                return res.json({ status: 'error', error: 'Username already exists', message: '' });
            }
            else 
            {
                // res.send('Oops! Something went wrong');
                return res.json({ status: 'error', error: 'Oops! Something went wrong', message: '' });
            }
        }
    }  
   
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});