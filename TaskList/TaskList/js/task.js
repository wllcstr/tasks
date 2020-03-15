
var fstatus = 0;

var taskData = {
    Id: 0,
    Title: "",
    Desc: "",
    Status: 0
};

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
    $("#btn_delete").click(deleteTask);

    // função de toggle no botão do status
    $("#toggle").click(function() {
        taskData.Status =  Math.pow(taskData.Status-1, 2);
        $("#toggle").toggleClass("yellow green");
        styleStatusTask();
    });

    // se for edição
    taskData.Id = parseInt(getUrlVars()["taskid"]);
    if(taskData.Id > 0) {
        showLoading();

        $.ajax({
            type: 'GET',
            url: localStorage.apiurl + '/api/Tasks/' + taskData.Id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'bearer ' + sessionStorage.token
            }       
        }).done(function (data) {
            taskData = data;

            // coloca os dados na tela
            $("#txt_title").val(taskData.Title);
            $("#txt_title").focus(); // sem esse focus aqui o placeholder fica por baixo do texto
            $("#txt_descr").val(taskData.Desc);
            $("#txt_descr").focus();

            // mostra a data de criação e ultima modificação
            var created = new Date(taskData.Created);
            var modified = new Date(taskData.Modified);
            //deixando legível
            var last_modified = "Incluído em " + created.toLocaleString().split(" ")[0] + " às " + created.toLocaleString().split(" ")[1] + ".";
            if(modified && modified != created) {
                last_modified = last_modified + " Última alteração em " + modified.toLocaleString().split(" ")[0] + " às " +  modified.toLocaleString().split(" ")[1] + ".";
            }
            $("#last_modified").text(last_modified);

            //ajusta o cabeçalho também
            $("#task_title").text("Alterar Tarefa: " + taskData.Id);

            // ajusta o estilo do toggle
            styleStatusTask();

            // muda o nome do botão "Cadastrar" para "Salvar"
            var salvar = 'Salvar<i class="material-icons right">done</i>';
            $("#btn_addtask").html(salvar)

            hideLoading();

        }).fail(function () {
            toast('Falha localizar tarefa');
                hideLoading();
            });

    } else {// se nao for volta o valor padrão
        $("#btn_delete").hide(); // e esconde o botão de deletar
        taskData.Id = 0;
    } 
});

function styleStatusTask() {

    var altxt = "Pendente";
    var icon = "schedule";


    if(taskData.Status == 1) {
        icon = "assignment_turned_in";
        altxt = "Concluída";

        if($("#toggle").hasClass("yellow"))
            $("#toggle").toggleClass("yellow green");
    }

    $("#toggle").attr("title", altxt);
    $("#toggle").html(icon);
}

function deleteTask() {
    if(!(taskData.Id > 0))
        return;
        showLoading();
        $.ajax({
            type: 'DELETE',
            url: localStorage.apiurl + '/api/Tasks/' + taskData.Id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'bearer ' + sessionStorage.token
            }       
        }).done(function () {
            toast('Tarefa excluída');
            window.setTimeout(function() {
                location.href = "index.html";
            }, 1200)
        }).fail(function () {
                toast('Falha excluir a tarefa');
                hideLoading();
            });
}

function saveTask() {
    taskData.Title = $("#txt_title").val();
    taskData.Desc = $("#txt_descr").val();

    if(!taskData.Title) {
        toast('A tarefa deve possuir um título');
        return;
    }

    showLoading();

    // Se for uma tarefa nova
    if(taskData.Id == 0) {
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
        // se for alteração
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