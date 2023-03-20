/* OBJECT DASBOARD */
let dashboard = {email: '', iat: '', exp:'',id:'',name:'', prenom:''};

    
var localhost = location.origin;

dashboard.send = (href) =>
{
  var uri = localhost+href;

  var tokenStorage = localStorage.getItem('token');
  if(!tokenStorage)
  {
    window.location.href = window.location.origin+"/user/login";
  }

  $.ajax({
    url: uri,
    type: 'GET',
    data: {id:1},
    headers: {'Authorization': 'Bearer '+tokenStorage},
    contentType: false,
    processData: false,
    error: function(data){
      var a = JSON.parse(data.responseText);
        alert('error');
    }
  }).done(function(data) {
    alert('done')
  });
 
};

dashboard.decrypt_token = () =>{
  var tokenStorage = localStorage.getItem('token');
  if(tokenStorage)
  {
    /* décodadage token*/
    var base64Payload = tokenStorage.split('.')[1];
    var payload = JSON.parse(window.atob(base64Payload));
    return payload;
  }
}

/**
 * attr pour tester validiter tocken sur le front
 */

dashboard.test_validite = () => {

  var tokenStorage = localStorage.getItem('token');
  if(!tokenStorage)
  {
    window.location.href = window.location.origin+"/user/login";
  }

  $.ajax({
    url: localhost+'/test-valid-token',
    type: 'GET',
    data: {},
    headers: {'Authorization': 'Bearer '+tokenStorage},
    contentType: false,
    processData: false,
    error: function(data){
      //var res = JSON.parse(data.responseText);
        return data.message;
    }
  }).done(function(data) {
        //var res = JSON.parse(data.responseText);
        return data.message;
  });
}

/**
 * Envoyer la modification du profile vers serveur backend
 */
dashboard.updateUser = () => {

  var tokenStorage = localStorage.getItem('token');
  if(!tokenStorage)
  {
    window.location.href = window.location.origin+"/user/login";
  }


    var nom = $("#unom").val();
    var prenom = $("#uprenom").val();
    var email = $("#uemail").val();
    var id = $("#uid").val();
  
  $.ajax({
    url: localhost+"/user/update/"+id+"?nom="+nom+"&prenom="+prenom+"&email="+email,
    type: 'PUT',
    headers: {'Authorization': 'Bearer '+tokenStorage},

    error: function(data){
      //var res = JSON.parse(data.responseText);
        return data.message;
    }
  }).done(function(data) {
        //var res = JSON.parse(data.responseText);
        localStorage.setItem('token', data.tk);
        window.location.href = window.location.origin+"/chat/"+id;
  });
}

/**
 * function to remove token
 */
dashboard.remove_token = () => {
  localStorage.removeItem('token')
  window.location.href = window.location.origin+"/user/login";
}


/**
 * Modal Configuration
 * 
*/

dashboard.modal_config = (titre, contenue, footer) =>{

  $('#exampleModalCenterTitle').html(titre);
  $(".modal-body").html(contenue);
  $(".modal-footer").html(footer);
}

/**
 *  Modal for update User
*/
dashboard.update_user = () =>{
  var body_content = '<form>';
  body_content += '<div class="form-group row"><label for="inputEmail3" class="col-sm-2 col-form-label">Nom</label><div class="col-sm-10"><input type="text" class="form-control" id="unom" value="'+dashboard.name+'" required></div></div>';
  body_content += '<div class="form-group row"><label for="inputEmail3" class="col-sm-2 col-form-label">Prénom</label><div class="col-sm-10"><input type="text" class="form-control" id="uprenom" value="'+dashboard.prenom+'"></div></div>';
  body_content += '<div class="form-group row"><label for="inputEmail3" class="col-sm-2 col-form-label">Email</label><div class="col-sm-10"><input type="email" class="form-control" id="uemail" value="'+dashboard.email+'" disabled><input type="hidden" class="form-control" id="uid" value="'+dashboard.id+'"></div></div>';
  body_content += '</form>';
  var footer_content = '<button type="button" onclick="dashboard.updateUser()" class="btn btn-primary">Enregistrer</button>';
  dashboard.modal_config('Update', body_content, footer_content);
  $("#exampleModalCenter").modal('show')
}

