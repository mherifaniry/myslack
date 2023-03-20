const db =  require('../databases/mongodb.js');
/**
 * Connection à ma base de données en ligne
 * */ 
mongoose = db.connect();
// ETAPES 1: Création shema
const channelMemberShema = mongoose.Schema({
    id_user: mongoose.Schema.Types.ObjectId,
    id_channel: mongoose.Schema.Types.ObjectId,
    role: String,
    date_creation: [Date],
});

// ETAPE 2: Création MODEL
const channelMember = mongoose.model('channelMember', channelMemberShema); // deviendra collection MovieS dans la base de donnée



/*
* Creation nouvelle channelMember
*/
exports.CreatechannelMember = (id_user, id_channel, role, date_creation) => {
//ETAPE 1: INSERTION DOCUMENTS
    const newchannelMember = new channelMember({id_user: id_user, id_channel: id_channel, role: role, date_creation: date_creation}); // Creation objet pour enregistrement document
    newchannelMember.save((err, savedMovie) => {
        if(err){
        console.error(err);
        } else {
        console.log('SavedMovie', savedMovie)
        }
    });
}

/**
 * Lister les channelMembers
 */

exports.ListchannelMember = () => {
    channelMember.find((err, channelMembers) => {
        if(err){
            console.error('could not retrieve channelMembers from DB');
        }
        else{
            console.log(channelMembers);
        }
    })
}


