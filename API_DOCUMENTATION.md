# Football News API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the request header:
```
x-auth-token: <your_jwt_token>
```

## Endpoints

### Authentication

#### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login User
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Get Current User
```http
GET /auth/me
```

**Headers:**
```
x-auth-token: <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2023-07-20T10:00:00.000Z"
  }
}
```

### News

#### Get All News
```http
GET /news?page=1&limit=10&category=transfer&search=keyword
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `category` (optional): Filter by category (transfer, match, general)
- `search` (optional): Search in title and content

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "title": "Transfer News",
      "content": "Player X joins Club Y",
      "image": "uploads/image.jpg",
      "category": "transfer",
      "author": {
        "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
        "username": "admin"
      },
      "createdAt": "2023-07-20T10:00:00.000Z",
      "updatedAt": "2023-07-20T10:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "itemsPerPage": 10
  }
}
```

#### Get News by ID
```http
GET /news/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "title": "Transfer News",
    "content": "Player X joins Club Y",
    "image": "uploads/image.jpg",
    "category": "transfer",
    "author": {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "username": "admin"
    },
    "createdAt": "2023-07-20T10:00:00.000Z",
    "updatedAt": "2023-07-20T10:00:00.000Z"
  }
}
```

#### Create News (Admin Only)
```http
POST /news
```

**Headers:**
```
x-auth-token: <jwt_token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
```
title: Transfer News
content: Player X joins Club Y
category: transfer
image: [file]
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "title": "Transfer News",
    "content": "Player X joins Club Y",
    "image": "uploads/image.jpg",
    "category": "transfer",
    "author": "60f7b3b3b3b3b3b3b3b3b3b3",
    "createdAt": "2023-07-20T10:00:00.000Z",
    "updatedAt": "2023-07-20T10:00:00.000Z"
  },
  "message": "News created successfully"
}
```

#### Update News (Admin Only)
```http
PUT /news/:id
```

**Headers:**
```
x-auth-token: <jwt_token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
```
title: Updated Transfer News
content: Updated content
category: transfer
image: [file] (optional)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "title": "Updated Transfer News",
    "content": "Updated content",
    "image": "uploads/new-image.jpg",
    "category": "transfer",
    "author": {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "username": "admin"
    },
    "createdAt": "2023-07-20T10:00:00.000Z",
    "updatedAt": "2023-07-20T11:00:00.000Z"
  },
  "message": "News updated successfully"
}
```

#### Delete News (Admin Only)
```http
DELETE /news/:id
```

**Headers:**
```
x-auth-token: <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "News deleted successfully"
}
```

### Matches

#### Get All Matches
```http
GET /matches
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "homeTeam": "Barcelona",
      "awayTeam": "Real Madrid",
      "homeScore": 2,
      "awayScore": 1,
      "date": "2023-07-25T20:00:00.000Z",
      "stadium": "Camp Nou",
      "status": "completed",
      "league": "La Liga",
      "createdAt": "2023-07-20T10:00:00.000Z"
    }
  ]
}
```

#### Get Match by ID
```http
GET /matches/:id
```

#### Create Match (Admin Only)
```http
POST /matches
```

**Headers:**
```
x-auth-token: <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "homeTeam": "Barcelona",
  "awayTeam": "Real Madrid",
  "homeScore": 2,
  "awayScore": 1,
  "date": "2023-07-25T20:00:00.000Z",
  "stadium": "Camp Nou",
  "status": "completed",
  "league": "La Liga"
}
```

#### Update Match (Admin Only)
```http
PUT /matches/:id
```

#### Delete Match (Admin Only)
```http
DELETE /matches/:id
```

### Transfers

#### Get All Transfers
```http
GET /transfers
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "playerName": "Erling Haaland",
      "fromClub": "Borussia Dortmund",
      "toClub": "Manchester City",
      "fee": "€60 million",
      "position": "Striker",
      "age": 22,
      "status": "confirmed",
      "createdAt": "2023-07-20T10:00:00.000Z"
    }
  ]
}
```

#### Get Transfer by ID
```http
GET /transfers/:id
```

#### Create Transfer (Admin Only)
```http
POST /transfers
```

**Headers:**
```
x-auth-token: <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "playerName": "Erling Haaland",
  "fromClub": "Borussia Dortmund",
  "toClub": "Manchester City",
  "fee": "€60 million",
  "position": "Striker",
  "age": 22,
  "status": "confirmed"
}
```

#### Update Transfer (Admin Only)
```http
PUT /transfers/:id
```

#### Delete Transfer (Admin Only)
```http
DELETE /transfers/:id
```

## Error Responses

### Validation Error
```json
{
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

### Authentication Error
```json
{
  "success": false,
  "error": "No token, authorization denied"
}
```

### Not Found Error
```json
{
  "success": false,
  "error": "News not found"
}
```

### Server Error
```json
{
  "success": false,
  "error": "Server error"
}
```

## Rate Limiting

- **General API**: 100 requests per 15 minutes
- **Authentication**: 5 requests per 15 minutes
- **File Uploads**: 10 uploads per hour

## File Upload

- **Supported formats**: JPG, JPEG, PNG, GIF
- **Maximum size**: 5MB
- **Storage**: Local file system in `uploads/` directory
- **Access**: Files are served statically at `/uploads/filename`

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error 