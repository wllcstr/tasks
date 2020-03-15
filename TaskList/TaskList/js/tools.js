
function validaAPI() {
    while(!sessionStorage.apiurl) {
        baseurl =  prompt("Por favor, preencha a URL Base da API.");
        if(baseurl.length > 0) {
            sessionStorage.setItem("apiurl", baseurl);
            location.reload();
        }
    }
}

function validaAcesso() {
    if(!sessionStorage.token) {
        alert("Sua sessão expirou, realize o login novamente");
        window.location = "login.html"
    } 
}

function showLoading() {
    // usnando visibility aqui pra manter o layout da página
    $(".progress").css("visibility", "visible");
}

function hideLoading() {
    $(".progress").css("visibility", "hidden");
}