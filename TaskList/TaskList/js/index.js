
var tarefas = [];

$(document).ready(function () {
    
    validaAPI();
    validaAcesso();
    hideLoading();
    
    $("#username").text(sessionStorage.username);

    $("#logout").click(function() {
        sessionStorage.removeItem('token');
        window.location = "login.html";
    });

    $("#fab_add").click(function() {
        window.location = "addtask.html";
    });

    fetchTasks();
});

function fetchTasks() {
    $.ajax({
        type: 'GET',
        url: sessionStorage.apiurl + '/api/Tasks',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'bearer ' + sessionStorage.token
        }
    }).done(function (data) {

        tarefas = data;

        if(tarefas.length == 0) {
            M.toast({html: 'Nenhuma tarefa registrada até o momento'});
            hideLoading();
            return;
        }

        for(var i = 0; i < tarefas.length; i++) {
            // sobre mandar esse i pra lá como idx, poderia varrer array atrás do id
            // mas acho desperdício de poder computacional
            createCard(tarefas[i], i);
        }

        $(".tStatus").click(statusToggle);
        $(".del_task").click(deleteTask);


        hideLoading();
        }).fail(function () {
            M.toast({html: 'Falha ao buscar tarefas na API'});
            hideLoading();
        });
}


function createCard(tarefa, idx) {
    var inner = '';
    // tentando manter o código legível aqui
    inner = '<li class="collection-item avatar">';
        inner = inner + createTaskStatus(tarefa.status, tarefa.id, idx);
        inner = inner + '<span class="title" data-id="'+ tarefa.id +'">' + tarefa.title + '</span>';
        inner = inner + '<p class="truncate">' + tarefa.desc + '</p>'
        inner = inner + '<a data-id="'+ tarefa.id +'" class="del_task"><i class="material-icons icon-red" title="Exluir tarefa">delete</i></a>';
    inner = inner + '</li>'
    $("#list_tasks").append(inner);
}

function createTaskStatus(status, id, idx) {

    var altxt = "Pendente";
    var color = "yellow";
    var icon = "schedule";

    if(status == 1) {
        icon = "assignment_turned_in";
        color = "green";
        altxt = "Concluída";
    }
    return '<i title="'+ altxt +'" data-id="'+ id +'" data-position="'+ idx +'" class="tStatus material-icons circle '+ color +'">'+ icon +'</i>';
}


// Função que altera o status diretamente na lista
function statusToggle() {
    var idx = $(this).data("position");
    var tarefa = tarefas[idx];
    alert("Mudar status " + $(this).data("id") + "de " + tarefa.status + " para " + Math.pow(tarefa.status-1, 2));
}

function deleteTask() {
    alert("Deletar " +$(this).data("id"));

}