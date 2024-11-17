const EventModel = require('../models/EventModel');

/* Pozmieniałem trochę kod ponieważ Mongoose od wersji 7 nie przyjmuje funkcji callback jako argument*/
module.exports = {
    index: (req, res, _next) => {
        EventModel.find({})
        .then((result) => {
            res.json(result)
        })
        .catch ((err) => {
            return res.status(500)
            .json({
                message: "Error while fetching Event",
                error: err
            });
        });
    },

    create: (req, res, _next) => {
        const event = new EventModel({
            name: req.body.name,
            event: req.body.event,
            city: req.body.city
        });

        event.save()
        .then((event) => {
            return res.status(201).json(event)
        })
        .catch ((err) => {
            return res.status(500)
            .json({
                message: "Error while creating event",
                error: err
            });
        });
    },

    delete: (req, res, _next) => {
        const id = req.params.id;

        EventModel.findByIdAndDelete(id)
        .then((event) => {
            if (!event) {
                return res.status(404)
                .json({
                    message: "Event not found"
                });
            }

            return res.status(200)
            .json({
                id: id,
                deleted: true
            });
        })
        .catch((err) => {
            return res.status(500)
            .json({
                message: "Error while deleting Event",
                error: err
            });
        });
    }
}

