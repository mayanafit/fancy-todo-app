function toggle(obj) {
    var obj = document.getElementById(obj);
    console.log(obj)
    if (obj.style.display == "block") obj.style.display = "none";
    else obj.style.display = "block";
}

$(document).ready(() => {
    // loginPage()
    // registerPage()
    if (localStorage.access_token) {
        homeAfterLogin()
        showTodo()
        calendar()
    } else {
        homeBeforeLogin()
    }
})

function logout() {
    localStorage.clear()
    homeBeforeLogin()
    signOut()
}

function holiday() {
    $(`#holidayTable`).show()
    $(`#buttonAdd`).show()
    $(`#logoutButton`).show()
    $(`#loginButton`).hide()
    $(`#home-before-login`).hide()
    $(`#home-after-login`).hide()
    $(`#loginForm`).hide()
    $(`#registerForm`).hide()
    $(`#alreadyUser`).hide()
    $(`#buttonHoliday`).show()
}

function resetFormAdd() {
    $(`#titleAdd`).val(``),
    $(`#descriptionAdd`).val(``),
    $(`#statusAdd`).val(``),
    $(`#dueDateAdd`).val(`select`),
    $(`#alertAdd`).empty()
}

function homeBeforeLogin() {
    $(`#buttonAdd`).hide()
    $(`#logoutButton`).hide()
    $(`#home-before-login`).show()
    $(`#loginForm`).hide()
    $(`#registerForm`).hide()
    $(`#home-after-login`).hide()
    $(`#loginButton`).show()
    $(`#alreadyUser`).show()
    $(`#holidayTable`).hide()
    $(`#buttonHoliday`).hide()
    
}

function homeAfterLogin() {
    quotesOfDay()
    $(`#buttonAdd`).show()
    $(`#logoutButton`).show()
    $(`#loginButton`).hide()
    $(`#home-before-login`).hide()
    $(`#home-after-login`).show()
    $(`#loginForm`).hide()
    $(`#registerForm`).hide()
    $(`#alreadyUser`).hide()
    $(`#holidayTable`).hide()
    $(`#buttonHoliday`).show()
}

function loginPage() {
    $(`#loginForm`).show()
    $(`#buttonAdd`).hide()
    $(`#logoutButton`).hide()
    $(`#home-before-login`).hide()
    $(`#registerForm`).hide()
    $(`#home-after-login`).hide()
    $(`#loginButton`).show()
    $(`#alreadyUser`).show()
    $(`#emailLogin`).val(``)
    $(`#passwordLogin`).val(``)
    $(`#alertLogin`).empty()
}

function registerPage() {
    $(`#loginForm`).hide()
    $(`#buttonAdd`).hide()
    $(`#logoutButton`).hide()
    $(`#home-before-login`).hide()
    $(`#registerForm`).show()
    $(`#home-after-login`).hide()
    $(`#loginButton`).show()
    $(`#alreadyUser`).show()
    $(`#emailRegister`).val(``)
    $(`#passwordRegister`).val(``)
    $(`#alertRegister`).empty()
}

function loginProcess(event) {
    event.preventDefault()
    const email = $(`#emailLogin`).val()
    const password = $(`#passwordLogin`).val()
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
        localStorage.access_token = result.access_token
        // homeAfterLogin()
        showTodo()
        // quotesOfDay()
    })
    .fail((err) => {
        // console.log(err)
        $(`#alertLogin`).append(`
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            ${err.responseJSON.message}        
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`)
    })
    .always( () => {
        $(`#emailLogin`).val(``)
        $(`#passwordLogin`).val(``)
    })
}

function registerProcess(event) {
    event.preventDefault()
    const email = $(`#emailRegister`).val()
    const password = $(`#passwordRegister`).val()
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
        $(`#alertRegister`).append(`
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                Successfully create an account! Proceed to login.      
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`)    
    })
    .fail((err) => {
        // console.log(err)
        if (Array.isArray(err.responseJSON.message)) {
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
        } else {
            $(`#alertRegister`).append(`
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    ${err.responseJSON.message}       
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>`)    
        }
    })
    .always( () => {
        $(`#emailRegister`).val(``)
        $(`#passwordRegister`).val(``)
    })
}

