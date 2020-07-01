var templateAg =  `
                <div class="row spacer">
                    <div class="col-md-2">
                        <button class="btn btn-primary h-100" id="botao" type="button" disabled>
                            Parceiro
                        </button>
                    </div> 
                    <div class="col-md-10 comborda text-right">
                        **PARCEIRO** / Volume transacional: **VOLUME**<br>
                    </div>
                </div>

                <div class="row spacer">
                    <div class="col-md-2">
                    <button class="btn btn-success h-100 d-flex justify-content-center align-items-left" type="button" disabled id=botao>
                        Sucesso
                    </button>
                    </div> 
                    <div class="col-md-10 comborda text-right">
                        **OK** <br>
                    </div>
                </div>

                <div class="row spacer">
                    <div class="col-md-2">
                    <button class="btn btn-warning h-100 d-flex justify-content-center align-items-left" type="button" disabled id=botao>
                        Falhas
                    </button> 
                    </div>
                    <div class="col-md-10 comborda text-right">
                        **FALHAS** <br>
                    </div>
                </div>

                <div class="row spacer">
                    <div class="col-md-2">
                    <button class="btn btn-danger h-100 d-flex justify-content-center align-items-left" type="button" disabled id=botao>
                        Fraudes
                    </button> 
                    </div>
                    <div class="col-md-10 comborda text-right">
                        **FRAUDES** <br>
                    </div>
                </div>`;

function carregaAgente(){
    var variavel = queryString();
    fetch("http://localhost:8080/agentesfinanceiros/"+variavel+"/dashboard")
        .then(res => res.json())
        .then(res => preencheAgente(res));
}

function preencheAgente(resJson){
    console.log(resJson);
    var ag = resJson;
    var novaLinha = templateAg.replace("**PARCEIRO**",ag.nome)
                                .replace("**VOLUME**",ag.volume)
                                .replace("**OK**",ag.statusOk)
                                .replace("**FALHAS**",ag.statusFalha)
                                .replace("**FRAUDES**",ag.statusFraude);
    document.getElementById("agente").innerHTML = novaLinha;
}

function queryString() {  
    var loc = location.search.substring(1, location.search.length); 
    var param_value = false;   
    var params = loc.split("&");
    for (i=0; i<params.length;i++) {   
        param_name = params[i].substring(0,params[i].indexOf('=')); 
        //if (param_name == parameter) {                                          
            param_value = params[i].substring(params[i].indexOf('=')+1)   
        //}   
    }   
    if (param_value) {
        return param_value;   
    }   
    else {   
        return undefined;   
    }   
}

function verificaUsuario(){
    var userLogado = localStorage.getItem("userDash");
    if (!userLogado){
        window.location="index.html";
    }
    else{
        carregaAgente()
    }
}

function logout(){
    var userLogado = localStorage.removeItem("userDash");
    window.location="index.html"
}