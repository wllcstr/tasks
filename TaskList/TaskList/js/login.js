$(document).ready(function() {
    validaAPI();

    if(sessionStorage.token)
        window.location = "index.html";

    hideLoading();

    $("#btn_logon").click(getAuthToken);
    $("#btn_register").click(function() {
        window.location = "register.html";
    });

    // em termos de UX, seria interessante o campo de senha responder ao "RETURN" do teclado
    $("#pwd_senha").on('keydown', function(e) {
        if (e.which == 13) {
            getAuthToken();
        }
    });

    //fab para limpar o endereço da API, já que tá no localstorage
    $("#fab_flushapi").click(function() {
        localStorage.removeItem('apiurl');
        validaAPI();
    });

});

function getAuthToken() {
    var loginData = {
        grant_type: 'password',
        username: $("#txt_nome").val(),
        password: $("#pwd_senha").val()
    };

    if(!loginData.username || !loginData.password) {
        toast('Necessário informar nome de usuário e senha para acesso ao sistema')
        return;
    }

    showLoading();
    $.ajax({
        type: 'POST',
        url: localStorage.apiurl + '/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: loginData
       
    }).done(function (data) {
        sessionStorage.setItem("username", loginData.username);
        sessionStorage.setItem("token", data.access_token);
        window.location = "index.html";
        }).fail(function () {
            hideLoading();
            toast('Ocorreu uma falha na autenticação')
        });
}