/**
 *  Modal for New User
*/
dashboard.new_channel = () =>{
  var body_content = '<form>';
  body_content += '<div class="form-group row"><label for="inputEmail3" class="col-sm-2 col-form-label">Titre</label><div class="col-sm-10"><input type="text" class="form-control" id="pctitre" placeholder="Private channel title" required></div></div>';
  body_content += '<div class="form-group row"><label for="inputEmail3" class="col-sm-2 col-form-label">déscription</label><div class="col-sm-10"><textarea type="text" class="form-control" id="pcdescription" placeholder="description..."></textarea><input type="hidden" class="form-control" id="pcid" value="'+dashboard.id+'"></div></div>';
  body_content += '</form>';
  var footer_content = '<button type="button" onclick="dashboard.newChannel()" class="btn btn-primary">Enregistrer</button>';
  dashboard.modal_config('Create a channel', body_content, footer_content);
  $("#exampleModalCenter").modal('show')
}

dashboard.newChannel = () => {

  if($("#pctitre").val())
  {
    var tokenStorage = localStorage.getItem('token');
  if(!tokenStorage)
  {
    window.location.href = window.location.origin+"/user/login";
  }

  $.ajax({
    url: localhost+'/channel/new?titre='+$("#pctitre").val()+'&description='+ $("#pcdescription").val()+'&id='+$("#pcid").val(),
    type: 'POST',
    data: {},
    headers: {'Authorization': 'Bearer '+tokenStorage},
    error: function(data){
      //var res = JSON.parse(data.responseText);
        return data.message;
    }
  }).done(function(data) {
        //var res = JSON.parse(data.responseText);
        window.location.href = window.location.origin+"/chat/"+$("#pcid").val();
  });
  }
  else{
    $("#pctitre").focus()
  }
}

dashboard.redirect = (cible) => {
  window.location.href = window.location.origin+"/chot/"+dashboard.id+"?cible="+cible;
}

/**
 * object pour traiter socket
 */


dashboard.sendSocket = (socket, event_name, text) => {
  socket.emit(event_name, text);
}

dashboard.receiveSocket = (msg) => {

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;

  if(msg.destination == $("#cible").val() && $("#type").val() == 'ch')
  {
    var li = '<li class="left clearfix"><span class="chat-img pull-left"><img src="'+msg.photo_sender+'" alt="User Avatar"></span><div class="chat-body clearfix"><div class="header"><strong class="primary-font">'+msg.nom_sender+'</strong><small class="pull-right text-muted"><i class="fa fa-clock-o"></i> '+today+'</small></div><p>'+msg.text+'</p></div></li>';
    $("ul.chat").append(li);
  }
  else if($("#type").val() == 'dm'  && msg.destination == dashboard.id && $("#cible").val() == msg.sender)
  {
    var li = '<li class="left clearfix"><span class="chat-img pull-left"><img src="'+msg.photo_sender+'" alt="User Avatar"></span><div class="chat-body clearfix"><div class="header"><strong class="primary-font">'+msg.nom_sender+'</strong><small class="pull-right text-muted"><i class="fa fa-clock-o"></i>'+today+' </small></div><p>'+msg.text+'</p></div></li>';
    $("ul.chat").append(li);
    
  }
  else
  {
    /*Gestion Badge*/
    var nb = $('span.badge-danger[data-id="'+msg.destination+'"]').text();
    $('span.badge-danger[data-id="'+msg.destination+'"]').html(parseInt(nb)+1)
  }
  
}



/** ---------------------------------------- PARTIE DOCUMENT READY ------------------------------- */

