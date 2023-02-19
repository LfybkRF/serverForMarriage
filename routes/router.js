const { Router } = require('express');
const router = new Router();
const controller = require('./controller');

router.post("/new-image", controller.image);


module.exports = router;