# User Serviec (CRUD) in Node.js

This repo filled with simple CRUD REST API built with Node.js, expressJS, and mongoDB.

This API is divided by two according to the role of the user.
* **admin**: have access to all the endpoint
* **user**: only have access to get user endpoint

---

## APPLICATION CREDENTIAL

**Admin role user**:
* username: jasonkristanto
* password: jason123

**Admin token**:
* access token: ecba9a5c5757cf01e03e487197bdfc2b422c29b4d90a7eb536073e013ed029988f5cae99d2699b98d4605e78cbe070f3f8df44b5ede2411ecca90f5f64e1b7c5
* refresh token: 2bf370b1bf70b5f7f5a224bdd1e8950ac878235d36cce0b591eb0042832ffdd39c4330fa1523911cff07895be2dbb6010e197b5722ddc93bc97f1361acdd2ec4

**User token**:
* access token: 226923c8f149d596393648b78a34432f8a49e87f298c61aade2a01bdccd9d6639ed5479787e42f7d8d5a232685ee92d4efb2e134b2575296928ea34f57836c9d
* refresh token: efc44a12b438724e7b5675d7fd4e606a9c0565e9516a6648e3e8046039f87c8524d57816034bea5ffd35d797f5d58ca6cf5bb1e16a4dad077d585fb66b4e1482

**mongo_uri**:
mongodb+srv://jason:arabic_happen_sailfish_honorary_sextuple_convince@jasoncluster.f9osy.mongodb.net/crud_app?retryWrites=true&w=majority

---

## API DOCUMENTATION

## Table of Contents

