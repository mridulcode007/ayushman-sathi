import { Router } from 'express';
import { hospitals, procedurePackages } from '../data.js';

const router = Router();

router.get('/', (req, res) => {
  res.json(hospitals);
});

router.get('/:id', (req, res) => {
  const hospital = hospitals.find((h) => h.id === req.params.id);
  if (!hospital) return res.status(404).json({ error: 'Hospital not found.' });
  res.json(hospital);
});

router.get('/:id/cost', (req, res) => {
  const hospital = hospitals.find((h) => h.id === req.params.id);
  if (!hospital) return res.status(404).json({ error: 'Hospital not found.' });

  const procedure = (req.query.procedure || 'knee replacement').toLowerCase();
  const pkg = procedurePackages[procedure];
  if (!pkg) return res.status(404).json({ error: `No HBP package on file for "${procedure}".` });

  res.json({
    hospital: hospital.name,
    procedure,
    package: pkg,
    youPay: Math.max(pkg.rate - pkg.covered, 0)
  });
});

export default router;
