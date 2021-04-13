Simple CRUD REST API with nodeJS, expressJS, and mongoDB

The usage of this API is divided by two according to the role of the user.
- admin role user can access all of the endpoint
- user role user can only access endpoint get

APPLICATION CREDENTIAL

admin role user:
- username: jasonkristanto
- password: jason123

credential access token:
- user: 226923c8f149d596393648b78a34432f8a49e87f298c61aade2a01bdccd9d6639ed5479787e42f7d8d5a232685ee92d4efb2e134b2575296928ea34f57836c9d
- admin: ecba9a5c5757cf01e03e487197bdfc2b422c29b4d90a7eb536073e013ed029988f5cae99d2699b98d4605e78cbe070f3f8df44b5ede2411ecca90f5f64e1b7c5

mongo_uri:
mongodb+srv://jason:arabic_happen_sailfish_honorary_sextuple_convince@jasoncluster.f9osy.mongodb.net/crud_app?retryWrites=true&w=majority

POST /login/admin or /login/user

Request Body:
- username: string
- password: string

Response:
- message: "Login Successfully"
- data: []


POST /logout

Request Header: Bearer ACCESS_TOKEN
Request Body: -

Response:
- message: "Logout Successfully"
- data: []


GET /users

Request Header: Bearer ACCESS_TOKEN
Request Body: -

Response:
- message: "Successfully get all users."
- data: [
    {
      "_id": String,
      "username": String,
      "password": String,
      "email": String,
      "gender": String,
      "phoneNumber": String,
      "role": String,
      "__v": 0
    },...
  ]
  
  
GET /user

Request Header: Bearer ACCESS_TOKEN
Request Body: -

Response:
- message: "Successfully get the user."
- data: [
    {
      "_id": String,
      "username": String,
      "password": String,
      "email": String,
      "gender": String,
      "phoneNumber": String,
      "role": String,
      "__v": 0
    }
  ]
  
POST /user

Request Header: Bearer ACCESS_TOKEN
Request Body: {
  "username": String,
  "email": String, Email,
  "password": String,
  "gender": String (male or female),
  "phoneNumber": String, IDR Mobile Phone
}

Response:
- message: "Successfully created new user."
- data: []


PUT /user

Request Header: Bearer ACCESS_TOKEN
Request Body: {
  "username": String,
  "email": String, Email,
  "password": String,
  "gender": String (male or female),
  "phoneNumber": String, IDR Mobile Phone
}

Response:
- message: "Successfully updated new user."
- data: []


DELETE /user

Request Header: Bearer ACCESS_TOKEN
Request Body: {
  "username": String
}

Response:
- message: "Successfully deleted user."
- data: []
