var express = require('express');
var router = express.Router();

const controller = require('../controllers/users');

/* GET users listing. */
router.get('/', controller.list);

/* 
    GET user index. 
    /:id = Parametro
*/
router.get('/:id', controller.index);

/* Post users. */
router.post('/', controller.create);

/* Put user. */
router.put('/:id', controller.replace);

/* Patch user. */
router.patch('/:id', controller.update);

/* GET users listing. */
router.delete('/:id', controller.destroy);

module.exports = router;
