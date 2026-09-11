import { Router } from 'express';
import { grievances, grievanceOptions, nextGrievanceRef } from '../data.js';

const router = Router();

router.get('/options', (req, res) => {
  res.json(grievanceOptions);
});

// Body: { optionId: string, details?: string }
router.post('/', (req, res) => {
  const option = grievanceOptions.find((g) => g.id === req.body?.optionId);
  if (!option) return res.status(400).json({ error: 'A grievance reason is required.' });

  const reference = nextGrievanceRef();
  const grievance = {
    reference,
    optionId: option.id,
    title: option.title,
    details: req.body?.details || '',
    filedAt: new Date().toISOString(),
    status: 'open'
  };
  grievances.set(reference, grievance);
  res.status(201).json(grievance);
});

export default router;
