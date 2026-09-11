// In-memory seed data and mutable stores for the Ayushman Sathi demo API.
// A real deployment would replace this module with a database layer.

export const profile = {
  name: 'Sunita Devi',
  cardNumber: 'P0 2314 8877 09',
  abha: {
    id: '91-7734-2210-8845',
    handle: 'sunita.devi@abdm',
    linkedRecords: 12
  },
  privateCover: {
    policy: '4471-99',
    sumInsured: 300000
  },
  schemes: [
    { id: 'pmjay', name: 'PM-JAY', status: 'confirmed', cover: 500000, desc: 'Cashless at 30,000+ hospitals' },
    { id: 'pmjay70', name: 'PM-JAY 70+', status: 'apply', cover: 500000, desc: "Separate cover for your father-in-law, 74" },
    { id: 'mjpjay', name: 'MJPJAY top-up', status: 'automatic', cover: null, desc: 'State cover, added on the same card' }
  ]
};

export const eligibilityQuestions = [
  { id: 'age70', text: 'Is anyone in the house 70 or older?', help: 'Since 2024 everyone aged 70+ gets ₹5 lakh cover regardless of income.' },
  { id: 'bpl', text: 'Does your ration card show as BPL or priority?', help: 'This is the fastest path to automatic PM-JAY eligibility.' },
  { id: 'govtJob', text: 'Does anyone in the family work a government job?', help: 'That usually means CGHS instead of, not in addition to, PM-JAY.' }
];

export const hospitals = [
  { id: 'apex', name: 'Apex Heart Institute', dist: '2.4 km', sub: 'Private · PM-JAY + MJPJAY · cardiac, ICU', schemes: ['PM-JAY', 'MJPJAY', 'Cashless TPA'], mitraDesk: 'Ground floor, 24h', refusals90d: 0 },
  { id: 'civil', name: 'Civil Hospital, Nashik', dist: '4.1 km', sub: 'Government · all schemes · general, trauma', schemes: ['PM-JAY', 'MJPJAY', 'Cashless TPA'], mitraDesk: 'Reception block A, 24h', refusals90d: 0 },
  { id: 'shree', name: 'Shree Multispeciality', dist: '5.8 km', sub: 'Private · PM-JAY · orthopaedics', schemes: ['PM-JAY'], mitraDesk: 'First floor, 8am-8pm', refusals90d: 1 },
  { id: 'godavari', name: 'Godavari Nursing Home', dist: '7.2 km', sub: 'Private · MJPJAY only · maternity', schemes: ['MJPJAY'], mitraDesk: 'Ground floor, 24h', refusals90d: 0 }
];

export const procedurePackages = {
  'knee replacement': { code: 'PJ-OR-19', title: 'Total knee replacement, unilateral', rate: 80000, covered: 80000 },
  'coronary angioplasty': { code: 'PJ-CV-07', title: 'Coronary angioplasty, single stent', rate: 100000, covered: 100000 }
};

export const cashlessSteps = [
  { key: 'qr', en: { title: 'Show this at the Mitra desk', body: 'The Ayushman Mitra scans it and opens your case. Works without network.', cta: 'Desk has scanned it' },
    hi: { title: 'मित्र डेस्क पर यह दिखाएं', body: 'आयुष्मान मित्र इसे स्कैन करके आपका केस खोलेंगे।', cta: 'डेस्क ने स्कैन कर लिया' } },
  { key: 'package', en: { title: 'This is the treatment on file', body: 'Check the name with the doctor. The rate is fixed by the scheme, not by the hospital.', cta: 'Yes, this is right' },
    hi: { title: 'फ़ाइल में यही इलाज दर्ज है', body: 'नाम डॉक्टर से मिला लें। दर योजना तय करती है।', cta: 'हाँ, यह सही है' } },
  { key: 'timeline', en: { title: 'Sent for approval', body: 'Treatment that cannot wait starts now. You will get an SMS when the decision arrives.', cta: 'See the decision' },
    hi: { title: 'मंज़ूरी के लिए भेजा गया', body: 'फैसला आने पर एसएमएस मिलेगा।', cta: 'फैसला देखें' } },
  { key: 'approved', en: { title: 'Approved. You pay nothing.', body: 'If anyone asks you for cash, a deposit or medicine money, refuse and report it.', cta: 'Continue to discharge' },
    hi: { title: 'मंज़ूर। आपको कुछ नहीं देना।', body: 'नकद या जमा माँगे तो मना करें और शिकायत करें।', cta: 'छुट्टी की ओर बढ़ें' } },
  { key: 'discharge', en: { title: 'Discharged, bill settled', body: 'The hospital was paid directly. Your records are now in your ABHA account.', cta: 'Finish' },
    hi: { title: 'छुट्टी, बिल चुकता', body: 'अस्पताल को सीधे भुगतान हुआ।', cta: 'समाप्त' } }
];

export const grievanceOptions = [
  { id: 'pay', title: 'They asked me to pay', sub: 'Cash, deposit, medicines or tests' },
  { id: 'refuse', title: 'They refused my card', sub: 'Said the scheme is not accepted' },
  { id: 'stuck', title: 'Pre-auth is stuck', sub: 'No decision for more than a day' }
];

export const claimDocRequirements = [
  { key: 'bill', name: 'Final hospital bill' },
  { key: 'discharge', name: 'Discharge summary' },
  { key: 'receipts', name: 'Payment receipts' },
  { key: 'passbook', name: 'Bank passbook page' }
];

// Mutable, in-memory stores — reset whenever the server restarts.
export const cases = new Map();
export const claims = new Map([
  ['CLM-30112', { reference: 'CLM-30112', label: 'Cataract · Ramesh', date: '2025-03-14', scheme: 'PM-JAY 70+', amountPaid: 16000, status: 'paid' }],
  ['CLM-20874', { reference: 'CLM-20874', label: 'Delivery · Sunita', date: '2023-07-02', scheme: 'MJPJAY', amountPaid: 22000, status: 'paid' }]
]);
export const grievances = new Map();

let caseSeq = 88231;
let claimSeq = 88231;
let grievanceSeq = 40217;

export function nextCaseId() { return `CASE-${++caseSeq}`; }
export function nextClaimRef() { return `CLM-${++claimSeq}`; }
export function nextGrievanceRef() { return `GRV-${++grievanceSeq}`; }
