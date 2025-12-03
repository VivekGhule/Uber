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

### POST `/users/register`

**Description:**  
Registers a new user in the system. Validates input, hashes the password, creates the user, and returns an authentication token.

**Request Body:**
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
- `fullname.firstname` (string, required): First name, minimum 3 characters.
- `fullname.lastname` (string, optional): Last name, minimum 3 characters if provided.
- `email` (string, required): Valid email address, minimum 5 characters.
- `password` (string, required): Password, minimum 6 characters.

**Responses:**

| Status Code | Description                                 | Response Body Example                                      |
|-------------|---------------------------------------------|------------------------------------------------------------|
| 201         | User registered successfully                | `{ "token": "<jwt_token>", "user": { ...userData } }`      |
| 400         | Validation error or missing required fields | `{ "errors": [ { "msg": "Error message", ... } ] }`        |
| 500         | Internal server error                       | `{ "error": "Internal server error" }`                     |

---

### POST `/users/login`

**Description:**  
Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "vivekghule@example.com",
  "password": "yourpassword"
}
```
- `email` (string, required): Valid email.
- `password` (string, required): Minimum 6 characters.

**Responses:**

| Status Code | Description                      | Response Body Example                                      |
|-------------|----------------------------------|------------------------------------------------------------|
| 200         | Login successful                 | `{ "token": "<jwt>", "user": { ... } }`                    |
| 400         | Validation error                 | `{ "errors": [ { "msg": "Error message" } ] }`            |
| 401         | Invalid credentials              | `{ "message": "Invalid email or password" }`               |

---

### GET `/users/profile`

**Description:**  
Returns the authenticated user's profile.

**Headers:**  
- `Authorization: Bearer <token>`

**Responses:**

| Status Code | Description      | Response Body Example                        |
|-------------|------------------|----------------------------------------------|
| 200         | Success          | `{ "_id": "...", "fullname": { ... }, ... }` |
| 401         | Unauthorized     | `{ "message": "Unauthorized" }`              |

---

### GET `/users/logout`

**Description:**  
Logs out the user by blacklisting the token.

**Headers:**  
- `Authorization: Bearer <token>`

**Responses:**

| Status Code | Description         | Response Body Example                         |
|-------------|---------------------|-----------------------------------------------|
| 200         | Logout successful   | `{ "message": "User Logout Successfully" }`   |
| 401         | Unauthorized        | `{ "message": "Unauthorized" }`               |

---

## Notes

- All endpoints return JSON responses.
- For protected routes, provide the JWT token in the `Authorization` header as `Bearer <token>`.
- Passwords are hashed before storage.
- Tokens expire after 24 hours.