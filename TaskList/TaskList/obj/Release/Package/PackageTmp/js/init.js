


$(document).ready(function () {
    var loginData = {
        grant_type: 'password',
        username: "wllcstr",
        password: "q1w2e3r4"
    };

    alert(loginData.username);


    $.ajax({
        type: 'POST',
        url: 'https://superotasklist.azurewebsites.net/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: 'grant_type=password&username=wllcstr&password=q1w2e3r4'
       
    }).done(function (data) {
        alert("deu token porra");
        sessionStorage.setItem("token", data.access_token);
        }).fail(function (a, b, c) {
            var jqXHR = a;
            var textStatus = b;
            var errorThrown = c;

            
            alert("deu merda");
        });
});