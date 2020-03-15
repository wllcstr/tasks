$(document).ready(function () {
    var loginData = {
        grant_type: 'password',
        username: "wllcstr",
        password: "q1w2e3r4"
    };

    

    if(!sessionStorage.apiurl) {
        baseurl =  prompt("Por favor, preencha a URL Base da API.");
        sessionStorage.setItem("apiurl", baseurl);
        location.reload();
    }

    
    $.ajax({
        type: 'POST',
        url: sessionStorage.apiurl + '/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: loginData
       
    }).done(function (data) {
        sessionStorage.setItem("token", data.access_token);
        }).fail(function (a, b, c) {
            var jqXHR = a;
            var textStatus = b;
            var errorThrown = c;

            
            alert("deu merda");
        });
});