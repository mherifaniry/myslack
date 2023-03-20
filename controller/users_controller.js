const crypto = require('crypto')
var user = require('../Model/user_model');
//configuration fichier environnement

// function
exports.login = (req, res) => {

  if(!req.body)
  {
    res.sendStatus(500)
  }
  else{
    const tuser = user.findEmailMdp(req.body.email, crypto.createHash('md5').update(req.body.password).digest("hex"), res);
  }
}

exports.register = (req, res) => {

  if(!req.body)
  {
    res.sendStatus(500)
  }
  else{
    var nom = req.body.nom;
    var prenom = req.body.prenom;
    var email = req.body.email;
    var mdp = req.body.mdp;
    var cmdp = req.body.cmdp;
    var datetime = new Date().getTime();

    if(cmdp == mdp)
    {
      mdp = crypto.createHash('md5').update(mdp).digest("hex")
      const rndInt = Math.floor(Math.random() * 6) + 1;
      user.CreateUser(nom, prenom, email, mdp, "https://bootdey.com/img/Content/user_"+rndInt+".jpg", "", datetime, res);
      
    }

  }
}

/**
 * Mise à jour du profile
 */
exports.update = (req, res) => {
  const id = req.params.id;

  if(!req.body)
  {
    res.sendStatus(500)
  }
  else{
    var nom = req.query.nom;
    var prenom = req.query.prenom;
    var email = req.query.email;
    var attr = {name: nom, prenom: prenom, email, email}
    user.updateUser(id, attr, res);
  }
}