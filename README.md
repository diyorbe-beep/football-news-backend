# Football News Backend API

A comprehensive REST API for a football news website built with Node.js, Express, and MongoDB.

## Features

- 🔐 JWT Authentication & Authorization
- 📰 News Management (CRUD operations)
- ⚽ Match Management
- 🔄 Transfer News Management
- 📁 File Upload Support
- 🔍 Search & Filtering
- 📄 Pagination
- ✅ Input Validation
- 🛡️ Security Middleware
- 📊 Error Handling

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Validation**: Express-validator
- **Security**: Helmet, CORS
- **Logging**: Morgan

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd football-news-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/football-news
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=5d
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### News
- `GET /api/news` - Get all news (with pagination & search)
- `GET /api/news/:id` - Get news by ID
- `POST /api/news` - Create news (Admin only)
- `PUT /api/news/:id` - Update news (Admin only)
- `DELETE /api/news/:id` - Delete news (Admin only)

### Matches
- `GET /api/matches` - Get all matches
- `GET /api/matches/:id` - Get match by ID
- `POST /api/matches` - Create match (Admin only)
- `PUT /api/matches/:id` - Update match (Admin only)
- `DELETE /api/matches/:id` - Delete match (Admin only)

### Transfers
- `GET /api/transfers` - Get all transfers
- `GET /api/transfers/:id` - Get transfer by ID
- `POST /api/transfers` - Create transfer (Admin only)
- `PUT /api/transfers/:id` - Update transfer (Admin only)
- `DELETE /api/transfers/:id` - Delete transfer (Admin only)

## API Response Format

### Success Response
```json
{
  "success": true,
  "data": {...},
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

## Authentication

Include the JWT token in the request header:
```
x-auth-token: <your_jwt_token>
```

## File Upload

The API supports image uploads for news articles. Images are stored in the `uploads/` directory and served statically.

## Search & Filtering

### News Endpoints Support:
- **Pagination**: `?page=1&limit=10`
- **Category Filter**: `?category=transfer`
- **Search**: `?search=keyword`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `MONGO_URI` | MongoDB connection string | - |
| `JWT_SECRET` | JWT secret key | - |
| `JWT_EXPIRE` | JWT expiration time | 5d |

## Project Structure

```
backend/
├── config/
│   └── db.js              # Database configuration
├── controllers/
│   ├── authController.js   # Authentication logic
│   ├── newsController.js   # News CRUD operations
│   ├── matchController.js  # Match CRUD operations
│   └── transferController.js # Transfer CRUD operations
├── middlewares/
│   ├── auth.js            # JWT authentication
│   ├── upload.js          # File upload handling
│   ├── validation.js      # Input validation
│   └── errorHandler.js    # Error handling
├── models/
│   ├── User.js            # User model
│   ├── News.js            # News model
│   ├── Match.js           # Match model
│   └── Transfer.js        # Transfer model
├── routes/
│   ├── authRoutes.js      # Authentication routes
│   ├── newsRoutes.js      # News routes
│   ├── matchRoutes.js     # Match routes
│   └── transferRoutes.js  # Transfer routes
├── utils/                 # Utility functions
├── uploads/               # Uploaded files
├── server.js              # Main server file
└── package.json
```

## Development

### Running in Development Mode
```bash
npm run dev
```

### Health Check
Visit `http://localhost:5000/health` to check if the server is running.

## Security Features

- JWT Authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS protection
- Helmet security headers
- File upload restrictions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
