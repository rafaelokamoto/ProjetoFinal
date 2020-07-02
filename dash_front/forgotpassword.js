function reset(){
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
       //alert("Usuario IDENTIFICADO");
       document.getElementById("resposta").innerHTML = "";
       window.location="novasenha.html";
    }
    else if (resp.status == 404){  // not found
        //alert("Usuario NAO FOI ENCONTRADO EM NOSSA BASE");
        console.log(resposta);
        document.getElementById("resposta").innerHTML = "<h6>Usuario nao encontrado na base</h6>";
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