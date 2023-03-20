const db =  require('../databases/mongodb.js');
const User =  require('../Model/user_model.js');
/**
 * Connection à ma base de données en ligne
 * */ 
mongoose = db.connect();
// ETAPES 1: Création shema
const channelShema = mongoose.Schema({
    titre: String,
    description: String,
    status: String,
    date_creation: Date,
    id_admin: mongoose.Schema.Types.ObjectId,
});
// ETAPE 2: Création MODEL
const Channel = mongoose.model('channel', channelShema); // deviendra collection MovieS dans la base de donnée





/*
* Creation nouvelle channel
*/
exports.CreateChannel = (titre, description, status, date, id_admin, res) => {
//ETAPE 1: INSERTION DOCUMENTS
    const newChannel = new Channel({titre: titre, description: description, status : status, id_admin:id_admin, date_creation: date}); // Creation objet pour enregistrement document
    newChannel.save((err, savedMovie) => {
        if(err){
        console.error(err);
        } else {
            console.log('SavedMovie', savedMovie)
            res.send({message:'ok'});
        }
    });
}

/**
 * Lister les channels
 */

exports.ListChannel = (id, res, cible, type) => {
    const query = Channel.where({ "$or": [{status: "public", }, {id_admin:id}]});
    query.find()
    .exec((err, channels) => {

      if (err) {
        res.status(500).send({ message: err })
      }
      else{
          User.ListUser(id, res, channels, cible, type);
      }

    })
}


