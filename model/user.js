import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        fullname: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    },
    { collection: 'register' }
);

export const User = mongoose.model('UserSchema', UserSchema);