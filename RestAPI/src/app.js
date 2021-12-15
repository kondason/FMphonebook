const express = require('express');
const usersRouter = require ('./routes/usersRoutes');
const postsRouter = require ('./routes/postsRoutes');
const registerRouter = require ('./routes/registerRoutes');
const clubsRouter = require ('./routes/clubsRoutes');
const professionsRouter = require ('./routes/professionsRoutes');
const employmentStatusesRouter = require ('./routes/employmentStatusesRoutes');
const teamAgesRouter = require ('./routes/teamAgesRoutes');
const authenticationRouter = require ('./routes/authenticationRoutes');
const ebayRouter = require ('./routes/ebayRoutes');
const compression = require('compression');

const jwtMiddleware = require ('./middleware/jwtMiddleware');

const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(compression());

app.use(jwtMiddleware.IgnoreToken);
app.use(jwtMiddleware.VerifyToken);

app.use('/users/', usersRouter);
app.use('/posts/', postsRouter);
app.use('/register/', registerRouter);
app.use('/clubs/', clubsRouter);
app.use('/professions/', professionsRouter);
app.use('/employmentStatuses/', employmentStatusesRouter);
app.use('/teamAges/', teamAgesRouter);
app.use('/authentication',authenticationRouter);
app.use('/ebay',ebayRouter);

app.listen(3000);