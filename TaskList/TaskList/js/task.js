
var fstatus = 0;
var task_id = 0;

$(document).ready(function() {

    validaAPI();
    validaAcesso();
    hideLoading();

    $("#username").text(sessionStorage.username);

    $("#btn_cancel").click(function() {
        history.back();
    });

    $("#logout").click(systemLogoff);

    $("#btn_addtask").click(saveTask);

});

function saveTask() {
    var ftitle = $("#txt_title").val();
    var fdescr = $("#txt_descr").val();

    if(!ftitle) {
        toast('A tarefa deve possuir um título');
        return;
    }

    showLoading();

    if(task_id == 0) {

        var taskData = {
            Title: ftitle,
            Desc: fdescr,
            Status: fstatus
        };
        
        $.ajax({
            type: 'POST',
            url: localStorage.apiurl + '/api/Tasks',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'bearer ' + sessionStorage.token
            },
            data: taskData       
        }).done(function () {
            toast('Tarefa registrada com sucesso');
            window.setTimeout(function(){
                window.location = "index.html";
            }, 1300);
            }).fail(function () {
                toast('Falha ao registrar a tarefa');
                hideLoading();
            });
    } else {

        var taskData = {
            Id: task_id,
            Title: ftitle,
            Desc: fdescr,
            Status: fstatus
        };

        $.ajax({
            type: 'PUT',
            url: localStorage.apiurl + '/api/Tasks/' + taskData.Id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'bearer ' + sessionStorage.token
            },
            data: taskData       
        }).done(function () {
            toast('Tarefa registrada com sucesso');
            window.setTimeout(function(){
                window.location = "index.html";
            }, 1300);            
        }).fail(function () {
                toast('Falha ao registrar a tarefa');
                hideLoading();
            });
    }
}