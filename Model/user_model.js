var jwt = require('jsonwebtoken');
var mn = require('mongoose');
const db =  require('../databases/mongodb.js');
require('dotenv').config();
const secret = process.env.TOKEN_KEY;
/**
 * Connection à ma base de données en ligne
 * */ 
mongoose = db.connect();
// ETAPES 1: Création shema
const UserShema = mongoose.Schema({
    name: String,
    prenom: String,
    email: String,
    mdp: String,
    photo: String,
    job: String,
    date_creation: Date
});
// ETAPE 2: Création MODEL
const User = mongoose.model('user', UserShema); // deviendra collection MovieS dans la base de donnée

/*
* Creation nouvelle User
*/
exports.CreateUser = (name, prenom, email, mdp, photo, job, date_creation, res) => {
//ETAPE 1: INSERTION DOCUMENTS
    const newUser = new User({name: name, prenom: prenom, email: email, mdp: mdp, photo: photo, job: job, date_creation: date_creation}); // Creation objet pour enregistrement document
    newUser.save((err, savedMovie) => {
        if(err){
            console.error(err);
        } else {
            this.findEmailMdp(email, mdp, res);
        }
    });
}

/**
 * fonction pour vérifier l'existence d'un compte
 */

exports.findEmailMdp = (email, mdp, res) => {
    const query = User.where({ email: email});
    query.findOne()
        .exec((err, users) => {
            console.log(users);
          if (err) {
            res.status(500).send({ message: err })
            return
          }
          if (!users || ( mdp != users.mdp) ) {
            return res.status(200).send({ message: "User Not found." })
          }

          const myToken = jwt.sign({id: users._id, name:users.name, prenom: users.prenom, email: users.email, photo: users.photo}, secret, {
            expiresIn: 86400, // 24 hours
          })
            
          res.json( {tk: myToken, id: users._id});
          
        })

}

/**
 * Lister les User
 */

exports.ListUser = (id, res, channel, cible, type) => {
    const {ObjectId} = require('mongodb'); 
    const query =  User.where({_id:{ $ne: mn.Types.ObjectId(id) }});
    query.find((err, users) => {
        if(err){
            console.error('could not retrieve User from DB');
        }
        else{

            var nb_notification = 3;
            var nb_messages = 7;
            var job = "Undefined";
            var status = "Undefined";
            var image = "https://bootdey.com/img/Content/user_3.jpg";
             res.render('index', {type: type, cible: cible, channels: channel, contacts: users, nb_notification: nb_notification, nb_messages: nb_messages, job:job, image:image, status:status})
        }
    });
}

/**
 * Update user
 */

exports.updateUser = (id, attr, res) => {
    User.findByIdAndUpdate(id, {$set: attr}, (err, users) => {
        if(err){
            console.error('could not retrieve User from DB');
        }
        else{
            const myToken = jwt.sign({id: id, name:attr.name, prenom: attr.prenom, email: attr.email, photo: attr.photo}, secret, {
                expiresIn: 86400, // 24 hours
              })
              res.json( {tk: myToken});
        }
    })
}


