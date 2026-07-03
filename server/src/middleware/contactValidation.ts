import type { Request, Response, NextFunction } from 'express';
import { rateLimit } from 'express-rate-limit';

// -----------------------------------------------------------
// Rate Limiter Middleware
// Limits IP to a maximum of 5 requests per 15 minutes
// -----------------------------------------------------------
export const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // limit each IP to 5 requests per windowMs
  standardHeaders: 'draft-7', // draft-7: Combined RateLimit headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    error: 'Too many contact requests from this IP. Please try again after 15 minutes.',
  },
});

// -----------------------------------------------------------
// Form Fields Validation Middleware
// -----------------------------------------------------------
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactFields(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, email, subject, message } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Name is required and cannot be empty.' });
  }

  if (!email || typeof email !== 'string' || email.trim() === '') {
    return res.status(400).json({ error: 'Email address is required and cannot be empty.' });
  }

  if (!EMAIL_REGEX.test(email.trim())) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  if (!subject || typeof subject !== 'string' || subject.trim() === '') {
    return res.status(400).json({ error: 'Subject is required and cannot be empty.' });
  }

  if (!message || typeof message !== 'string' || message.trim() === '') {
    return res.status(400).json({ error: 'Message body is required and cannot be empty.' });
  }

  // Sanitize fields slightly (trim trailing spaces)
  req.body.name = name.trim();
  req.body.email = email.trim().toLowerCase();
  req.body.subject = subject.trim();
  req.body.message = message.trim();

  next();
}
