const mongoose = require("mongoose");
const { scryptSync } = require("crypto");

const db = require("../../db");

const UserSchema = new mongoose.Schema({
    user: String, 
    password: String
});
const User = mongoose.model("User", UserSchema);

async function authenticateUser(username, pw) {
    await db.connect();
    let key = scryptSync(pw, process.env.SALT, 64);
    // Check for existing user with matching hashed password
    let result = await User.findOne({
        user: username,
        password: key.toString("base64")
    });
    return result ? true : false;
}

async function getUser(username) {
    await db.connect();
    let result = await User.findOne({ user: username });
    return result ? result : false;
}

async function addUser(username, pw) {
    await db.connect();
    let user = await getUser(username);
    console.log("User found: " + user);
    if (!user) {
        let key = scryptSync(pw, process.env.SALT, 64);
        let newUser = new User({
            user: username, 
            password: key.toString("base64")
        });
        let result = await newUser.save();
        return result === newUser;
    }
    return false; // User already exists
}

module.exports = {
    authenticateUser, 
    getUser, 
    addUser
};
