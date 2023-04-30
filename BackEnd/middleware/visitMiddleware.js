import express from 'express';
import session from 'express-session';
import Visitor from '../models/visitModel.js';

const visit = express();

// Use express-session middleware to track unique visitors
visit.use(
  session({
    secret: 'redstream',
    resave: false,
    saveUninitialized: true,
  })
);

// Middleware function to increment visitor count
visit.use((req, res, next) => {
  if (!req.session.visitor) {
    req.session.visitor = true;
    Visitor.findOneAndUpdate({}, { $inc: { count: 1 } }, { upsert: true })
      .then(() => next())
      .catch((err) => console.error(err));
  } else {
    next();
  }
});

export { visit };
