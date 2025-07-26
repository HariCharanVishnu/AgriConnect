# SAP Project Frontend

A modern React-based frontend for the SAP (Smart Agriculture Platform) project, providing interfaces for farmers, agents, and administrators.

## Features

- **Multi-role Authentication**: Support for farmers, agents, and administrators
- **Farmer Dashboard**: Crop management, notifications, payments, and media uploads
- **Agent Dashboard**: Crop approval, farmer management, and AI predictions
- **Admin Dashboard**: Analytics, agent supervision, and revenue tracking
- **Responsive Design**: Modern UI built with Tailwind CSS
- **Real-time Updates**: Live data synchronization with backend

## Tech Stack

- **React 19**: Latest React with hooks and functional components
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API communication
- **Vite**: Fast build tool and development server

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on `http://localhost:5000`

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── api/
│   └── axios.jsx          # API configuration
├── context/
│   └── AuthContext.jsx    # Authentication context
├── pages/
│   ├── Login.jsx          # Login page
│   ├── admin/
│   │   └── AdminDashboard.jsx
│   ├── agent/
│   │   └── AgentDashboard.jsx
│   └── farmer/
│       ├── FarmerDashBoard.jsx
│       ├── CropRegistrationForm.jsx
│       └── MediaUploadForm.jsx
├── routes/
│   └── AppRoutes.jsx      # Route definitions
├── App.jsx                # Main app component
├── main.jsx              # Entry point
└── index.css             # Global styles
```

## Demo Credentials

### Farmer
- Email: `farmer@example.com`
- Password: `password123`

### Agent
- Email: `agent@example.com`
- Password: `password123`

### Admin
- Email: `admin@example.com`
- Password: `password123`

## API Endpoints

The frontend communicates with the backend API at `http://localhost:5000/api`:

- **Authentication**: `/auth/login`
- **Crops**: `/crop/*`
- **Media**: `/media/*`
- **Payments**: `/payment/*`
- **Notifications**: `/notification/*`
- **Admin**: `/admin/*`
- **Agent**: `/agent/*`
- **AI**: `/ai/*`

## Key Features

### Authentication
- JWT-based authentication
- Role-based access control
- Automatic token refresh
- Secure logout

### Farmer Features
- Register new crops
- View crop status and details
- Upload media files
- View notifications and payments
- Contact assigned agent

### Agent Features
- Approve/reject crop registrations
- Filter and view farmers
- Use AI prediction tools
- Monitor payments

### Admin Features
- View agent performance
- Analytics and reporting
- Revenue tracking
- System overview

## Development

### Adding New Routes

1. Create the component in the appropriate directory
2. Add the route to `AppRoutes.jsx`
3. Implement proper authentication guards

### Styling

The project uses Tailwind CSS with custom components defined in `index.css`. Use the predefined classes:

- `.btn-primary`, `.btn-secondary`, `.btn-success`, `.btn-danger`
- `.input-field`
- `.card`

### State Management

- **Local State**: Use React hooks (`useState`, `useEffect`)
- **Global State**: Use `AuthContext` for authentication
- **API State**: Handle loading, error, and success states

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure the backend is running and configured for CORS
2. **Authentication Issues**: Check if the backend is properly configured
3. **Build Errors**: Clear node_modules and reinstall dependencies

### Development Tips

- Use the browser's developer tools to debug API calls
- Check the console for error messages
- Verify that the backend server is running on the correct port

## Contributing

1. Follow the existing code style
2. Add proper error handling
3. Test your changes thoroughly
4. Update documentation as needed

## License

This project is part of the SAP (Smart Agriculture Platform) initiative.