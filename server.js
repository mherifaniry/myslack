/* REQUIRE */
const express = require('express');
let app = express();
const http = require('http');
const server = http.createServer(app);
const bodyParser = require('body-parser');
const auth = require('./middleware/auth_middleware');
const test = require('./controller/test_controller');
const chat = require('./controller/chat_controller');




//importer les routes
const route_user = require('./route/user');
const route_channel = require('./route/channel');

require('dotenv').config();


const { Server } = require("socket.io");
const io = new Server(server);
 
//Lancement Serveur
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})


// middleware
app.use('/public', express.static('public')); // public en tant que dossier static 
app.use(bodyParser.urlencoded({extended: false}));

//configuration view
app.set('views', './views')
app.set('view engine', 'ejs')


// Socket
io.on('connection', (socket) => {

  /*console.log('a user is connected')*/
  socket.on('disconnect', () => {
    console.log('a user is disconnect')
  })

    const chatm = require("./Model/chat_model");
    

  // Gestion Chat Channels 
  socket.on('ch', (msg) => {
    chatm.Createchat(msg.photo_sender, msg.nom_sender, msg.email_receiver, msg.sender, msg.destination, 'ch', msg.text, new Date().getTime(), 0 ); // enregistrer le message dans la base de donnée
    io.emit('ch', msg)
  })

  // Gestion Chat Direct Messages
  socket.on('dm', (msg) => {
    chatm.Createchat(msg.photo_sender, msg.nom_sender, msg.email_receiver, msg.sender, msg.destination, 'dm', msg.text, new Date().getTime(), 0 ); 
    io.emit('dm',  msg)
  })
  
})


// ROUTE

app.use('/user', route_user);
app.use('/channel', route_channel);

app.get('/chat/:id',  chat.index);

app.get('/chot/:id',  chat.imdex);

app.get('/message/:id', chat.message)
app.get('/message/:id_sender/:id_receiver', chat.messageDM)


app.get('/test', auth, (req, res) => {
  console.log('connected');
  res.json({message:'ok'});
});

app.get('/test-valid-token', auth, test.a);






