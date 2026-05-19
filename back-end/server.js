const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
require('dotenv').config();

const { tutorials, moduleOrder } = require('./data/tutorials');

const app = express();
const port = process.env.PORT || 3000;
const frontEndPath = path.join(__dirname, '..', 'front-end');
const customModulesPath = path.join(__dirname, 'data/custom-modules.json');

// app.use(express.static(path.join(__dirname, '..', 'front-end')));
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
    password: { type: String, required: true },
    role: { type: String, enum: ['learner', 'admin'], default: 'learner' }
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

const FeedbackSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'userProfiles', required: true },
    username: { type: String, required: true },
    moduleId: { type: String, required: true },
    moduleTitle: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    confusing: { type: String, default: '' },
    improvement: { type: String, default: '' },
    status: { type: String, enum: ['open', 'actioned'], default: 'open' }
}, { timestamps: true });

const UserModel = mongoose.model('userProfiles', UserSchema);
const ProgressModel = mongoose.model('userProgress', ProgressSchema);
const QuizAttemptModel = mongoose.model('quizAttempts', QuizAttemptSchema);
const FeedbackModel = mongoose.model('moduleFeedback', FeedbackSchema);

function readCustomModules() {
    try {
        if (!fs.existsSync(customModulesPath)) {
            return {};
        }

        return JSON.parse(fs.readFileSync(customModulesPath, 'utf8'));
    } catch (error) {
        console.error('Could not read custom modules:', error);
        return {};
    }
}

let customModules = readCustomModules();

function saveCustomModules() {
    fs.writeFileSync(customModulesPath, JSON.stringify(customModules, null, 2));
}

function getAllTutorials() {
    return {
        ...tutorials,
        ...customModules
    };
}

function getOrderedModules() {
    const customOrder = Object.keys(customModules).filter((id) => !moduleOrder.includes(id));
    return [...moduleOrder, ...customOrder]
        .map((id) => getAllTutorials()[id])
        .filter(Boolean);
}

function getPublicModule(module) {
    return {
        ...module,
        quiz: module.quiz.map(({ answer, ...question }) => question)
    };
}

function getModulesByDistro(distro = 'Ubuntu') {
    return getOrderedModules()
        .filter((module) => module.distro.toLowerCase() === distro.toLowerCase())
        .map((module) => ({
            id: module.id,
            distro: module.distro,
            title: module.title,
            icon: module.icon,
            summary: module.summary,
            objectives: module.objectives,
            lessonCount: module.lessons.length,
            quizCount: module.quiz.length,
            source: customModules[module.id] ? 'admin' : 'base'
        }));
}

function createSlug(value) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

function normalizeModule(input) {
    const title = String(input.title || '').trim();
    const distro = String(input.distro || 'Ubuntu').trim();
    const id = createSlug(input.id || `${distro}-${title}`);
    const objectives = Array.isArray(input.objectives)
        ? input.objectives.map((item) => String(item).trim()).filter(Boolean)
        : [];
    const lessons = Array.isArray(input.lessons) ? input.lessons : [];
    const quiz = Array.isArray(input.quiz) ? input.quiz : [];

    if (!id || !title) {
        throw new Error('Module title is required.');
    }

    if (lessons.length === 0) {
        throw new Error('Add at least one lesson.');
    }

    if (quiz.length === 0) {
        throw new Error('Add at least one quiz question.');
    }

    const normalized = {
        id,
        distro,
        title,
        icon: input.icon || 'assets/apps.png',
        summary: String(input.summary || '').trim(),
        objectives,
        lessons: lessons.map((lesson, index) => ({
            id: index + 1,
            title: String(lesson.title || `Lesson ${index + 1}`).trim(),
            steps: (Array.isArray(lesson.steps) ? lesson.steps : [])
                .map((step) => ({
                    text: String(step.text || '').trim(),
                    media: String(step.media || '').trim(),
                    type: step.type === 'video' ? 'video' : 'image',
                    command: String(step.command || '').trim(),
                    warning: String(step.warning || '').trim()
                }))
                .filter((step) => step.text || step.command)
                .map((step) => {
                    const cleanStep = { text: step.text };

                    if (step.command) {
                        cleanStep.command = step.command;
                    } else if (step.media) {
                        cleanStep.media = step.media;
                        cleanStep.type = step.type;
                    }

                    if (step.warning) {
                        cleanStep.warning = step.warning;
                    }

                    return cleanStep;
                })
        })).filter((lesson) => lesson.steps.length > 0),
        quiz: quiz.map((question, index) => ({
            id: index + 1,
            question: String(question.question || '').trim(),
            choices: (Array.isArray(question.choices) ? question.choices : [])
                .map((choice) => String(choice).trim())
                .filter(Boolean)
                .slice(0, 4),
            answer: Number(question.answer) || 0
        })).filter((question) => question.question && question.choices.length >= 2)
    };

    if (normalized.lessons.length === 0) {
        throw new Error('Add at least one lesson with content.');
    }

    if (normalized.quiz.length === 0) {
        throw new Error('Add at least one complete quiz question.');
    }

    return normalized;
}

function isAdminSession(req) {
    return req.session.role === 'admin' || String(req.session.username || '').toLowerCase() === 'admin';
}

function requireLogin(req, res, next) {
    if (!req.session.userId) {
        return res.status(401).json({ error: 'Please log in first' });
    }

    next();
}

