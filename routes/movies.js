var express = require('express');
var router = express.Router();

const controller = require('../controllers/movies');

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

router.patch('/add/actor', controller.addActor);

/* GET users listing. */
router.delete('/:id', controller.destroy);

module.exports = router;