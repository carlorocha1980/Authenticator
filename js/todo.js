// Para tratamento dos dados de submissão do formulário de autenticação
todoForm.onsubmit = function (event) {
    event.preventDefault() //avoid the page redirect
    if (todoForm.name.value != '') {
        var data = {
            name: todoForm.name.value
        }

        dbRefUsers.child(firebase.auth().currentUser.uid).push(data).then(function () {
            console.log('Task "' + data.name + '" Add with Success!')
        }).catch(function (error) {
            showError('Falha ao adicionar tarefa:', error)
        })
    }
    else {
        alert('A tarefa não pode estar vazia!')
    }
}

//Exbir a lista de tarefas do usuário, por usuário
function fillTodoList(dataSnapshot) {
    ulTodoList.innerHTML = ''
    var num = dataSnapshot.numChildren()
    todoCount.innerHTML = num + (num > 1 ? ' Tasks' : ' Task') + ':' //Defini se terá ou não "S" para 1 ou mais de 1.
    dataSnapshot.forEach(function (item){
        var value = item.val()
        var li = document.createElement('li') //Cria um elemento to tipo Li para listar
        var spanLi = document.createElement('span') //Criar elemento do tipo Span, para utilizar lista de forma ordenada 
        spanLi.appendChild(document.createTextNode(value.name)) //Add o elemento de texto a list criado no Span
        li.appendChild(spanLi) //Add o Span dentro do Li
        ulTodoList.appendChild(li)//Add o Li dentro da lista de tarefas
    })
}