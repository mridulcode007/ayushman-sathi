import { Router } from 'express';
import { eligibilityQuestions, profile } from '../data.js';

const router = Router();

router.get('/questions', (req, res) => {
  res.json(eligibilityQuestions);
});

// Body: { answers: { age70: 'yes'|'no', bpl: 'yes'|'no', govtJob: 'yes'|'no' } }
router.post('/check', (req, res) => {
  const answers = req.body?.answers || {};
  if (eligibilityQuestions.some((q) => !(q.id in answers))) {
    return res.status(400).json({ error: 'All three questions must be answered.' });
  }

  const qualified = [];
  if (answers.age70 === 'yes') qualified.push(profile.schemes.find((s) => s.id === 'pmjay70'));
  if (answers.bpl === 'yes' || answers.age70 === 'yes') qualified.push(profile.schemes.find((s) => s.id === 'pmjay'));
  qualified.push(profile.schemes.find((s) => s.id === 'mjpjay'));

  const seen = new Set();
  const schemes = qualified.filter((s) => s && !seen.has(s.id) && seen.add(s.id));

  res.json({ schemes });
});

export default router;
