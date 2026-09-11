import { Router } from 'express';
import { cases, cashlessSteps, nextCaseId, profile } from '../data.js';

const router = Router();

const DISCHARGE_BILL = {
  hospitalBill: 104300,
  paidByScheme: 100000,
  writtenOff: 4300,
  collectedFromPatient: 0
};

function serializeCase(c) {
  const step = cashlessSteps[c.stepIndex];
  return {
    id: c.id,
    lang: c.lang,
    stepIndex: c.stepIndex,
    totalSteps: cashlessSteps.length,
    done: c.stepIndex >= cashlessSteps.length,
    step: step
      ? {
          key: step.key,
          ...(step[c.lang] || step.en),
          cardNumber: step.key === 'qr' ? profile.cardNumber : undefined,
          package: step.key === 'package' ? { code: 'PJ-CV-07', title: 'Coronary angioplasty, single stent', rate: 100000, youPay: 0 } : undefined,
          timeline: step.key === 'timeline'
            ? [
                { label: 'Case registered at hospital', time: '09:12', done: true },
                { label: 'Pre-auth sent to state agency', time: '09:26 · SHA Maharashtra', done: true },
                { label: 'Decision', time: 'Usually within 6 hours; emergencies proceed at once', done: false }
              ]
            : undefined,
          approved: step.key === 'approved' ? { blocked: 100000, youPay: 0, coverRemaining: 400000 } : undefined,
          bill: step.key === 'discharge' ? DISCHARGE_BILL : undefined
        }
      : null
  };
}

router.post('/', (req, res) => {
  const id = nextCaseId();
  const c = { id, stepIndex: 0, lang: req.body?.lang === 'hi' ? 'hi' : 'en' };
  cases.set(id, c);
  res.status(201).json(serializeCase(c));
});

router.get('/:id', (req, res) => {
  const c = cases.get(req.params.id);
  if (!c) return res.status(404).json({ error: 'Case not found.' });
  res.json(serializeCase(c));
});

router.post('/:id/lang', (req, res) => {
  const c = cases.get(req.params.id);
  if (!c) return res.status(404).json({ error: 'Case not found.' });
  c.lang = req.body?.lang === 'hi' ? 'hi' : 'en';
  res.json(serializeCase(c));
});

router.post('/:id/advance', (req, res) => {
  const c = cases.get(req.params.id);
  if (!c) return res.status(404).json({ error: 'Case not found.' });
  c.stepIndex = Math.min(c.stepIndex + 1, cashlessSteps.length);
  res.json(serializeCase(c));
});

export default router;
