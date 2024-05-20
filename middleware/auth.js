const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const protect = async (req, res, next) => {
    let token;
    
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
  
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) {
          res.status(401);
          throw new Error('Not authorized, user not found');
        }
  
        next();
      } catch (error) {
        res.status(401);
        if (error.message === 'jwt expired') {
          error.message = 'Not authorized, token expired';
        } else {
          error.message = 'Not authorized, token failed';
        }
        throw error;
      }
    } else {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  };

module.exports = { protect };