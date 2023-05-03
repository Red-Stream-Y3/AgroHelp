import session from 'express-session';
import Visitor from '../models/visitModel.js';

const visitMiddleware = session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
});

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
