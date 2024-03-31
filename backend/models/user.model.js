const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    name: {
        type: String,
        default: '',
    },
    profileUrl: {
        type: String,
        required: true,
    },
    avatarUrl: {
        type: String,
        required: true,
    },
    likedProfiles: {
        type: [String],
        default: [],
    },
    likedBy: [
        {
            username: {
                type: String,
                required: true,
            },
            avatarUrl: {
                type: String,
                required: true,
            },
            likedDate: {
                type: Date,
                default: Date.now,
            },
        }
    ]
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;