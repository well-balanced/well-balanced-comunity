const express = require('express');
const router = express.Router();
const controller = require('./music.controller');

router.get('/', controller.index)

router.get('/post', controller.create)

router.get('/:id', controller.show)

router.post('/:id', controller.update)

router.get('/delete/:id', controller.destroy)

router.get('/edit/:id', controller.getEditView)

module.exports = router;