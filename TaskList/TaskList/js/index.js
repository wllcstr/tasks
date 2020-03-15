$(document).ready(function () {
    
    validaAPI();
    validaAcesso();
    hideLoading();
    
    $("#username").text(sessionStorage.username);

    $("#logout").click(function() {
        sessionStorage.removeItem('token');
        window.location = "login.html";
    });
});

