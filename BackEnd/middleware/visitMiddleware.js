import session from 'express-session';
import Visitor from '../models/visitModel.js';

// Middleware for session management
const visitMiddleware = session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Ensure cookie is sent only over HTTPS in production
    httpOnly: true, // Prevent client-side access to the cookie
    sameSite: 'strict', // Restrict cross-site requests with the cookie
    maxAge: 24 * 60 * 60 * 1000, // 1 day expiration for the session cookie
  },
});

// Middleware to increment visit count
const incrementCountMiddleware = async (req, res, next) => {
  const date = new Date().setHours(0, 0, 0, 0);
  const visit = await Visitor.findOne({ date });

  if (!visit) {
    await Visitor.create({ date, count: 1 });
  } else {
    visit.count++;
    await visit.save();
  }

  next();
};

export { visitMiddleware, incrementCountMiddleware };
