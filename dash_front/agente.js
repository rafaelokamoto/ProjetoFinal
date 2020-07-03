var ag;
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
                    <div class="col-md-2" style="width: 100%;">
                    <button class="btn btn-success h-100" id="botao" type="button" disabled>
                        Sucesso
                    </button>
                    </div> 
                    <div class="col-md-10 comborda text-right">
                        **OK** <br>
                    </div>
                </div>

                <div class="row spacer">
                    <div class="col-md-2" style="width: 100%;">
                    <button class="btn btn-warning h-100" id="botaofalha" type="button" disabled>
                        Falhas
                    </button> 
                    </div>
                    <div class="col-md-10 comborda text-right">
                        **FALHAS** <br>
                    </div>
                </div>

                <div class="row spacer">
                    <div class="col-md-2" style="width: 100%;">
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
        .then(res => preencheAgente(res))
        .then(res => drawChart());
}

function preencheAgente(resJson){
    ag = resJson;
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

//gerador do grafico
function drawChart(){
    CarregaGrafico();
}

function CarregaGrafico() {
    var resp = ag;
    var a=resp.nome;
    var x=resp.statusOk;
    var y=resp.statusFalha;
    var z=resp.statusFraude;
    data = google.visualization.arrayToDataTable([
    ['Agente Financeiro', 'Transacoes'],
    ['OK', x],
    ['Falha', y],
    ['Fraude', z]
    ]);

    var options = {
        'title':'Agente Financeiro - '+a, 
        'width':350,
        'height':250,
        legend: 'none',
        slices: {
            0: { color: '#28a745' },
            1: { color: '#ffc107' },
            2: { color: '#dc3545'}
        }
    };

    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
}

function goBack() {
    window.history.back();
  }