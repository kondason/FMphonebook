const express = require('express');
const session = require('express-session');

const flash = require('connect-flash');
const app = express();
const path = require('path');
const fs = require('fs');
const compression = require('compression');
//const morgan = require('morgan');

const mainRouter = require('./routes/mainRoutes');
const loginRouter = require('./routes/loginRoutes');
const registerRouter = require('./routes/registerRoutes');
const authRouter = require('./routes/authRoutes');
const postsRouter = require('./routes/postsRoutes');
const usersRouter = require('./routes/usersRoutes');
const privacyRouter = require('./routes/privacyRoutes');
const termsRouter = require('./routes/termsRoutes');

const passport = require('passport');
const mysqlSessionStore = require('./Config/mysqlSessionStore').sessionStore;


//const privateKey = fs.readFileSync('keys/server.key');
//const certificate = fs.readFileSync('keys/server.cert');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // To parse the incoming requests with JSON payloads


app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: mysqlSessionStore
}));

/*morgan*/
//const accessLogStream = fs.createWriteStream(path.join(__dirname, 'Logs/access.log'), { flags: 'a' });
//app.use(morgan('combined',{stream:accessLogStream}));

app.use(compression());

app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/scripts', express.static(path.join(__dirname, 'public/scripts')));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', mainRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/auth', authRouter);
app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/privacy', privacyRouter);
app.use('/terms', termsRouter);


//https.createServer({ key: privateKey, cert: certificate }, app).listen(4000);
app.listen(4000);
console.log('Listen on port 4000');
