function enviar(){
    var txtEntrada = document.getElementById("txtEntrada").value;
    var txtSenha = document.getElementById("txtSenha").value;
    var test_value = consultaString(txtEntrada);

    if (test_value < 0){
        var msgBody = {
            racf: txtEntrada,
            senha: txtSenha
        }
    }
    else {
        var msgBody = {
            email: txtEntrada,
            senha: txtSenha 
        }   
    }

    // json que vai no corpo da mensagem


    var cabecalho = {
        method : 'POST',
        body   : JSON.stringify(msgBody),
        headers : {
            'Content-type':'application/json'
        }

    }
    fetch("http://localhost:8080/login", cabecalho)
        .then(resposta=>tratarResultado(resposta));
}

function tratarResultado(resp){
    if (resp.status == 200){ // ok, usuario e senha existem
       //alert("Usuario IDENTIFICADO");
       document.getElementById("resposta").innerHTML = "";
       resp.json().then(res => efetivarLogin(res));
    }
    else if (resp.status == 404){  // not found
        //alert("Usuario NAO FOI ENCONTRADO EM NOSSA BASE");
        document.getElementById("resposta").innerHTML = "<h6>Usuario nao encontrado na base</h6>";
    }
    else if (resp.status == 403){  // forbidden
       // alert("Senha INVALIDA");
       document.getElementById("resposta").innerHTML =  "<h6>Senha Invalida</h6>";
    }
}

function efetivarLogin(res){
    // qual a idéia? gravar no LocalStorage o objeto que eu recebi
    // redirecionar para a página HOME.HTML
    localStorage.setItem("userDash",JSON.stringify(res));
    window.location="home.html";
}

function consultaString(resp) {  
    var params = resp;
    var indice = params.indexOf("@");
    return indice; 
}