
$(document).ready(function() {

    if(localStorage.token) {
        listTodo()
        $(`#navbar`).show()
        $(`#todo`).show()
        $(`#homepage`).hide()
        $(`#form-login`).hide()
        $(`#form-register`).hide()
        $(`#form-add-todo`).hide()
        $(`#login-button`).hide()
        $(`#form-edit-todo`).hide()
    } else {
        $(`#homepage`).show()
        $(`#navbar`).show()
        $(`#logout-button`).hide()
        $(`#todo`).hide()
        $(`#form-login`).hide()
        $(`#form-register`).hide()
        $(`#form-add-todo`).hide()
        $(`#form-edit-todo`).hide()
    }

})

function listPage() {
    $(`#form-add-todo`).hide()
    $(`#form-edit-todo`).hide()
    $(`#todo`).show()
}   

function addListForm() {
    $(`#form-add-todo`).show()
    $(`#todo`).hide()
}

function formLogin(event) {
    event.preventDefault()
    $(`#homepage`).hide()
    $(`#form-register`).hide()
    $(`#form-login`).show()
}

function formRegister(event) {
    event.preventDefault()
    $(`#homepage`).hide()
    $(`#form-login`).hide()
    $(`#form-register`).show()
}

function logOut() {
    signOut()
    localStorage.clear()
    $(`#homepage`).show()
    $(`#todo`).hide()
    $(`#login-button`).show()
    $(`#logout-button`).hide()
} 

