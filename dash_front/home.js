var ag;
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
    ag = resJson;
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

function drawChart(){
    CarregaGrafico2();
}

function CarregaGrafico2() {
    a=ag[0].nome;
    a1=ag[0].volume;
    b=ag[1].nome;
    b1=ag[1].volume;
    c=ag[2].nome;
    c1=ag[2].volume;
    d=ag[3].nome;
    d1=ag[3].volume;
    e=ag[4].nome;
    e1=ag[4].volume;
    f=ag[5].nome;
    f1=ag[5].volume;
    g=ag[6].nome;
    g1=ag[6].volume;
    h=ag[7].nome;
    h1=ag[7].volume;
    i=ag[8].nome;
    i1=ag[8].volume;
    j=ag[9].nome;
    j1=ag[9].volume;
    var data = google.visualization.arrayToDataTable([
    ['Parceiro', 'Volume de Transações'],
    [a, a1],
    [b, b1],
    [c, c1],
    [d, d1],
    [e, e1],
    [f, f1],
    [g, g1],
    [h, h1],
    [i, i1],
    [j, j1]
    ]);
    //var data = google.visualization.arrayToDataTable(['Parceiro', 'Volume de Transações'],[A]);
    // Optional; add a title and set the width and height of the chart
    var options = {'title':'TOP 10', 'width':1000, 'height':700};

    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById('toTenChart'));
    chart.draw(data, options);
}