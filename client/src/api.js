const BASE = '/api';

async function request(path, options) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  const body = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(body?.error || `Request to ${path} failed (${res.status})`);
  }
  return body;
}

export const api = {
  getProfile: () => request('/profile'),

  getEligibilityQuestions: () => request('/eligibility/questions'),
  checkEligibility: (answers) => request('/eligibility/check', { method: 'POST', body: JSON.stringify({ answers }) }),

  getHospitals: () => request('/hospitals'),
  getHospital: (id) => request(`/hospitals/${id}`),
  getHospitalCost: (id, procedure) => request(`/hospitals/${id}/cost?procedure=${encodeURIComponent(procedure)}`),

  createCase: (lang) => request('/cases', { method: 'POST', body: JSON.stringify({ lang }) }),
  getCase: (id) => request(`/cases/${id}`),
  setCaseLang: (id, lang) => request(`/cases/${id}/lang`, { method: 'POST', body: JSON.stringify({ lang }) }),
  advanceCase: (id) => request(`/cases/${id}/advance`, { method: 'POST' }),

  getClaimRequirements: () => request('/claims/requirements'),
  getClaims: () => request('/claims'),
  submitClaim: (docs) => request('/claims', { method: 'POST', body: JSON.stringify({ docs }) }),

  getGrievanceOptions: () => request('/grievances/options'),
  fileGrievance: (optionId, details) => request('/grievances', { method: 'POST', body: JSON.stringify({ optionId, details }) })
};
