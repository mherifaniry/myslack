const express = require('express');
var mongoose = require('mongoose');
const bodyParser = require('body-parser'); // middleware pour parser les donnes des formulaires
const auth = require('../middleware/auth_middleware'); // middleware pour vérifier token utilisateur
const router = express.Router();
router.use(bodyParser.urlencoded({extended: false}));

//const user = require('../controller/chat_controller.js');
const channel = require('../Model/channel_model');

/**
 * route pour prendre une channels
 */
router.get('/', auth, (req, res) => {
    //channel.ListChannel(res);
    //res.send('GET request to id : ');
})

/**
 * route pour prendre une channels
 */
router.get('/:id', auth, (req, res) => {
    const id = req.params.id;
    res.send('GET request to id : '+id)
})

/**
 * route Poster une channels
*/
router.post('/new', auth, (req, res) => {
    channel.CreateChannel(req.query.titre, req.query.description, "private", new Date().getTime(), mongoose.Types.ObjectId(req.query.id), res)
})

/**
 * route pour modifier une channels
 */
router.put('/:id', auth,  (req, res) => {
    const id = req.params.id;
    res.send('GET request to id : '+id)
})

/**
 * route pour prendre les messages d'un channels
 */
router.get('/chat/:id', auth, (req, res) => {
    const id = req.params.id;
    res.send('GET messages from  id : '+id); // id_receiver dans chat et chat_for = 'chan'
})


/**
 * route pour ajouter un membre
 */
router.post('/member', auth, (req, res) => {
    res.send('AJOUTER UN membre dans un channels from  id : '); // id_receiver dans chat et chat_for = 'chan'
})

/**
 * route pour prendre les messages d'un channels
 */
router.get('/member/:id', auth, (req, res) => {
    const id = req.params.id;
    res.send('GET member of channel from  id : '+id); // id_receiver dans chat et chat_for = 'chan'
})


/**
 * route pour supprimer les messages d'un channels
 */
router.get('/delete/:id', auth, (req, res) => {
    const id = req.params.id;
    res.send('DELETE messages from  id : '+id); // id_receiver dans chat et chat_for = 'chan'
})


module.exports = router;
