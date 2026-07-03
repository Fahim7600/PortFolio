import { Router } from 'express';
import { handleContactFormSubmit } from '../controllers/contactController';
import {
  contactRateLimiter,
  validateContactFields,
} from '../middleware/contactValidation';

const router = Router();

// Expose POST /api/contact with rate limiting and fields checks
router.post('/contact', contactRateLimiter, validateContactFields, handleContactFormSubmit);

export default router;