function requireAdmin(req, res, next) {
    if (!req.session.userId) {
        return res.status(401).json({ error: 'Please log in first' });
    }

    if (!isAdminSession(req)) {
        return res.status(403).json({ error: 'Admin access required' });
    }

    next();
}

app.use(express.static(frontEndPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(frontEndPath, 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(frontEndPath, 'signup.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(frontEndPath, 'home.html'));
});

app.get('/admin', requireAdmin, (req, res) => {
    res.sendFile(path.join(frontEndPath, 'admin.html'));
});

app.get('/api/tutorials/ubuntu', requireLogin, (req, res) => {
    res.json(getModulesByDistro('Ubuntu'));
});

app.get('/api/tutorials', requireLogin, (req, res) => {
    const distro = req.query.distro;

    if (distro) {
        return res.json(getModulesByDistro(distro));
    }

    res.json(getOrderedModules().map((module) => ({
        id: module.id,
        distro: module.distro,
        title: module.title,
        icon: module.icon,
        summary: module.summary,
        objectives: module.objectives,
        lessonCount: module.lessons.length,
        quizCount: module.quiz.length,
        source: customModules[module.id] ? 'admin' : 'base'
    })));
});

app.get('/api/tutorials/:moduleId', requireLogin, (req, res) => {
    const module = getAllTutorials()[req.params.moduleId];

    if (!module) {
        return res.status(404).json({ error: 'Module not found' });
    }

    res.json(getPublicModule(module));
});

app.get('/api/quiz/:moduleId', requireLogin, (req, res) => {
    const module = getAllTutorials()[req.params.moduleId];

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
        const role = username.toLowerCase() === 'admin' ? 'admin' : 'learner';
        const newUser = new UserModel({
            username,
            password: hashedPassword,
            role
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
        req.session.role = user.role || (user.username.toLowerCase() === 'admin' ? 'admin' : 'learner');

        res.json({
            message: 'Login successful',
            username: user.username,
            role: req.session.role,
            redirectUrl: isAdminSession(req) ? '/admin.html' : '/home.html'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/user', (req, res) => {
    if (req.session.userId) {
        res.json({
            loggedIn: true,
            username: req.session.username,
            role: isAdminSession(req) ? 'admin' : 'learner'
        });
    } else {
        res.json({ loggedIn: false });
    }
});

app.post('/api/progress', requireLogin, async (req, res) => {
    try {
        const { moduleId, lessonId } = req.body;
        const module = getAllTutorials()[moduleId];

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

app.get('/api/admin/modules', requireAdmin, (req, res) => {
    res.json(getOrderedModules().map((module) => ({
        ...module,
        source: customModules[module.id] ? 'admin' : 'base'
    })));
});

app.post('/api/admin/modules', requireAdmin, (req, res) => {
    try {
        const module = normalizeModule(req.body);

        if (getAllTutorials()[module.id]) {
            return res.status(409).json({ error: 'A module with this ID already exists. Choose another title or use Modify.' });
        }

        customModules[module.id] = module;
        saveCustomModules();
        res.status(201).json(module);
    } catch (error) {
        res.status(400).json({ error: error.message || 'Could not create module' });
    }
});

app.put('/api/admin/modules/:moduleId', requireAdmin, (req, res) => {
    try {
        const module = normalizeModule({
            ...req.body,
            id: req.params.moduleId
        });

        customModules[req.params.moduleId] = module;
        saveCustomModules();
        res.json(module);
    } catch (error) {
        res.status(400).json({ error: error.message || 'Could not update module' });
    }
});

app.delete('/api/admin/modules/:moduleId', requireAdmin, (req, res) => {
    if (!customModules[req.params.moduleId]) {
        return res.status(400).json({ error: 'Only admin-created or admin-modified modules can be deleted.' });
    }

    delete customModules[req.params.moduleId];
    saveCustomModules();
    res.json({ message: 'Module deleted' });
});

app.get('/api/admin/feedback', requireAdmin, async (req, res) => {
    try {
        const feedback = await FeedbackModel.find().sort({ createdAt: -1 }).lean();
        res.json(feedback);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not load feedback' });
    }
});

app.patch('/api/admin/feedback/:feedbackId', requireAdmin, async (req, res) => {
    try {
        const feedback = await FeedbackModel.findByIdAndUpdate(
            req.params.feedbackId,
            { status: req.body.status === 'actioned' ? 'actioned' : 'open' },
            { new: true }
        );

        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }

        res.json(feedback);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not update feedback' });
    }
});

app.delete('/api/admin/feedback/:feedbackId', requireAdmin, async (req, res) => {
    try {
        await FeedbackModel.findByIdAndDelete(req.params.feedbackId);
        res.json({ message: 'Feedback removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not remove feedback' });
    }
});

app.post('/api/quiz/:moduleId/submit', requireLogin, async (req, res) => {
    try {
        const module = getAllTutorials()[req.params.moduleId];

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

app.post('/api/feedback', requireLogin, async (req, res) => {
    try {
        const module = getAllTutorials()[req.body.moduleId];

        if (!module) {
            return res.status(404).json({ error: 'Module not found' });
        }

        const rating = Number(req.body.rating);
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: 'Choose a rating from 1 to 5.' });
        }

        const feedback = await FeedbackModel.create({
            userId: req.session.userId,
            username: req.session.username,
            moduleId: module.id,
            moduleTitle: module.title,
            rating,
            confusing: String(req.body.confusing || '').trim(),
            improvement: String(req.body.improvement || '').trim()
        });

        res.status(201).json(feedback);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not submit feedback' });
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
