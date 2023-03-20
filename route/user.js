const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.urlencoded({extended: false}));

const user = require('../controller/users_controller');
/**/

/**
 * route login
 */
router.get('/login', (req, res) => {
    res.render('./users/login_view')
})

router.post('/login', user.login)

/**
 * route register
 */
router.post('/register', user.register)

/**
 * route register
 */
router.put('/update/:id', user.update)

module.exports = router;

