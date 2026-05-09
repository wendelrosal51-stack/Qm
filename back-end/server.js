const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
require('dotenv').config();

const { tutorials, getPublicModule, getUbuntuModules } = require('./data/tutorials');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../front-end')));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'change-this-session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'lax'
    }
}));

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const ProgressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'userProfiles', required: true },
    moduleId: { type: String, required: true },
    completedLessons: { type: [Number], default: [] },
    completed: { type: Boolean, default: false }
}, { timestamps: true });

ProgressSchema.index({ userId: 1, moduleId: 1 }, { unique: true });

const QuizAttemptSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'userProfiles', required: true },
    moduleId: { type: String, required: true },
    score: { type: Number, required: true },
    total: { type: Number, required: true },
    passingScore: { type: Number, required: true },
    passed: { type: Boolean, required: true },
    answers: [{
        questionId: Number,
        answer: Number
    }]
}, { timestamps: true });

const UserModel = mongoose.model('userProfiles', UserSchema);
const ProgressModel = mongoose.model('userProgress', ProgressSchema);
const QuizAttemptModel = mongoose.model('quizAttempts', QuizAttemptSchema);

function requireLogin(req, res, next) {
    if (!req.session.userId) {
        return res.status(401).json({ error: 'Please log in first' });
    }

    next();
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../front-end/login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../front-end/signup.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../front-end/home.html'));
});

app.get('/api/tutorials/ubuntu', requireLogin, (req, res) => {
    res.json(getUbuntuModules());
});

app.get('/api/tutorials/:moduleId', requireLogin, (req, res) => {
    const module = tutorials[req.params.moduleId];

    if (!module) {
        return res.status(404).json({ error: 'Module not found' });
    }

    res.json(getPublicModule(module));
});

app.get('/api/quiz/:moduleId', requireLogin, (req, res) => {
    const module = tutorials[req.params.moduleId];

    if (!module) {
        return res.status(404).json({ error: 'Quiz not found' });
    }

    res.json({
        moduleId: module.id,
        distro: module.distro,
        title: module.title,
        questions: module.quiz.map(({ answer, ...question }) => question)
    });
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

        req.session.userId = user._id;
        req.session.username = user.username;

        res.json({ message: 'Login successful', username: user.username });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/user', (req, res) => {
    if (req.session.userId) {
        res.json({
            loggedIn: true,
            username: req.session.username
        });
    } else {
        res.json({ loggedIn: false });
    }
});

app.post('/api/progress', requireLogin, async (req, res) => {
    try {
        const { moduleId, lessonId } = req.body;
        const module = tutorials[moduleId];

        if (!module) {
            return res.status(404).json({ error: 'Module not found' });
        }

        const numericLessonId = Number(lessonId);
        const lessonExists = module.lessons.some((lesson) => lesson.id === numericLessonId);

        if (!lessonExists) {
            return res.status(400).json({ error: 'Lesson not found' });
        }

        const progress = await ProgressModel.findOneAndUpdate(
            { userId: req.session.userId, moduleId },
            { $addToSet: { completedLessons: numericLessonId } },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        progress.completed = progress.completedLessons.length >= module.lessons.length;
        await progress.save();

        res.json(progress);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not save progress' });
    }
});

app.get('/api/progress', requireLogin, async (req, res) => {
    try {
        const [progress, quizAttempts] = await Promise.all([
            ProgressModel.find({ userId: req.session.userId }).lean(),
            QuizAttemptModel.find({ userId: req.session.userId }).sort({ createdAt: -1 }).lean()
        ]);

        res.json({
            username: req.session.username,
            progress,
            quizAttempts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not load progress' });
    }
});

app.post('/api/quiz/:moduleId/submit', requireLogin, async (req, res) => {
    try {
        const module = tutorials[req.params.moduleId];

        if (!module) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        const submittedAnswers = Array.isArray(req.body.answers) ? req.body.answers : [];
        let score = 0;

        module.quiz.forEach((question) => {
            const submitted = submittedAnswers.find((answer) => Number(answer.questionId) === question.id);

            if (submitted && Number(submitted.answer) === question.answer) {
                score += 1;
            }
        });

        const total = module.quiz.length;
        const passingScore = Math.ceil(total * 0.7);
        const passed = score >= passingScore;

        const attempt = await QuizAttemptModel.create({
            userId: req.session.userId,
            moduleId: module.id,
            score,
            total,
            passingScore,
            passed,
            answers: submittedAnswers.map((answer) => ({
                questionId: Number(answer.questionId),
                answer: Number(answer.answer)
            }))
        });

        res.json({
            score: attempt.score,
            total: attempt.total,
            passingScore: attempt.passingScore,
            passed: attempt.passed
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not submit quiz' });
    }
});

app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Could not log out' });
        }

        res.json({ message: 'Logged out successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