function addUser(event) {
    event.preventDefault()
    const email = $(`#registerEmail`).val()
    const password = $(`#registerPassword`).val()
    $(`#alertRegister`).empty()
    $.ajax({
        method: `POST`,
        url: `http://localhost:3000/users/register`,
        data: {
            email: email,
            password: password
        }
    })
    .done((result) => {
        $(`#form-login`).show()
        $(`#form-register`).hide()
    })
    .fail((err) => {
        let errors = err.responseJSON.message
        errors.forEach(element => {
            $(`#alertRegister`).append(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                ${element}        
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`)    
        });
    })
    .always( () => {
        console.log(`tes`)
        $(`#registerEmail`).val(``)
        $(`#registerPassword`).val(``)
    })
}

function logIn(event) {
    event.preventDefault()
    const email = $(`#loginEmail`).val()
    const password = $(`#loginPassword`).val()
    $(`#alertLogin`).empty()
    $.ajax({
        method: `POST`,
        url: `http://localhost:3000/users/login`,
        data: {
            email: email,
            password: password
        }
    })
    .done((result) => {
        localStorage.token = result.access_token
        listTodo()
        $(`#form-login`).hide()
        $(`#todo`).show()
        $(`#login-button`).hide()
        $(`#logout-button`).show()
    })
    .fail((err) => {
        $(`#alertLogin`).append(`
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            ${err.responseJSON.message}        
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`)
    })
    .always( () => {
        console.log(`tes`)
        $(`#loginEmail`).val(``)
        $(`#loginPassword`).val(``)
    })
}

function listTodo() {
    $.ajax({
        method: `GET`,
        url: `http://localhost:3000/todos`,
        headers: {
            access_token: localStorage.token    
        }
    })
    .done((result) => {
        $(`#todo-page`).empty()
        if (result.length === 0) {
            $(`#todo-page`).append(
                `<h2 style="text-align: center;">You haven't done anything yet. &#128542</h2>`
            )
        } else {
            result.forEach(el => {
                $(`#todo-page`).append(
                    `
                    <div id="todo-table" class="card my-3">
                        <div class="card-header bg-success text-light font-weight-bold">
                        <h5><b>${el.title}</b></h5>
                        </div>
                        <div class="card-body bg-light">
                        <h6 class="card-title">"${el.description}"</h6>
                        <p class="card-text"><b>Status:</b>  ${el.status}</p>
                        <p class="card-text"><b>Due Date:</b>  ${new Date(el.due_date).toDateString()}</p>
                        <a class="btn btn-warning" onclick="editTodoForm(${el.id})">Edit</a>&nbsp
                        <a class="btn btn-danger text-light" onclick="deleteTodo(${el.id})">Delete</a>
                        </div>
                    </div>
                    `
                )
            })
        }
    })
    .fail((err) => {
        console.log(err)
    })
    .always(() => {
        console.log(`tes`)
    })
}

function addTodo(event) {
    event.preventDefault()
    $(`#alertAdd`).empty()
    $.ajax({
        method: `POST`,
        url: `http://localhost:3000/todos`,
        data: {
            title: $(`#Title`).val(),
            description: $(`#Description`).val(),
            status: $(`#Status`).val(),
            due_date: $(`#due_date`).val()
        },
        headers: {
            access_token: localStorage.token    
        }
    })
    .done((result) => {
        listTodo()
        $(`#todo`).show()
        $(`#form-add-todo`).hide()
    })
    .fail((err) => {
        let errors = err.responseJSON.message
        errors.forEach(element => {
            $(`#alertAdd`).append(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                ${element}        
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`)    
        });
    })
    .always(() => {
        $(`#Title`).val(``),
        $(`#Description`).val(``),
        $(`#Status`).val(``),
        $(`#due_date`).val(``)
    })
}

function deleteTodo(params) {
    $.ajax({
        method: `DELETE`,
        url: `http://localhost:3000/todos/${params}`,
        headers: {
            access_token: localStorage.token    
        }
    })

    .done((result) => {
        listTodo()
        $(`#todo`).show()
    })
    .fail((err) => {
        console.log(err)
    })
    .always(() => {
        console.log(`tes3`)
    })
}
let id;
function editTodoForm(params) {
    $.ajax({
        method: `GET`,
        url: `http://localhost:3000/todos/${params}`,
        headers: {
            access_token: localStorage.token    
        }
    })
    .done((result) => {
        $(`#form-edit-todo`).show()
        $(`#todo`).hide()
        id = result.id
        let due_date = new Date(result.due_date) 
        let day = due_date.getDate() > 9 ? due_date.getDate() : `0${due_date.getDate()}`
        let month = due_date.getMonth() + 1 > 9 ? due_date.getMonth() : `0${due_date.getMonth()+1}`
        let year = due_date.getFullYear()
        due_date = `${year}-${month}-${day}`
        $(`#title`).val(result.title),
        $(`#description`).val(result.description),
        $(`#status`).val(result.status),
        $(`#Due_date`).val(due_date)
    })
    .fail((err) => {
        console.log(err)
    })
    .always(() => {
    })
}

function editTodo(event) {
    event.preventDefault()
    $(`#alertEdit`).empty()
    $.ajax({
        method: `PUT`,
        url: `http://localhost:3000/todos/${id}`,
        data: {
            title: $(`#title`).val(),
            description: $(`#description`).val(),
            status: $(`#status`).val(),
            due_date: $(`#Due_date`).val()
        },
        headers: {
            access_token: localStorage.token    
        }
    })
    .done((result) => {
        listTodo()
        $(`#todo`).show()
        $(`#form-edit-todo`).hide()
    })
    .fail((err) => {
        let errors = err.responseJSON.message
        errors.forEach(element => {
            $(`#alertEdit`).append(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                ${element}        
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`)    
        });
    })
    .always(() => {
    })
}

function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        method: `POST`,
        url: `http://localhost:3000/users/login/google`,
        data: {
            id_token
        }
    })
    .done((result) => {
        localStorage.setItem(`token`, result.access_token)
        listTodo()
        $(`#form-login`).hide()
        $(`#todo`).show()
        $(`#logout-button`).show()
        $(`#login-button`).hide()
    })
    .fail((err) => {
        console.log(err)
    })
    .always(() => {

    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}


  