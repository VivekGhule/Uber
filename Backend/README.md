# API Documentation

## POST `/users/register`

### Description
Registers a new user in the system. This endpoint validates the input, hashes the password, creates the user, and returns an authentication token.

### Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "Vivek",
    "lastname": "Ghule"
  },
  "email": "vivekghule@example.com",
  "password": "yourpassword"
}
```

#### Fields

- `fullname.firstname` (string, required): First name, minimum 3 characters.
- `fullname.lastname` (string, optional): Last name, minimum 3 characters if provided.
- `email` (string, required): Valid email address, minimum 5 characters.
- `password` (string, required): Password, minimum 6 characters.

### Responses

| Status Code | Description                                 | Response Body Example                                      |
|-------------|---------------------------------------------|------------------------------------------------------------|
| 201         | User registered successfully                | `{ "token": "<jwt_token>", "user": { ...userData } }`      |
| 400         | Validation error or missing required fields | `{ "errors": [ { "msg": "Error message", ... } ] }`        |
| 500         | Internal server error                       | `{ "error": "Internal server error" }`                     |

### Example Request

```http
POST /users/register
Content-Type: application/json

{
  "fullname": {
    "firstname": "Alice",
    "lastname": "Smith"
  },
  "email": "alice.smith@example.com",
  "password": "securepassword"
}
```

### Example Success Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60f7c2b8e1d2c8a1b8e4d123",
    "fullname": {
      "firstname": "Vivek",
      "lastname": "Ghule"
    },
    "email": "vivekghule@example.com",
    "socketId": null
  }
}
```

---