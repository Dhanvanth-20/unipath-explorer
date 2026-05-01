import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        sparse: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    name: String,
    picture: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function() {
    if (!this.isModified('password') || !this.password) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    if (!this.password) return false;
    return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);