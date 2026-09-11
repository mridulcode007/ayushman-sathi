import { Router } from 'express';
import { profile } from '../data.js';

const router = Router();

router.get('/', (req, res) => {
  res.json(profile);
});

export default router;
