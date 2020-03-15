
var tarefas = [];

$(document).ready(function () {
    
    validaAPI();
    validaAcesso();
    hideLoading();
    
    $("#username").text(sessionStorage.username);

    $("#logout").click(systemLogoff);

    $("#fab_add").click(function() {
        window.location = "task.html";
    });

    fetchTasks();
});

function fetchTasks() {
    $.ajax({
        type: 'GET',
        url: localStorage.apiurl + '/api/Tasks',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'bearer ' + sessionStorage.token
        }
    }).done(function (data) {

        tarefas = data;

        if(tarefas.length == 0) {
            toast('Nenhuma tarefa registrada até o momento');
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
        $(".title").click(function() {
            window.location = "task.html?taskid=" + $(this).data("id");
        });

        hideLoading();
        }).fail(function () {
            toast('Falha ao buscar tarefas na API');
            hideLoading();
        });
}


function createCard(tarefa, idx) {
    var inner = '';
    // tentando manter o código legível aqui
    inner = '<li class="collection-item avatar">';
        inner = inner + createTaskStatus(tarefa.Status, tarefa.Id, idx);
        inner = inner + '<span class="title" data-id="'+ tarefa.Id +'">' + tarefa.Title + '</span>';
        inner = inner + '<p class="truncate">' + tarefa.Desc + '</p>'
        inner = inner + '<a data-id="'+ tarefa.Id +'" data-position="'+ idx +'" class="del_task"><i class="material-icons icon-red" title="Exluir tarefa">delete</i></a>';
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
    var new_status = Math.pow(tarefa.Status-1, 2);

    tarefa.Status = new_status;

    showLoading();
    $.ajax({
        type: 'PUT',
        url: localStorage.apiurl + '/api/Tasks/' + tarefa.Id,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'bearer ' + sessionStorage.token
        },
        data: tarefa       
    }).done(function () {
        toast('Status da tarefa alterado');
        $("#list_tasks").empty();
        fetchTasks();
    }).fail(function () {
            toast('Falha alterar status da tarefa');
            hideLoading();
        });


}

function deleteTask() {

    var idx = $(this).data("position");
    var tarefa = tarefas[idx];

    showLoading();
    $.ajax({
        type: 'DELETE',
        url: localStorage.apiurl + '/api/Tasks/' + tarefa.Id,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'bearer ' + sessionStorage.token
        }       
    }).done(function () {
        toast('Tarefa excluída da lista');
        $("#list_tasks").empty();
        fetchTasks();
    }).fail(function () {
        toast('Falha excluir a tarefa');
            hideLoading();
        });
}