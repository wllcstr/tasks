

$(document).ready(function() {
    validaAPI();

    if(sessionStorage.token)
        window.location = "index.html";

    hideLoading();

    $("#btn_register").click(createUser);
    $("#btn_cancel").click(function() {
        window.history.back();
    });


});

function createUser() {

    var name = $("#txt_nome").val();
    var pw1 =  $("#pwd_senha").val();
    var pw2 =  $("#pwd_senha2").val();

    if (!name) {
        toast('Necessário escolher um nome de usuário');
        $("#txt_nome").select();
        $("#txt_nome").focus();
        return;
    }

    if(!pw1) {
        toast('Necessário iformar uma senha de acesso');
        $("#pwd_senha").select();
        $("#pwd_senha").focus();
        return;
    }

    if(!pw2) {
        toast('Confirme a senha');
        $("#pwd_senha2").select();
        $("#pwd_senha2").focus();
        return;
    }

    if(pw1 != pw2) {
        toast('Senhas não são idênticas');
        $("#pwd_senha").select();
        $("#pwd_senha").focus();
        return;
    }


    var userData = {
        Username: name,
        Password: pw1
    };

    showLoading();
    $.ajax({
        type: 'POST',
        url: localStorage.apiurl + '/api/Users',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: userData       
    }).done(function () {
        toast('Usuário registrado com sucesso.');
        window.setTimeout(function(){
            window.location = "login.html";
        }, 1200);
        }).fail(function (x, result, status) {
            if(status == "Conflict")
            toast('Usuário já registrado.');
            else
            toast('Ocorreu uma falha no registro.')
            hideLoading();
        });
}