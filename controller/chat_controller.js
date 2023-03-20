const channel = require('../Model/channel_model');
const chat = require('../Model/chat_model')

exports.index = (req, res) => {

  const id = req.params.id;
  const cible = id;
  channel.ListChannel(id, res, cible, req.query.type);

}

exports.imdex = (req, res) => {

  const id = req.params.id;
  channel.ListChannel(id, res, req.query.cible, req.query.type);

}

exports.message = (req, res) => {
  const id = req.params.id;
  chat.Listchat(id, res);
}

exports.messageDM = (req, res) => {
  const id_sender = req.params.id_sender;
  const id_receiver = req.params.id_receiver;
  chat.ListchatDM(id_receiver, id_sender, res)
}