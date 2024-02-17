const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    authTokens: {
        token: String,
        expiry: Date
    },
    lastLogin: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    timezone: {
        type: String,
        default: 'UTC'
    },
    medium: {
        type: String,
        enum: ['web', 'mobile', 'api'],
        default: 'api'
    },
});

userSchema.statics.findByEmail = async function(email) {
    return await this.findOne({ email });
};

userSchema.statics.findByCredentials = async function(email, password) {
    return await this.findOne({ email, password });
};

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;