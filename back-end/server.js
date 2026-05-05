const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config(); 

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../front-end')));
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('✅ Connected to MongoDB'));

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

const UserModel = mongoose.model("userProfiles", UserSchema);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../front-end/login.html'));
});

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, '../front-end/signup.html'));
});

app.post('/api/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new UserModel({
            username,
            password: hashedPassword
        });
        
        await newUser.save();
        res.status(201).json({ message: 'Account created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        
        res.json({ message: 'Login successful', username: user.username });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});