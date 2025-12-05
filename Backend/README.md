```markdown
# API Documentation – Authentication Service

This document defines the APIs for user and captain registration, authentication, and profile access.  
All responses are returned in JSON format.

---

## Authentication & Authorization

- **Authentication Scheme:** Bearer Token
- **Token Format:** JWT
- **Token Expiry:** 24 hours
- **Protected Route Header:**

```
Authorization: Bearer <jwt_token>
```

---

## User APIs

---

### POST `/users/register`

**Purpose**  
Create a new user account and return an authentication token upon successful registration.

#### Request Body
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

#### Validation Rules

| Field              | Type   | Required | Constraints                       |
| ------------------ | ------ | -------- | --------------------------------- |
| fullname.firstname | string | Yes      | Minimum 3 characters              |
| fullname.lastname  | string | No       | If provided, minimum 3 characters |
| email              | string | Yes      | Valid email, minimum 5 characters |
| password           | string | Yes      | Minimum 6 characters              |

#### Response Codes

| Code | Description                      |
| ---- | -------------------------------- |
| 201  | User registered successfully     |
| 400  | Invalid input or validation fail |
| 409  | Email already exists             |
| 500  | Internal server error            |

#### Success Response Example

```json
{
  "token": "<jwt_token>",
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

### POST `/users/login`

**Purpose**  
Authenticate the user and return a valid JWT token.

#### Request Body

```json
{
  "email": "vivekghule@example.com",
  "password": "yourpassword"
}
```

#### Response Codes

| Code | Description           |
| ---- | --------------------- |
| 200  | Login successful      |
| 400  | Validation error      |
| 401  | Invalid credentials   |
| 500  | Internal server error |

#### Success Response Example

```json
{
  "token": "<jwt_token>",
  "user": {
    "_id": "60f7c2b8e1d2c8a1b8e4d123",
    "fullname": {
      "firstname": "Vivek",
      "lastname": "Ghule"
    },
    "email": "vivekghule@example.com"
  }
}
```

---

### GET `/users/profile`

**Purpose**  
Retrieve authenticated user's profile data.

#### Required Header

```
Authorization: Bearer <jwt_token>
```

#### Response Codes

| Code | Description       |
| ---- | ----------------- |
| 200  | Profile retrieved |
| 401  | Unauthorized      |

#### Success Response Example

```json
{
  "_id": "...",
  "fullname": {
    "firstname": "Vivek",
    "lastname": "Ghule"
  },
  "email": "vivekghule@example.com",
  "socketId": null
}
```

---

### GET `/users/logout`

**Purpose**  
Logout the user by invalidating (blacklisting) the token.

#### Required Header

```
Authorization: Bearer <jwt_token>
```

#### Response Codes

| Code | Description       |
| ---- | ----------------- |
| 200  | Logout successful |
| 401  | Unauthorized      |

#### Success Response Example

```json
{
  "message": "User Logout Successfully"
}
```

---

## Captain APIs

---

### POST `/captain/register`

**Purpose**  
Register a new captain (driver) along with vehicle details.

#### Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "Red",
    "plate": "MH12AB1234",
    "vehicleType": "car",
    "capacity": 4
  }
}
```

#### Validation Rules

| Field               | Type   | Required | Constraints             |
| ------------------- | ------ | -------- | ----------------------- |
| fullname.firstname  | string | Yes      | Minimum 3 characters    |
| fullname.lastname   | string | Yes      | Minimum 3 characters    |
| email               | string | Yes      | Valid email             |
| password            | string | Yes      | Minimum 6 characters    |
| vehicle.color       | string | Yes      | Minimum 3 characters    |
| vehicle.plate       | string | Yes      | Minimum 3 characters    |
| vehicle.vehicleType | string | Yes      | `car`, `bike`, or `van` |
| vehicle.capacity    | number | Yes      | Minimum value: 1        |

#### Response Codes

| Code | Description                     |
| ---- | ------------------------------- |
| 201  | Captain registered successfully |
| 400  | Validation error                |
| 409  | Captain already exists          |
| 500  | Internal server error           |

#### Success Response Example

```json
{
  "token": "<jwt_token>",
  "captain": {
    "_id": "60f7c2b8e1d2c8a1b8e4d456",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "MH12AB1234",
      "vehicleType": "car",
      "capacity": 4
    },
    "status": "inactive",
    "location": {
      "lat": null,
      "lng": null
    }
  }
}
```

---

## General Notes

* All responses are in standardized JSON format.
* Passwords are hashed using secure encryption algorithms.
* A valid JWT token must be included in the Authorization header for protected endpoints.
* Error responses include messages for easier debugging.

---
