const jwt = require('jsonwebtoken');

const auth = (roles = []) => {
  // roles param can be a single role string (e.g. 'admin') or an array of roles (['admin', 'agent'])
  if (typeof roles === 'string') roles = [roles];

  return (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
      // Use default JWT secret instead of environment variable
      const jwtSecret = 'sap-project-super-secret-jwt-key-2024';
      
      const decoded = jwt.verify(token, jwtSecret);
      req.user = decoded;
      
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Forbidden: Insufficient role' });
      }
      next();
    } catch (err) {
      console.error('Auth middleware error:', err.message);
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
      }
      if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
      }
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
};

module.exports = auth;