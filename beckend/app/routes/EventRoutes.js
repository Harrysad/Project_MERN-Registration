const express = require('express');
const router = express.Router();
const EventsController = require('../controllers/EventController');

module.exports = () => {

    // GET / events
    router.get('/', EventsController.index);

    // POST / events/add
    router.post('/add', EventsController.create);

    // DELETE / events/delete/:id
    router.delete('/delete/:id', EventsController.delete);

    return router;
}