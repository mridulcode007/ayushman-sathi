import express from 'express';
import cors from 'cors';

import profileRoutes from './routes/profile.js';
import eligibilityRoutes from './routes/eligibility.js';
import hospitalRoutes from './routes/hospitals.js';
import caseRoutes from './routes/cases.js';
import claimRoutes from './routes/claims.js';
import grievanceRoutes from './routes/grievances.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use('/api/profile', profileRoutes);
app.use('/api/eligibility', eligibilityRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/claims', claimRoutes);
app.use('/api/grievances', grievanceRoutes);

app.use((req, res) => res.status(404).json({ error: 'Not found.' }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error.' });
});

app.listen(PORT, () => {
  console.log(`Ayushman Sathi API listening on http://localhost:${PORT}`);
});
