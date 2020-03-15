
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

// Esta veio da comunidade: https://stackoverflow.com/questions/4656843/jquery-get-querystring-from-url
// Read a page's GET URL variables and return them as an associative array.
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function showLoading() {
    // usando visibility aqui pra manter o layout da página
    $(".progress").css("visibility", "visible");
}

function hideLoading() {
    $(".progress").css("visibility", "hidden");
}