$(document).ready(function(){
  
  /*
    Tester si le token est valide
  */



  if(!dashboard.test_validite() == "ok")
  {
    window.location.href = window.location.origin+"/user/login";
  }

  var UserInfo = dashboard.decrypt_token();
    dashboard.email  =  UserInfo.email; 
    dashboard.exp  =  UserInfo.exp;
    dashboard.iat  =  UserInfo.iat; 
    dashboard.id  =  UserInfo.id;
    dashboard.name  =  UserInfo.name; 
    dashboard.prenom  =  UserInfo.prenom; 
    dashboard.photo  =  UserInfo.photo; 
   
    $(".user-name").html( dashboard.name);
    $(".user-role").html(UserInfo.prenom);
    $(".user-status").html(dashboard.email);
    $('.img-rounded').attr('src', dashboard.photo);


  /*
  * déconnection
  */
  $(".fa-power-off").click(function(){
    dashboard.remove_token();
  })

  /**
   * gestion modal
   */

  $('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })

  /**
   * open modal
   */

  $(".user-info").on('click', () => {
    dashboard.update_user();
  })

  $(".newchannel").on('click', () => {
    dashboard.new_channel();
  })

  /**
   * Menu slide bar
   */
  $(".sidebar-dropdown > a").click(function() {
        $(".sidebar-submenu").slideUp(200);
        if (
          $(this)
            .parent()
            .hasClass("active")
        ) {
          $(".sidebar-dropdown").removeClass("active");
          $(this)
            .parent()
            .removeClass("active");
        } else {
          $(".sidebar-dropdown").removeClass("active");
          $(this)
            .next(".sidebar-submenu")
            .slideDown(200);
          $(this)
            .parent()
            .addClass("active");
        }
    });

    $("#close-sidebar").click(function() {
      $(".page-wrapper").removeClass("toggled");
    });
    $("#show-sidebar").click(function() {
      $ (".page-wrapper").addClass("toggled");
    });

   // dashboard.id 

    /**
     * Gestion socket
     */
    
    var socket = io();
    event_name = $("#type").val();
    
    socket.on(event_name, dashboard.receiveSocket);
    //var content_to_send = {name: "Rakotoniaina", prenom:"Herifaniry"}

    /**
     * envoyer message via chat
    */
    $('#send').on('click', () => {

      if(event_name == 'dm')
      {
        var li = '<li class="left clearfix"><span class="chat-img pull-left"><img src="'+dashboard.photo+'" alt="User Avatar"></span><div class="chat-body clearfix"><div class="header"><strong class="primary-font">'+dashboard.name+'</strong><small class="pull-right text-muted"><i class="fa fa-clock-o"></i> </small></div><p>'+$("#message").val()+'</p></div></li>';
        $("ul.chat").append(li);
      }
      var message = {photo_sender: dashboard.photo, nom_sender: UserInfo.name, email_receiver: UserInfo.email, text: $("#message").val(), destination: $("#cible").val(), sender: UserInfo.id}
      dashboard.sendSocket(socket, event_name, message);
      $("#message").val('');
    })


    /**
     * Get all Message
     */
  
    if($("#cible").val())
    {
      
      if($("#type").val() == 'ch')
      {
        uri = window.location.origin+"/message/"+$("#cible").val()
      }
      else{
        uri = window.location.origin+"/message/"+$("#cible").val()+"/"+UserInfo.id;
      }
      var tokenStorage = localStorage.getItem('token');
      $.ajax({
        url: uri,
        type: 'GET',
        data: {id:1},
        headers: {'Authorization': 'Bearer '+tokenStorage},
        contentType: false,
        processData: false,
        error: function(data){
          var a = JSON.parse(data.responseText);
            alert('error');
        }
      }).done(function(data) {
        console.log(data);
        var li = "";
        for(i = 0; i < data.length; i++)
        {
             li += '<li class="left clearfix"><span class="chat-img pull-left"><img src="'+data[i].photo_sender+'" alt="User Avatar"></span><div class="chat-body clearfix"><div class="header"><strong class="primary-font">'+data[i].nom_sender+'</strong><small class="pull-right text-muted"><i class="fa fa-clock-o"></i> '+data[i].date_heure+'</small></div><p>'+data[i].content+'</p></div></li>';
        }
          
          $("ul.chat").append(li);
      });
    }

});