- [API Documentation](#api-documentation)
- [Installation](#installation)
- [Admin](#admin)
  + [Admin login](#admin-login)
  + [Admin refresh token](#admin-refresh-token)
  + [Admin logout](#admin-logout)
  + [Admin get all users](#admin-get-all-users)
  + [Admin get user](#admin-get-user)
  + [Admin create new user](#admin-create-new-user)
  + [Admin update existing user](#admin-update-existing-user)
  + [Admin delete existing user](#admin-delete-existing-user)
- [User](#user)
  + [User login](#user-login)
  + [User refresh token](#user-refresh-token)
  + [User logout](#user-logout)
  + [User get user](#user-get-user)
  


## Installation

To use this repo, you can clone this repo first. Then, you can install the dependencies using this command.

```bash
npm install
```

---

## Admin

### Admin Login

`POST /admin/login`

**Request body**
```js
{
  "username": String,
  "password": String
}
```
Example:
```json
{
  "username": "johndoe",
  "password": "johndoe123"
}
```

**Success response**:
```json
{
  "message": "Login Successful",
  "data": {
    "accessToken": "accessToken1234567890",
    "refreshToken": "refreshToken1234567890"
  }
}
```

**Note** Access token only last for 15 minutes, and after that, you must refresh the token.

<p align="right"><a href="#table-of-contents">??? Return to top</a></p>

### Admin Refresh token

`POST /admin/token`

**Request header** `Bearer ACCESS_TOKEN`

**Request body** `(empty)`

**Success response**:
```json
{
  "message": "Token Refreshed Successfully",
  "data": {
    "accessToken": "newAccessToken1234567890"
  }
}
```

<p align="right"><a href="#table-of-contents">??? Return to top</a></p>

### Admin Logout

`POST /admin/logout`

**Request header** `Bearer ACCESS_TOKEN`

**Request body** `(empty)`

**Success response**:
```json
{
  "message": "Logout successfully.",
  "data": []
}
```

<p align="right"><a href="#table-of-contents">??? Return to top</a></p>

### Admin get all users

`GET /admin/users`

**Request header** `Bearer ACCESS_TOKEN`

**Request body** `(empty)`

**Success response**:
```json
{
  "message": "Successfully get all users.",
  "data": [
    {
      "_id": "id0",
      "username": "andre",
      "password": "andrePassword",
      "email": "andre@gmail.com",
      "gender": "male",
      "phoneNumber": "0811223344",
      "role": "admin",
      "__v": 0
    },
    {
      "_id": "id1",
      "username": "sukirman-lagi-lagi",
      "password": "sukirman-lagi-lagiPassword",
      "email": "sukirman@gmail.com",
      "gender": "female",
      "phoneNumber": "0811223344",
      "role": "user",
      "__v": 0
    },
    {
      "_id": "id3",
      "username": "sukirman-lagi",
      "password": "sukirman-lagiPassword",
      "email": "sukirman123456@gmail.com",
      "gender": "male",
      "phoneNumber": "081122334455",
      "role": "user",
      "__v": 0
    }
  ]
}
```

<p align="right"><a href="#table-of-contents">??? Return to top</a></p>

### Admin get user

`GET /admin/user`

**Request header** `Bearer ACCESS_TOKEN`

**Request body** `(empty)`

**Success response**:
```json
{
  "message": "Successfully get the user.",
  "data": {
    "_id": "id0",
    "username": "andre",
    "password": "andrePassword",
    "email": "andre@gmail.com",
    "gender": "male",
    "phoneNumber": "0811223344",
    "role": "admin",
    "__v": 0
  }
}
```

<p align="right"><a href="#table-of-contents">??? Return to top</a></p>

### Admin create new user
  
`POST /admin/user`

**Request header** `Bearer ACCESS_TOKEN`

**Request Body**
```js
{
  "username": String,
  "email": String, Email,
  "password": String,
  "gender": String (male or female),
  "phoneNumber": String, IDR Mobile Phone
}
```

**Success response**:
```json
{
"message": "Successfully created new user.",
"data": []
}
```

<p align="right"><a href="#table-of-contents">??? Return to top</a></p>

### Admin update existing user

`PUT /admin/user`

**Request header** `Bearer ACCESS_TOKEN`

**Request Body**
```js
{
  "username": String,
  "email": String, Email,
  "password": String,
  "gender": String (male or female),
  "phoneNumber": String, IDR Mobile Phone
}
```

<p align="right"><a href="#table-of-contents">??? Return to top</a></p>

**Success response**:
```json
{
"message": "Successfully updated user.",
"data": []
}
```

<p align="right"><a href="#table-of-contents">??? Return to top</a></p>

### Admin delete existing user

`DELETE /admin/user`

**Request header** `Bearer ACCESS_TOKEN`

**Request Body**
```js
{
  "username": String
}
```

**Success response**:
```json
{
"message": "Successfully deleted user.",
"data": []
}
```

<p align="right"><a href="#table-of-contents">??? Return to top</a></p>

---

## User

### User login

`POST /user/login`

**Request body**
```js
{
  "username": String,
  "password": String
}
```
Example:
```json
{
  "username": "johndoe",
  "password": "johndoe123"
}
```

**Success response**:
```json
{
  "message": "Login Successful",
  "data": {
    "accessToken": "accessToken1234567890",
    "refreshToken": "refreshToken1234567890"
  }
}
```

**Note** Access token only last for 15 minutes, and after that, you must refresh the token.

<p align="right"><a href="#table-of-contents">??? Return to top</a></p>

### User refresh token

`POST /user/token`

**Request header** `Bearer ACCESS_TOKEN`

**Request body** `(empty)`

**Success response**:
```json
{
  "message": "Token Refreshed Successfully",
  "data": {
    "accessToken": "newAccessToken1234567890"
  }
}
```

<p align="right"><a href="#table-of-contents">??? Return to top</a></p>

### User logout

`POST /user/logout`

**Request header** `Bearer ACCESS_TOKEN`

**Request body** `(empty)`

**Success response**:
```json
{
  "message": "Logout successfully.",
  "data": []
}
```

<p align="right"><a href="#table-of-contents">??? Return to top</a></p>

### User get user

`GET /user/user`

**Request header** `Bearer ACCESS_TOKEN`

**Request body** `(empty)`

**Success response**:
```json
{
  "message": "Successfully get the user.",
  "data": {
    "_id": "id0",
    "username": "andre",
    "password": "andrePassword",
    "email": "andre@gmail.com",
    "gender": "male",
    "phoneNumber": "0811223344",
    "role": "user",
    "__v": 0
  }
}
```

<p align="right"><a href="#table-of-contents">??? Return to top</a></p>

