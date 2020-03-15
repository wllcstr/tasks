
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

    $("#btn_addtask").click(saveTask);

});

function saveTask() {
    var ftitle = $("#txt_title").val();
    var fdescr = $("#txt_descr").val();

    if(!ftitle) {
        M.toast({html: 'Preencha pelo menos o título da tarefa'});
        return;
    }

    showLoading();

    if(task_id == 0) {

        var taskData = {
            title: ftitle,
            desc: fdescr,
            status: fstatus
        };
        
        $.ajax({
            type: 'POST',
            url: sessionStorage.apiurl + '/api/Tasks',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'bearer ' + sessionStorage.token
            },
            data: taskData       
        }).done(function () {
            M.toast({html: 'Tarefa registrada com sucesso'});
            window.setTimeout(function(){
                window.location = "index.html";
            }, 1300);
            }).fail(function () {
                M.toast({html: 'Falha ao registrar a tarefa'});
                hideLoading();
            });
    } else {

        var taskData = {
            id: task_id,
            title: ftitle,
            desc: fdescr,
            status: fstatus
        };

        $.ajax({
            type: 'PUT',
            url: sessionStorage.apiurl + '/api/Tasks',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'bearer ' + sessionStorage.token
            },
            data: taskData       
        }).done(function () {
            M.toast({html: 'Tarefa registrada com sucesso'});
            window.setTimeout(function(){
                window.location = "index.html";
            }, 1300);            
        }).fail(function () {
                M.toast({html: 'Falha ao registrar a tarefa'});
                hideLoading();
            });
    }
}