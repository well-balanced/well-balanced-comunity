const express = require('express');
const router = express.Router();
const controller = require('./users.controller')

router.get('/',controller.index)

router.get('/:id',controller.show)

router.delete('/:id',controller.destroy)

router.post('/',controller.create)

module.exports = router;