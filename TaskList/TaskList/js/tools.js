
function validaAPI() {
    while(!localStorage.apiurl) {
        baseurl =  prompt("Por favor, preencha a URL Base da API.");
        if(baseurl.length > 0) {
            //o endereço da api no localstorage, pra nao ficar perguntando toda vez que entra na pág
            localStorage.setItem("apiurl", baseurl);
            location.reload();
        }
    }
}

function validaAcesso() {
    // o token no sessionstorage
    if(!sessionStorage.token) {
        alert("Sua sessão expirou, realize o login novamente");
        window.location = "login.html"
    } 
}

function systemLogoff() {
    sessionStorage.removeItem('token');
    window.location = "login.html";
}

function toast(msg) {
    M.Toast.dismissAll();
    M.toast({html: msg, classes: 'rounded'});
}

function showLoading() {
    // usando visibility aqui pra manter o layout da página
    $(".progress").css("visibility", "visible");
}

function hideLoading() {
    $(".progress").css("visibility", "hidden");
}