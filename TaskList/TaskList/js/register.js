

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
        M.toast({html: 'Necessário escolher um nome de usuário'});
        $("#txt_nome").select();
        $("#txt_nome").focus();
        return;
    }

    if(!pw1) {
        M.toast({html: 'Necessário iformar uma senha de acesso'});
        $("#pwd_senha").select();
        $("#pwd_senha").focus();
        return;
    }

    if(!pw2) {
        M.toast({html: 'Confirme a senha'});
        $("#pwd_senha2").select();
        $("#pwd_senha2").focus();
        return;
    }

    if(pw1 != pw2) {
        M.toast({html: 'Senhas não são iguais.'});
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
        url: sessionStorage.apiurl + '/api/Users',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: userData       
    }).done(function () {
        M.toast({html: 'Usuário registrado com sucesso.'});
        window.setTimeout(function(){
            window.location = "login.html";
        }, 900);
        }).fail(function (x, result, status) {
            if(status == "Conflict")
                M.toast({html: 'Usuário já registrado.'});
            else
                M.toast({html: 'Ocorreu uma falha no registro.'})
            hideLoading();
        });
}