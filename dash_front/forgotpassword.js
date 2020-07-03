function reset(){

    event.preventDefault();
    var txtEntrada = document.getElementById("txtEntrada").value;
    var query_text = procuraString(txtEntrada);
    if (query_text < 0){
        var msgBody = {
            racf: txtEntrada
        }
    }
    else {
        var msgBody = {
            email: txtEntrada
        }   
    }

    var cabecalho = {
        method : 'POST',
        body   : JSON.stringify(msgBody),
        headers : {
            'Content-type':'application/json'
        }
    }

    fetch("http://localhost:8080/reset", cabecalho)
        .then(resposta=>tratarResultado(resposta));
}
function tratarResultado(resp){
    if (resp.status == 200){ // ok, usuario e senha existem
        alert("Link para alteração de senha enviado para o e-mail cadastrado");
        //document.getElementById("resposta").innerHTML = "";
       //window.location="novasenha.html";
    }
    else if (resp.status == 404){  // not found
        alert("Usuario não identificado");
        //document.getElementById("resposta").innerHTML = "Usuario não identificado";
    }
}

function procuraString(resp) {  
    var params = resp;
    var indice = params.indexOf("@");
    return indice; 
}

function verificaUsuario(){
    // existe alguma info de "userDash" no armazenamento local?
    var userLogado = localStorage.getItem("userDash");
    if (userLogado){
        // se tiver, redireciona pra o HOME  (ou seja, está logado)
        window.location="home.html";
    }
}
