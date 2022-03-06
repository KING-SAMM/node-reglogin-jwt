import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        fillname: { type: String, required: true, unique: true },
        username: { type: String, required: true },
        password: { type: String, required: true }
    },
    { collection: 'register' }
);

export const model = mongoose.model('UserSchema', UserSchema);