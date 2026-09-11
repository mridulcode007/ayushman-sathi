import { Router } from 'express';
import { claims, claimDocRequirements, nextClaimRef } from '../data.js';

const router = Router();

router.get('/requirements', (req, res) => {
  res.json(claimDocRequirements);
});

router.get('/', (req, res) => {
  const list = [...claims.values()].sort((a, b) => (a.date < b.date ? 1 : -1));
  res.json(list);
});

// Body: { docs: string[] } — keys of the documents the claimant confirmed as uploaded.
router.post('/', (req, res) => {
  const docs = Array.isArray(req.body?.docs) ? req.body.docs : [];
  const missing = claimDocRequirements.filter((d) => !docs.includes(d.key));
  if (missing.length) {
    return res.status(400).json({ error: `Missing documents: ${missing.map((d) => d.name).join(', ')}` });
  }

  const reference = nextClaimRef();
  const claim = {
    reference,
    label: 'Reimbursement, this claim',
    date: new Date().toISOString().slice(0, 10),
    scheme: 'submitted',
    amountPaid: null,
    status: 'pending'
  };
  claims.set(reference, claim);
  res.status(201).json(claim);
});

export default router;
