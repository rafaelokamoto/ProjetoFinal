var templateDPTO = `<div class="row">
                        <div class="col-md-12">
                            <h4>Bem vindo a pagina do departamento: **NOMEDEPTO**!</h4>
                            <br>O endereco desse departamento e: **UNIDADE** / **ANDAR** andar <br>       
                        </div>
                        </div>`;
function carregaDadosDepto(){
    var parametro = window.location.search;
    console.log("URL = "+parametro);

    var numDepto = parametro.substr(4);

    console.log("Numero do departamento = "+numDepto);

    if (numDepto != null){
    fetch("http://localhost:8080/departamentos/"+numDepto)
        .then(res => res.json())
        .then(res => preenche(res));
    }
    else {

    }
    }

    function preenche(resJson){
        console.log(resJson);
        var depto = resJson;
        var novaLinha = templateDPTO.replace("**NOMEDEPTO**",depto.nome)
                                    .replace("**ANDAR**",depto.andar)
                                    .replace("**UNIDADE**",depto.unidade);
        document.getElementById("conteudo").innerHTML = novaLinha;
    }

    //fetch("http://localhost:8080/login", cabecalho)
    //.then(resposta=>tratarResultado(resposta));
    // a partir daqui posso fazer um fetch no endpoint de departamento e
    // preencher um conjunto de linhas com todos os usuários daquele depto