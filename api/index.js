require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');
const app = express();
const port = 8000;

const users = require('./app/users');
const events = require('./app/events');

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/users', users);
app.use('/events', events);

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
        console.log('MongoDb disconnect');
    });
};

run().catch(e => console.error(e));