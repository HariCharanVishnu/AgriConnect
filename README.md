# SAP Project - Smart Agriculture Platform

A comprehensive full-stack application for managing agricultural operations, connecting farmers with agents, and providing AI-powered crop predictions.

## 🚀 Features

### Multi-Role System
- **Farmers**: Register crops, upload media, view payments and notifications
- **Agents**: Approve/reject crops, manage farmers, use AI predictions
- **Admins**: Analytics, agent supervision, revenue tracking

### Core Functionality
- **Crop Management**: Registration, approval workflow, status tracking
- **Media Upload**: Support for images, videos, and documents
- **Payment System**: Cost estimation and payment tracking
- **Notification System**: Real-time communication between users
- **AI Integration**: Crop prediction and analysis
- **Analytics Dashboard**: Revenue tracking and reporting

## 🛠 Tech Stack

### Frontend
- **React 19** with Vite
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API communication

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Multer** for file uploads
- **bcryptjs** for password hashing

### AI Services
- **Python** with Flask
- **Machine Learning** for crop predictions

## 📁 Project Structure

```
SAP-Project/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── api/             # API configuration
│   │   ├── components/      # Reusable components
│   │   ├── context/         # React context (Auth)
│   │   ├── pages/           # Page components
│   │   │   ├── admin/       # Admin pages
│   │   │   ├── agent/       # Agent pages
│   │   │   └── farmer/      # Farmer pages
│   │   └── routes/          # Route definitions
│   ├── package.json
│   └── README.md
├── server/                   # Node.js backend API
│   ├── config/              # Database configuration
│   ├── controllers/         # Business logic
│   ├── middleware/          # Authentication middleware
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── app.js               # Main server file
│   ├── package.json
│   └── README.md
├── ai-services/              # Python AI services
│   └── crop_prediction/     # Crop prediction service
└── README.md                # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Python 3.8+ (for AI services)
- npm or yarn

### 1. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp env-template.txt .env
# Edit .env with your MongoDB URI and JWT secret

# Start the server
npm run dev
```

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 3. Create Demo Users

Visit `http://localhost:5000/create-demo-users` to create demo users, or use the API:

```bash
curl -X POST http://localhost:5000/api/auth/create-demo-users
```

### 4. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Demo Users Page**: http://localhost:5000/create-demo-users

## 👥 Demo Credentials

After creating demo users, you can log in with:

| Role | Email | Password |
|------|-------|----------|
| Farmer | `farmer@example.com` | `password123` |
| Agent | `agent@example.com` | `password123` |
| Admin | `admin@example.com` | `password123` |

## 📚 API Documentation

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/create-demo-users` - Create demo users

### Crops
- `POST /api/crop/register` - Register new crop (Farmer)
- `GET /api/crop/my` - View my crops (Farmer)

### Agent Operations
- `GET /api/agent/pending-crops` - View pending crops
- `POST /api/agent/approve-crop/:id` - Approve crop
- `POST /api/agent/reject-crop/:id` - Reject crop
- `GET /api/agent/farmers` - View assigned farmers

### Admin Operations
- `GET /api/admin/agents` - View all agents
- `GET /api/admin/analytics/*` - Analytics endpoints

### Media
- `POST /api/media/upload` - Upload media (Farmer)
- `GET /api/media/agent` - View farmer media (Agent)

### Payments
- `POST /api/payment/create` - Create payment (Agent)
- `GET /api/payment/farmer` - View payments (Farmer)
- `GET /api/payment/agent` - View payments (Agent)

### Notifications
- `POST /api/notification/send` - Send notification
- `GET /api/notification/my` - View notifications

### AI Services
- `POST /api/ai/crop-predict` - Get AI prediction

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the server directory:

```env
MONGO_URI=mongodb://localhost:27017/sap-project
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
AI_SERVICE_URL=http://localhost:5001
```

### Database Setup

1. **Local MongoDB**:
   ```bash
   # Install MongoDB locally
   # Start MongoDB service
   mongod
   ```

2. **MongoDB Atlas** (Cloud):
   - Create account at MongoDB Atlas
   - Create cluster
   - Get connection string
   - Update MONGO_URI in .env

## 🎯 User Workflows

### Farmer Workflow
1. **Login** with farmer credentials
2. **Register crops** with details
3. **Upload media** (photos, videos, documents)
4. **View notifications** from agents
5. **Check payments** and crop status

### Agent Workflow
1. **Login** with agent credentials
2. **Review pending crops** for approval
3. **Approve/reject crops** with reasons
4. **View assigned farmers** and their media
5. **Use AI predictions** for crop analysis
6. **Create payment records**

### Admin Workflow
1. **Login** with admin credentials
2. **View agent performance** and analytics
3. **Monitor revenue** trends
4. **Track crop distribution** across regions
5. **Supervise system** operations

## 🛡 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Different permissions per user role
- **Password Hashing**: bcryptjs for secure password storage
- **Input Validation**: Request validation and sanitization
- **File Upload Security**: Type and size validation
- **CORS Protection**: Cross-origin request handling

## 📊 Analytics & Reporting

### Admin Dashboard Features
- **Agent Performance**: Number of assigned farmers per agent
- **Revenue Analytics**: Annual and regional revenue trends
- **Crop Distribution**: Crop-wise farmer distribution
- **System Overview**: Overall platform statistics

## 🔄 File Upload System

### Supported Formats
- **Images**: JPEG, PNG, GIF
- **Videos**: MP4, AVI
- **Documents**: PDF

### Specifications
- **Maximum Size**: 10MB per file
- **Storage**: Local file system (uploads directory)
- **Security**: File type and size validation

## 🚨 Error Handling

The application includes comprehensive error handling:

- **400**: Bad Request (validation errors)
- **401**: Unauthorized (authentication required)
- **403**: Forbidden (insufficient permissions)
- **404**: Not Found (resource not found)
- **500**: Internal Server Error

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**:
   - Ensure MongoDB is running
   - Check MONGO_URI in .env file
   - Verify network connectivity

2. **JWT Authentication Issues**:
   - Check JWT_SECRET in .env file
   - Ensure token is properly formatted
   - Verify token expiration

3. **File Upload Problems**:
   - Check file size (max 10MB)
   - Verify file type is supported
   - Ensure uploads directory exists

4. **CORS Errors**:
   - Check CORS configuration
   - Verify frontend URL is allowed
   - Ensure proper headers

5. **Frontend Not Loading**:
   - Check if backend is running
   - Verify API base URL in axios config
   - Check browser console for errors

### Development Tips

- **Backend Logs**: Check server console for error messages
- **Frontend DevTools**: Use browser developer tools for debugging
- **API Testing**: Use Postman or curl for API testing
- **Database**: Use MongoDB Compass for database inspection

## 🚀 Deployment

### Production Considerations

1. **Environment Variables**: Set all required environment variables
2. **Database**: Use production MongoDB instance
3. **File Storage**: Consider cloud storage for file uploads
4. **Security**: Use HTTPS and secure JWT secrets
5. **Monitoring**: Add logging and monitoring tools
6. **Backup**: Implement database backup strategies

### Deployment Options

- **Heroku**: Easy deployment for both frontend and backend
- **Vercel**: Great for frontend deployment
- **AWS**: Scalable cloud infrastructure
- **DigitalOcean**: Simple VPS deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is part of the SAP (Smart Agriculture Platform) initiative.

## 📞 Support

For support and questions:
- Check the troubleshooting section
- Review the API documentation
- Check the individual README files in frontend/ and server/ directories

---

**Happy Farming! 🌾** 