const express = require('express');
const router = express.Router();

const controllerPagSeguro = require('../controllers/pagSeguro');

router.post('/sessions', controllerPagSeguro.sessions);
router.post('/transactions', controllerPagSeguro.transactions);

module.exports = router;
