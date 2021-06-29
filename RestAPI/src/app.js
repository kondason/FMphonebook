const express = require('express');
const usersRouter = require ('./routes/usersRoutes');
const postsRouter = require ('./routes/postsRoutes');
const registerRouter = require ('./routes/registerRoutes');
const clubsRouter = require ('./routes/clubsRoutes');
const professionsRouter = require ('./routes/professionsRoutes');

const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users/', usersRouter);
app.use('/posts/', postsRouter);
app.use('/register/', registerRouter);
app.use('/clubs/', clubsRouter);
app.use('/professions/', professionsRouter);

app.listen(3000);