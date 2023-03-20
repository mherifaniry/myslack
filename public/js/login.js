$(document).ready(function(){
    var tokenStorage = localStorage.getItem('token');
    if(tokenStorage)
    {   
        /* décodadage token*/
        var base64Payload = tokenStorage.split('.')[1];
        var payload = JSON.parse(window.atob(base64Payload));

        window.location.href = window.location.origin+"/chat/"+payload.id+"?cible="+payload.id;
    }
});

var form = document.querySelector('form#form-login');
var form_2 = document.querySelector('form#form-register');
form.addEventListener("submit", loginUserWithXHR);
form_2.addEventListener("submit", registerUserWithXHR);


function loginUserWithXHR(event)
{
    event.preventDefault();

    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/user/login', true);

    //send the proper header information along with the request
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function(){
        if(xhr.readyState = XMLHttpRequest.DONE && xhr.status == 200){
            var token = JSON.parse(xhr.responseText);
            if(token.tk)
            {
                localStorage.setItem('token', token.tk);
                window.location.href = window.location.origin+'/chat/'+token.id+'?cible=641700af840f5d2d787684b1&type=ch';
            }
            else{
                $("#lresponse").html("login ou mot de passe incorrect");
            }
            
        }
    }
    var email = document.getElementById('email').value;
    var password = document.getElementById('mdp').value;
    var payLoad = "email="+email+"&"+"password="+password;
    xhr.send(payLoad);
}

function registerUserWithXHR(event)
{
    event.preventDefault();

    var nom = document.getElementById('_nom').value;
    var prenom = document.getElementById('_prenom').value;
    var email = document.getElementById('_email').value;
    var mdp = document.getElementById('_mdp').value;
    var cmdp = document.getElementById('_cmdp').value;

    if(mdp === cmdp)
    {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/user/register', true);

        //send the proper header information along with the request
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function(){
            if(xhr.readyState = XMLHttpRequest.DONE && xhr.status == 200){
                var token = JSON.parse(xhr.responseText);
                if(token.tk)
                {
                    localStorage.setItem('token', token.tk);
                    window.location.href = window.location.origin+'/chat/'+token.id+'?cible=641700af840f5d2d787684b1&type=ch';
                }
                else{
                    $("#lresponse").html("login ou mot de passe incorrect");
                }
                
            }
        }
        var payLoad = "email="+email+"&mdp="+mdp+"&nom="+nom+"&prenom="+prenom+"&cmdp="+cmdp;
        xhr.send(payLoad);
    }
    else{
        $("#rresponse").html("Vérifiez les deux mots de passes");
    }
    
}
