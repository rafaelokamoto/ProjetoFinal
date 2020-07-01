var templateBarra = `<img src="**FOTO**" width="80px"> 
                       **NOME** (**RACF**)`;

var templateTt = `<div class="container">
                    <div class="row rowdtp">
                        <div class="col-md-1">
                        </div>
                        <div class="col-md-4 comborda">
                            **NOME** 
                        </div>
                        <div class="col-md-4 comborda">
                            **VOLUME** <br>
                        </div>
                        <div class="col-md-3">
                        </div>
                    </div>    
                </div>`;

function carregaTopTen(){
    fetch("http://localhost:8080/agentefinanceiro")
        .then(res => res.json())
        .then(res => preencheTopTen(res));
}

function preencheTopTen(resJson){
    console.log(resJson);
    var contStr =templateTt.replace("**NOME**","Parceiro")
                           .replace("**VOLUME**","Volume Transacional")
    for (i=0; i<resJson.length; i++){
        var tt = resJson[i];
        var novaLinha = templateTt.replace("**NOME**",tt.nome)
                                   .replace("**VOLUME**",tt.volume);
        contStr = contStr + novaLinha;
    }
    document.getElementById("conteudo").innerHTML = contStr;
}

//function dropitem(str){
  //  if(str != null){
    //  window.location="parceiro.html";
    //}
    //var res = document.getElementById("dropmenu").value;
    //var select = document.getElementById("agentes");
    //var option = select.options[select.selectedIndex];
//}

function dropitem(str){
    window.location="agente.html?id="+str;
    //var res = document.getElementById("dropmenu").value;
    //var select = document.getElementById("agentes");
    //var option = select.options[select.selectedIndex];
    //alert(option.id);
}

function verificaUsuario(){
    // existe alguma info de "userDash" no armazenamento local?
    var userLogado = localStorage.getItem("userDash");
    if (!userLogado){
        // se não tiver, redireciona pra o INDEX  (ou seja, não tá logado)
        window.location="index.html";
    }
    else{
        // se tiver, mostra na barrinha
        var user = JSON.parse(userLogado);
        document.getElementById("barraUser").innerHTML = templateBarra
                                                    .replace("**FOTO**",user.linkFoto)
                                                    .replace("**NOME**", user.nome)
                                                    .replace("**RACF**",user.racf);
    }
}

function logout(){
    var userLogado = localStorage.removeItem("userDash");
    window.location="index.html"
}