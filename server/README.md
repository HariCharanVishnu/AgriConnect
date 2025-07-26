# SAP Project Backend Server

A comprehensive Node.js/Express backend for the Smart Agriculture Platform (SAP) project, providing APIs for farmers, agents, and administrators.

## Features

- **Multi-role Authentication**: JWT-based authentication for farmers, agents, and admins
- **Crop Management**: Registration, approval, and tracking of crops
- **Media Upload**: File upload system for images, videos, and documents
- **Payment System**: Cost estimation and payment tracking
- **Notification System**: Real-time notifications between users
- **AI Integration**: Crop prediction and analysis
- **Analytics**: Revenue tracking and reporting for admins

## Tech Stack

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database with Mongoose ODM
- **JWT**: Authentication and authorization
- **Multer**: File upload handling
- **bcryptjs**: Password hashing
- **Axios**: HTTP client for AI service integration

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

## Installation

1. **Clone the repository** and navigate to the server directory:
   ```bash
   cd server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create environment file**:
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` with your configuration:
   ```env
   MONGO_URI=mongodb://localhost:27017/sap-project
   JWT_SECRET=your-super-secret-jwt-key-here
   PORT=5000
   ```

4. **Start the server**:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/create-demo-users` - Create demo users for testing
- `PUT /api/auth/update-profile` - Update user profile

### Crops
- `POST /api/crop/register` - Farmer registers a new crop
- `GET /api/crop/my` - Farmer views their crops

### Agent Operations
- `GET /api/agent/pending-crops` - View pending crop registrations
- `POST /api/agent/approve-crop/:cropId` - Approve a crop
- `POST /api/agent/reject-crop/:cropId` - Reject a crop with reason
- `GET /api/agent/farmers` - View assigned farmers

### Admin Operations
- `GET /api/admin/agents` - View all agents with farmer counts
- `GET /api/admin/analytics/annual-revenue` - Annual revenue trends
- `GET /api/admin/analytics/crop-distribution` - Crop-wise farmer distribution
- `GET /api/admin/analytics/region-revenue` - Region-wise revenue

### Media
- `POST /api/media/upload` - Farmer uploads media files
- `GET /api/media/agent` - Agent views farmer media uploads

### Payments
- `POST /api/payment/create` - Agent creates payment record
- `GET /api/payment/farmer` - Farmer views their payments
- `GET /api/payment/agent` - Agent views payments for assigned crops

### Notifications
- `POST /api/notification/send` - Send notification to farmer
- `GET /api/notification/my` - Farmer views their notifications

### AI Services
- `POST /api/ai/crop-predict` - Get AI prediction for crop

## Demo Users

After starting the server, create demo users by visiting:
`http://localhost:5000/create-demo-users`

Or make a POST request to: `http://localhost:5000/api/auth/create-demo-users`

### Demo Credentials:
- **Farmer**: `farmer@example.com` / `password123`
- **Agent**: `agent@example.com` / `password123`
- **Admin**: `admin@example.com` / `password123`

## Database Models

### User
- `name`, `email`, `phone`, `password`, `role`, `region`, `farmerId`

### Crop
- `farmer`, `name`, `acres`, `cultivationStartDate`, `status`, `agent`, `farmerDetails`

### Payment
- `farmer`, `crop`, `estimatedCost`, `serviceFee`, `profitShare`, `total`

### Media
- `farmer`, `agent`, `description`, `fileUrl`, `fileType`, `fileName`, `fileSize`

### Notification
- `to`, `from`, `message`, `type`, `read`

## File Upload

The server supports file uploads with the following specifications:
- **Supported formats**: JPEG, PNG, GIF, MP4, AVI, PDF
- **Maximum size**: 10MB
- **Storage**: Local file system (uploads directory)

## Error Handling

All endpoints include comprehensive error handling:
- **400**: Bad Request (validation errors)
- **401**: Unauthorized (authentication required)
- **403**: Forbidden (insufficient permissions)
- **404**: Not Found (resource not found)
- **500**: Internal Server Error

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for password security
- **Role-based Access Control**: Different permissions for different user roles
- **Input Validation**: Request validation and sanitization
- **File Upload Security**: File type and size validation

## Development

### Project Structure
```
server/
├── config/
│   └── db.js              # Database configuration
├── controllers/
│   ├── authController.js   # Authentication logic
│   ├── cropController.js   # Crop management
│   ├── agentController.js  # Agent operations
│   ├── adminController.js  # Admin operations
│   ├── mediaController.js  # File uploads
│   ├── paymentController.js # Payment management
│   └── notificationController.js # Notifications
├── middleware/
│   └── auth.js            # Authentication middleware
├── models/
│   ├── User.js            # User model
│   ├── Crop.js            # Crop model
│   ├── Payment.js         # Payment model
│   ├── Media.js           # Media model
│   └── Notification.js    # Notification model
├── routes/
│   ├── auth.js            # Authentication routes
│   ├── crop.js            # Crop routes
│   ├── agent.js           # Agent routes
│   ├── admin.js           # Admin routes
│   ├── media.js           # Media routes
│   ├── payment.js         # Payment routes
│   ├── notification.js    # Notification routes
│   └── ai.js              # AI service routes
├── app.js                 # Main application file
├── package.json           # Dependencies
└── README.md             # This file
```

### Adding New Features

1. **Create Model**: Define schema in `models/` directory
2. **Create Controller**: Add business logic in `controllers/` directory
3. **Create Routes**: Define endpoints in `routes/` directory
4. **Update app.js**: Register new routes
5. **Add Tests**: Write tests for new functionality

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**:
   - Ensure MongoDB is running
   - Check MONGO_URI in .env file
   - Verify network connectivity

2. **JWT Errors**:
   - Check JWT_SECRET in .env file
   - Ensure token is properly formatted in Authorization header

3. **File Upload Issues**:
   - Ensure uploads directory exists
   - Check file size and type restrictions
   - Verify multer configuration

4. **CORS Errors**:
   - Check CORS configuration in app.js
   - Ensure frontend URL is allowed

### Logs

The server logs important events and errors to the console:
- Database connection status
- API request errors
- File upload issues
- Authentication failures

## Production Deployment

For production deployment:

1. **Environment Variables**: Set all required environment variables
2. **Database**: Use a production MongoDB instance
3. **File Storage**: Consider cloud storage for file uploads
4. **Security**: Use HTTPS and secure JWT secrets
5. **Monitoring**: Add logging and monitoring tools
6. **Backup**: Implement database backup strategies

## License

This project is part of the SAP (Smart Agriculture Platform) initiative. 