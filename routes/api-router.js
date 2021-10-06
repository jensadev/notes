const express = require('express');
const router = express.Router();
const { Note } = require('../models');
const Op = require('sequelize').Op;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.json('API is working');
});

router.get('/notes', function (req, res) {
    Note.findAll().then((notes) => res.json(notes));
});

router.get('/notes/search', function (req, res) {
    Note.findAll({
        limit: 2,
        where: {
            tag: {
                [Op.or]: [].concat(req.query.tag)
            }
        }
    }).then((notes) => res.json(notes));
});

router.get('/notes/:id', function (req, res) {
    Note.findAll({ where: { id: req.params.id } }).then((notes) =>
        res.json(notes)
    );
});

router.post('/notes', function (req, res) {
    Note.create({ note: req.body.note, tag: req.body.tag }).then(function (
        note
    ) {
        res.json(note);
    });
});

router.put('/notes/:id', function (req, res) {
    Note.findByPk(req.params.id).then(function (note) {
        note.update({
            note: req.body.note,
            tag: req.body.tag
        }).then((note) => {
            res.json(note);
        });
    });
});

router.delete('/notes/:id', function (req, res) {
    Note.findByPk(req.params.id)
        .then(function (note) {
            note.destroy();
        })
        .then((note) => {
            res.sendStatus(200);
        });
});

module.exports = router;
