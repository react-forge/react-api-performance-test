# User Management API

A RESTful API for managing user details built with Node.js and Express.

## Installation

```bash
npm install
```

## Running the Server

```bash
npm start
```

The server will start on `http://localhost:3001`

## API Endpoints

### Get All Users
```
GET /api/users?limit=N
```
Optional query parameter `limit` to limit the number of results.

### Get User by ID
```
GET /api/users/:id
```

### Create New User
```
POST /api/users
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "gender": "Male",
  "age": 28,
  "birthPlace": "New York",
  "country": "USA",
  "hobbyList": ["Reading", "Hiking"]
}
```

### Update User (Full)
```
PUT /api/users/:id
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "gender": "Male",
  "age": 28,
  "birthPlace": "New York",
  "country": "USA",
  "hobbyList": ["Reading", "Hiking"]
}
```

### Update User (Partial)
```
PATCH /api/users/:id
Content-Type: application/json

{
  "age": 29
}
```

### Delete User
```
DELETE /api/users/:id
```

## API Documentation

See `openapi.yaml` for complete API specification in OpenAPI 3.0 format.

## Initial Data

The API comes with 2 dummy users:
1. John Doe - Male, 28, from New York, USA
2. Jane Smith - Female, 32, from London, UK
