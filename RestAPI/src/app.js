require('dotenv').config();

const express = require('express');
const usersRouter = require ('./routes/usersRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users/', usersRouter);

app.listen(3000);