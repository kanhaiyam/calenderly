const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: String,
    name: String,
    password: String,
    signUpMedium: String,
    createdAt: {type: Date},
    updatedAt: {type: Date},
});

const Post = mongoose.model("Post", postSchema);