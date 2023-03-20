const db =  require('../databases/mongodb.js');
/**
 * Connection à ma base de données en ligne
 * */ 
mongoose = db.connect();
// ETAPES 1: Création shema
const chatShema = mongoose.Schema({
    id_sender: mongoose.Schema.Types.ObjectId, 
    id_receiver: mongoose.Schema.Types.ObjectId,
    photo_sender: String,  
    nom_sender: String,
    email_receiver: String,
    chat_for: String, 
    content: String, 
    date_heure: Date, 
    status: Number 
});
// ETAPE 2: Création MODEL
const chat = mongoose.model('chat', chatShema); // deviendra collection MovieS dans la base de donnée



/*
* Creation nouvelle chat
*/
exports.Createchat = (photo_sender, nom_sender, email_receiver, id_sender, id_receiver, chat_for, content, date_heure, status ) => {
//ETAPE 1: INSERTION DOCUMENTS
    const newchat = new chat({photo_sender: photo_sender, nom_sender: nom_sender, email_receiver:email_receiver, id_sender: id_sender, id_receiver: id_receiver, chat_for: chat_for, content: content, date_heure: date_heure, status: status }); // Creation objet pour enregistrement document
    newchat.save((err, savedMovie) => {
        if(err){
        console.error(err);
        } else {
        console.log('SavedMovie', savedMovie)
        }
    });
}

/**
 * Lister les chats
 */

exports.Listchat = (id_receiver, res) => {
    const query =  chat.where({id_receiver:id_receiver});
    query
    .find()
    .sort({date_heure: 'ascending'})
    .limit(10)
    .exec((err, chats) => {
        if(err){
            console.error('could not retrieve chats from DB');
        }
        else{
            res.status(200).json(chats)
        }
    })
}

exports.ListchatDM = (id_receiver, id_sender, res) => {
    const query =  chat.where({ "$or": [{id_receiver:id_receiver, id_sender:id_sender}, {id_receiver:id_sender, id_sender:id_receiver}]}); 
    query
    .find()
    .sort({date_heure: 'ascending'})
    .limit(10)
    .exec((err, chats) => {
        if(err){
            console.error('could not retrieve chats from DB');
        }
        else{
            res.status(200).json(chats)
        }
    })
}


