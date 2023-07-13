require('dotenv').config();

const session = require('express-session');
const FileStore = require('session-file-store')(session);

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { PORT, CORS_URL, SECRET_KEY_SESSION } = process.env;
const corsOptions = {
  origin: [CORS_URL],
  credentials: true,
};

// Require routes
const authRouter = require('./src/routers/auth.router');
const adminRouter = require('./src/routers/admin.router');
const userRouter = require('./src/routers/user.router');

// Cookie
const sessionConfig = {
  name: 'CleanMasterCookie',
  store: new FileStore(),
  secret: SECRET_KEY_SESSION ?? 'Секретное слово',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 9999999,
    httpOnly: true,
  },
};
const app = express();

app.use(session(sessionConfig));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// Routes

app.use('/api/auth', authRouter);

app.use('/api/admin/', adminRouter);

app.use('/api/user/', userRouter);

app.listen(PORT, () => {
  console.log('Сервер крутится!');
  console.log('➜ ', `http://localhost:${PORT}/`);
});
