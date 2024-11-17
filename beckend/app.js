const config = require('./config');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mongoUrl = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`

mongoose
.connect(mongoUrl, {})
.then(() => {
    console.log('MongoDB is connected')
})
.catch((err) => {
    throw err
})

const app = express();
app.use(express.json());
app.use(cors());

/* Nie rozumiem dlaczego tu jest ten nawias - porozmawiaj o tym z Łukaszem
Czy to dlatego że implementacja router.get w exports.module w EventRoutes jest z dodatkową funkcją zwrotną? */
const eventRoutes = require('./app/routes/EventRoutes')();
app.use('/events', eventRoutes);

app.listen(config.app.port, () => {
    console.log('Express server is up!');
})