function showTodo() {
    $(`#todoEmpty`).empty()
    $.ajax({
        method: `GET`,
        url: `http://localhost:3000/todos`,
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done((result) => {
        // console.log(result)
        $(`#todoList`).empty()
        if (result.length === 0) {
            $(`#todoEmpty`).append(
                `<h2 class="text-center">You haven't done anything yet. &#128542</h2>`
            )
        } else {
            let counter = 1
            result.forEach(el => {
                $(`#todoList`).append(
                    `
                    <div class="col-sm-6 my-2">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title font-weight-bold">${el.title}</h5>
                                <a href="javascript: void(0);" onClick="toggle('ex${counter}')">Click to see your to-do!</a><br>
                                <p id="ex${counter}" style="display:none;">${el.description}</p>
                                <span class="font-weight-bold"><i class="fa fa-hourglass-half"></i> ${new Date(el.due_date).toDateString()}</span>
                                <br><span class="font-weight-bold"><i class="fa fa-check-square-o"></i> Status: ${el.status}</span>
                                <br><br><a data-toggle="modal" data-target="#form-edit" onclick="editFormTodo(${el.id})" role="button" class="btn btn-warning btn-sm"><i class="fa fa-edit"></i> Edit</a>
                                <a href="#" onclick="deleteTodo(${el.id})" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i> Delete</a>
                            </div>
                        </div>
                    </div>
                    `
                    )
                counter++
            })
        }
    })
    .fail((err) => {
        console.log(err)
    })
    .always(() => {
    })
}

function addTodo(event) {
    event.preventDefault()
    $(`#alertAdd`).empty()
    $.ajax({
        method: `POST`,
        url: `http://localhost:3000/todos`,
        data: {
            title: $(`#titleAdd`).val(),
            description: $(`#descriptionAdd`).val(),
            status: $(`#statusAdd`).val(),
            due_date: $(`#dueDateAdd`).val()
        },
        headers: {
            access_token: localStorage.access_token    
        }
    })
    .done((result) => {
        showTodo()
        $(`#alertAdd`).append(`
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                Success adding new To-do!        
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`)    
    })
    .fail((err) => {
        // console.log(err)
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
        $(`#titleAdd`).val(``),
        $(`#descriptionAdd`).val(``),
        $(`#statusAdd`).val(``),
        $(`#dueDateAdd`).val(`select`)
    })
}

function deleteTodo(params) {
    $(`#alertDelete`).empty()
    $.ajax({
        method: `DELETE`,
        url: `http://localhost:3000/todos/${params}`,
        headers: {
            access_token: localStorage.access_token    
        }
    })

    .done((result) => {
        // console.log(result)
        $(`#alertDelete`).append(`
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    Successfully delete To-do: "${result.title}"!        
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>`)    
        showTodo()
    })
    .fail((err) => {
        console.log(err)
    })
    .always(() => {
    })
}
let id;
function editFormTodo(params) {
    $(`#alertEdit`).empty()
    $.ajax({
        method: `GET`,
        url: `http://localhost:3000/todos/${params}`,
        headers: {
            access_token: localStorage.access_token    
        }
    })
    .done((result) => {
        id = result.id
        let due_date = new Date(result.due_date) 
        let day = due_date.getDate() > 9 ? due_date.getDate() : `0${due_date.getDate()}`
        let month = due_date.getMonth() + 1 > 9 ? due_date.getMonth() : `0${due_date.getMonth()+1}`
        let year = due_date.getFullYear()
        due_date = `${year}-${month}-${day}`
        $(`#titleEdit`).val(result.title),
        $(`#descriptionEdit`).val(result.description),
        $(`#statusEdit`).val(result.status),
        $(`#dueDateEdit`).val(due_date)
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
            title: $(`#titleEdit`).val(),
            description: $(`#descriptionEdit`).val(),
            status: $(`#statusEdit`).val(),
            due_date: $(`#dueDateEdit`).val()
        },
        headers: {
            access_token: localStorage.access_token    
        }
    })
    .done((result) => {
       showTodo()
       $(`#alertEdit`).append(`
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                Successfully update To-do!        
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`)    
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

function quotesOfDay() {
    $(`#qotd`).empty()
    $.ajax({
        method: `GET`,
        url: `http://localhost:3000/quotes`,
        headers: {
            access_token: localStorage.access_token    
        }
    })
    .done((result) => {
        // console.log(result.data)
        $(`#qotd`).append(
            `
            <h5>${result.data.body}</h5>
            <footer class="blockquote-footer">${result.data.author}</cite></footer>
            `
        )
    })
    .fail((err) => {
        console.log(err)
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
        localStorage.setItem(`access_token`, result.access_token)
        homeAfterLogin()
        showTodo()
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


function calendar() {
    $.ajax({
        method: `GET`,
        url: `http://localhost:3000/calendar`,
        headers: {
            access_token: localStorage.access_token    
        }
    })
    .done((result) => {
        // console.log(result)
        result.forEach(element => {
            $(`#bodyHoliday`).append(`
            <tr>
                <th scope="row">${new Date(element.date.iso).toDateString()}</th>
                <td>${element.name}</td>
                <td class="text-wrap" style="width:600px">${element.description}</td>
                <td>${element.type[0]}</td>
              </tr>
            `)
        });
    })
    .fail((err) => {
        console.log(err)
    })
    .always(() => {
    })
}
