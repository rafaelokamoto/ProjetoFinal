function reset(){
    var txtEmail = document.getElementById("txtEmail").value;

    //console.log("Valores digitados = "+txtEmail);

    // json que vai no corpo da mensagem
    var msgBody = {
        email: txtEmail
    }

    var cabecalho = {
        method : 'POST',
        body   : JSON.stringify(msgBody),
        headers : {
            'Content-type':'application/json'
        }
    }
    console.log(msgBody);
    console.log(cabecalho);
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