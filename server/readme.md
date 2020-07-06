# Todo App Server

Todo App here to list all your to-do list in interactive way. We use RESTful API with JSON formatted responses.

## Users Routes

POST /users/register : Create new user

    - Request Header
        Not required.

    - Request Body
        {
            "email": "<user's email>",
            "password": "<user's password>"
        }
    
    - Response 201: Created
        {
            "id": <given id by system>,
            "email": "<posted user's email>",
            "password": "<posted user's password>",
            "createdAt": "<date given by system>",
            "updatedAt": "<date given by system>"
        }
   
    - Response 400: Bad Request
        {
            <list of validation errors>
        }
   
    - Response 500: Internal server error
        {
            message: `Internal Server Error. <show error>`}
        }

POST /users/login : login to user's account

    - Request Header
        Not required.

    - Request Body
        {
            "email": "<user's email>",
            "password": "<user's password>"
        }
    
    - Response 200: OK
        {
            "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJtYXlhbmFAZW1haWwuY29tIiwiaWF0IjoxNTk0MDQ5MTc4fQ.aK3W9qlca2bdtKzhPtzLiSWALWaHRnypDnaQu9Al8u4"
        }
   
    - Response 400: Bad Request
        {
             message: `Invalid Email or Password!`
        }
    
    - Response 500: Internal server error
        {
            message: `Internal Server Error. <show error>`}
        }


## Todos Routes

POST /todos : Create new to-do list

    - Request Header
        {
            "access_token":"<access token>"
        }

    - Request Body
        {
            "title": "<To-do title>",
            "description": "<description of to-do>",
            "status": "<status of to-do completion>",
            "due_date": "<deadline of to-do>"
        }
    
    - Response 201: Created
        {
            "id": <given id by system>,
            "title": "<posted to-do title>",
            "description": "<posted description>",
            "status": "<posted status>",
            "due_date": "<posted deadline of to-do>",
            "createdAt": "<date given by system>",
            "updatedAt": "<date given by system>"
        }
   
    - Response 400: Bad Request
        {
            <list of validation errors>
        }
   
    - Response 500: Internal server error
        {
            message: `Internal Server Error. <show error>`}
        }

GET /todos : show all todo lists.

    - Request Header
        {
            "access_token":"<access token>"
        }

    - Request Body
        Not required.
    
    - Response 200: OK
        [
            {
                "id": 5,
                "title": "Masak Nasi",
                "description": "memasak nasi 6 liter ",
                "status": "uncompleted",
                "due_date": "2020-05-19T17:00:00.000Z",
                "createdAt": "2020-07-06T11:22:45.975Z",
                "updatedAt": "2020-07-06T11:22:45.975Z"
            },
            {
                "id": 1,
                "title": "Nyapu",
                "description": "Sapu rumah dan halaman",
                "status": "on progress",
                "due_date": "2020-07-19T17:00:00.000Z",
                "createdAt": "2020-07-06T10:51:42.268Z",
                "updatedAt": "2020-07-06T11:39:53.712Z"
            },
            {
                "id": 2,
                "title": "Cat's Duty",
                "description": "membersihkan poop dan tempat makan MengMeng",
                "status": "uncompleted",
                "due_date": "2020-09-19T17:00:00.000Z",
                "createdAt": "2020-07-06T10:54:51.004Z",
                "updatedAt": "2020-07-06T11:53:25.979Z"
            }
        ]   
   
    - Response 404: Not Found
        {
            message: `Error not found.`
        }
   
    - Response 500: Internal server error
        {
            message: `Internal Server Error. <show error>`}
        }

GET /todos/:id : show a selected to-do list based on id

    - Request Header
        {
            "access_token":"<access token>"
        }

    - Request Parameter
        {
            "id": <selected to-do list id>
        }

    - Request Body
        Not required.
    
    - Response 200: OK
            {
            "id": 2,
            "title": "Cat's Duty",
            "description": "membersihkan poop dan tempat makan MengMeng",
            "status": "uncompleted",
            "due_date": "2020-09-19T17:00:00.000Z",
            "createdAt": "2020-07-06T10:54:51.004Z",
            "updatedAt": "2020-07-06T11:53:25.979Z"
            }
   
    - Response 404: Not Found
        {
            message: `Error not found.`
        }
   
    - Response 500: Internal server error
        {
            message: `Internal Server Error. <show error>`}
        }

PUT /todos/:id : update a to-do list

    - Request Header
        {
            "access_token":"<access token>"
        }

    - Request Parameter
        {
            "id": <selected to-do list id>
        }

    - Request Body
        {
            "title": "<To-do title>",
            "description": "<description of to-do>",
            "status": "<status of to-do completion>",
            "due_date": "<deadline of to-do>"
        }
    
    - Response 200: OK
        {
            "id": <selected to-do list id>,
            "title": "<updated to-do title>",
            "description": "<updated description>",
            "status": "<updated status>",
            "due_date": "<updated deadline of to-do>",
            "createdAt": "<date given by system>",
            "updatedAt": "<date given by system>"
        }
    
    - Response 404: Not Found
        {
            message: `Error not found.`
        }
   
    - Response 400: Bad Request
        {
            <list of validation errors>
        }
   
    - Response 500: Internal server error
        {
            message: `Internal Server Error. <show error>`}
        }

DELETE /todos/:id : delete a selected to-do list based on id

    - Request Header
        {
            "access_token":"<access token>"
        }

    - Request Parameter
        {
            "id": <selected to-do list id>
        }

    - Request Body
        Not required.
    
    - Response 200: OK
        {
            "id": 2,
            "title": "Cat's Duty",
            "description": "membersihkan poop dan tempat makan MengMeng",
            "status": "uncompleted",
            "due_date": "2020-09-19T17:00:00.000Z",
            "createdAt": "2020-07-06T10:54:51.004Z",
            "updatedAt": "2020-07-06T11:53:25.979Z"
        }
   
    - Response 404: Not Found
        {
            message: `Error not found.`
        }
   
    - Response 500: Internal server error
        {
            message: `Internal Server Error. <show error>`}
        }

