import { useEffect, useState } from 'react';
import { api } from './api.js';
import Header from './components/Header.jsx';
import TabBar from './components/TabBar.jsx';
import Home from './screens/Home.jsx';
import Eligibility from './screens/Eligibility.jsx';
import Cashless from './screens/Cashless.jsx';
import { CardsWallet, CardsQr } from './screens/Cards.jsx';
import { HospitalList, HospitalDetail, HospitalCost } from './screens/Hospitals.jsx';
import { HelpMenu, ClaimUpload, ClaimSent, ClaimHistory, GrievanceForm, GrievanceSent } from './screens/Help.jsx';

const ROOT_SCREENS = ['home', 'cardsWallet', 'hospList', 'helpMenu'];
const HEADER_MAP = {
  home: 'Ayushman Sathi', elig: 'Eligibility', eligResult: 'Eligibility',
  cardsWallet: 'Cards · Sunita Devi', cardsQr: 'Card',
  hospList: 'Hospitals nearby', hospDetail: 'Hospital', hospCost: 'Cost estimate',
  helpMenu: 'Help', claimUpload: 'Reimbursement', claimSent: 'Reimbursement', claimHistory: 'Claims',
  grievForm: 'Grievance', grievSent: 'Grievance'
};

export default function App() {
  const [screen, setScreen] = useState('home');
  const [notice, setNotice] = useState(null);

  const [profile, setProfile] = useState(null);
  const [hospitals, setHospitals] = useState(null);

  const [eligQuestions, setEligQuestions] = useState(null);
  const [eligIdx, setEligIdx] = useState(0);
  const [eligAnswers, setEligAnswers] = useState({});
  const [eligResult, setEligResult] = useState(null);
  const [eligLoading, setEligLoading] = useState(false);

  const [caseData, setCaseData] = useState(null);
  const [caseLoading, setCaseLoading] = useState(false);

  const [selHospitalId, setSelHospitalId] = useState(null);
  const [hospitalDetail, setHospitalDetail] = useState(null);
  const [hospitalDetailLoading, setHospitalDetailLoading] = useState(false);
  const [hospitalCost, setHospitalCost] = useState(null);
  const [hospitalCostLoading, setHospitalCostLoading] = useState(false);
  const [hospitalCostError, setHospitalCostError] = useState(null);

  const [claimRequirements, setClaimRequirements] = useState(null);
  const [checkedDocs, setCheckedDocs] = useState(new Set());
  const [claimSending, setClaimSending] = useState(false);
  const [claimError, setClaimError] = useState(null);
  const [claimResult, setClaimResult] = useState(null);
  const [claimHistory, setClaimHistory] = useState(null);

  const [grievanceOptions, setGrievanceOptions] = useState(null);
  const [selGrievanceId, setSelGrievanceId] = useState('pay');
  const [grievanceDetails, setGrievanceDetails] = useState('');
  const [grievanceSending, setGrievanceSending] = useState(false);
  const [grievanceError, setGrievanceError] = useState(null);
  const [grievanceResult, setGrievanceResult] = useState(null);

  async function safe(fn) {
    try {
      await fn();
    } catch (err) {
      setNotice(err.message || 'Something went wrong talking to the server.');
    }
  }

  useEffect(() => {
    safe(async () => setProfile(await api.getProfile()));
    safe(async () => setHospitals(await api.getHospitals()));
  }, []);

  function goHome() { setScreen('home'); }
  function goCards() { setScreen('cardsWallet'); }
  function goHospitals() { setScreen('hospList'); }
  function goHelp() { setScreen('helpMenu'); }

  function startEligibility() {
    setEligIdx(0);
    setEligAnswers({});
    setEligResult(null);
    setScreen('elig');
    if (!eligQuestions) safe(async () => setEligQuestions(await api.getEligibilityQuestions()));
  }

  function eligAnswer(value) {
    const question = eligQuestions[eligIdx];
    const answers = { ...eligAnswers, [question.id]: value };
    setEligAnswers(answers);
    if (eligIdx >= eligQuestions.length - 1) {
      setEligLoading(true);
      safe(async () => {
        const result = await api.checkEligibility(answers);
        setEligResult(result);
        setScreen('eligResult');
      }).finally(() => setEligLoading(false));
    } else {
      setEligIdx(eligIdx + 1);
    }
  }

  function startCashless() {
    setCaseLoading(true);
    setCaseData(null);
    setScreen('cashless');
    safe(async () => setCaseData(await api.createCase('en'))).finally(() => setCaseLoading(false));
  }

  function advanceCashless() {
    safe(async () => {
      const updated = await api.advanceCase(caseData.id);
      if (updated.done) {
        setScreen('home');
        setCaseData(null);
      } else {
        setCaseData(updated);
      }
    });
  }

  function setCashlessLang(lang) {
    safe(async () => setCaseData(await api.setCaseLang(caseData.id, lang)));
  }

  function openQr() { setScreen('cardsQr'); }

  function openHospital(id) {
    setSelHospitalId(id);
    setHospitalDetail(null);
    setHospitalDetailLoading(true);
    setScreen('hospDetail');
    safe(async () => setHospitalDetail(await api.getHospital(id))).finally(() => setHospitalDetailLoading(false));
  }

  function openCost() {
    setHospitalCost(null);
    setHospitalCostError(null);
    setHospitalCostLoading(true);
    setScreen('hospCost');
    safe(async () => {
      try {
        setHospitalCost(await api.getHospitalCost(selHospitalId, 'knee replacement'));
      } catch (err) {
        setHospitalCostError(err.message);
      }
    }).finally(() => setHospitalCostLoading(false));
  }

  function openClaimUpload() {
    setCheckedDocs(new Set());
    setClaimError(null);
    setScreen('claimUpload');
    if (!claimRequirements) safe(async () => setClaimRequirements(await api.getClaimRequirements()));
  }

  function toggleDoc(key) {
    setCheckedDocs((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  function sendClaim() {
    setClaimError(null);
    setClaimSending(true);
    safe(async () => {
      try {
        const claim = await api.submitClaim([...checkedDocs]);
        setClaimResult(claim);
        setScreen('claimSent');
      } catch (err) {
        setClaimError(err.message);
      }
    }).finally(() => setClaimSending(false));
  }

  function openClaimHistory() {
    setClaimHistory(null);
    setScreen('claimHistory');
    safe(async () => setClaimHistory(await api.getClaims()));
  }

  function openGrievanceForm() {
    setSelGrievanceId('pay');
    setGrievanceDetails('');
    setGrievanceError(null);
    setScreen('grievForm');
    if (!grievanceOptions) safe(async () => setGrievanceOptions(await api.getGrievanceOptions()));
  }

  function fileGrievance() {
    setGrievanceError(null);
    setGrievanceSending(true);
    safe(async () => {
      try {
        const grievance = await api.fileGrievance(selGrievanceId, grievanceDetails);
        setGrievanceResult(grievance);
        setScreen('grievSent');
      } catch (err) {
        setGrievanceError(err.message);
      }
    }).finally(() => setGrievanceSending(false));
  }

  function back() {
    switch (screen) {
      case 'hospDetail': setScreen('hospList'); return;
      case 'hospCost': setScreen('hospDetail'); return;
      case 'cardsQr': setScreen('cardsWallet'); return;
      case 'claimUpload': case 'grievForm': setScreen('helpMenu'); return;
      case 'claimSent': setScreen('claimUpload'); return;
      case 'claimHistory': setScreen('claimSent'); return;
      case 'grievSent': setScreen('grievForm'); return;
      case 'elig': case 'eligResult': setScreen('home'); return;
      default: setScreen('home');
    }
  }

  const isRoot = ROOT_SCREENS.includes(screen);
  const isCashless = screen === 'cashless';
  const lang = caseData?.lang || 'en';

  return (
    <div className="app-shell">
      <div className="app">
        <Header
          showBack={!isRoot && !isCashless}
          onBack={back}
          title={HEADER_MAP[screen] || 'Ayushman Sathi'}
          showLangSwitch={isCashless}
          lang={lang}
          onSetLang={setCashlessLang}
        />

        <main className="app-content">
          {notice ? <div className="error-note" onClick={() => setNotice(null)} style={{ cursor: 'pointer' }}>{notice} (tap to dismiss)</div> : null}

          {screen === 'home' && (
            <Home onStartCashless={startCashless} onStartEligibility={startEligibility} onGoHospitals={goHospitals} />
          )}
          {screen === 'elig' && (
            <Eligibility phase="question" question={eligQuestions?.[eligIdx]} qIndex={eligIdx} onAnswer={eligAnswer} loading={eligLoading} />
          )}
          {screen === 'eligResult' && (
            <Eligibility phase="result" result={eligResult} onIssueCards={goCards} loading={eligLoading} />
          )}
          {screen === 'cashless' && <Cashless caseData={caseData} loading={caseLoading} />}
          {screen === 'cardsWallet' && <CardsWallet profile={profile} onOpenQr={openQr} />}
          {screen === 'cardsQr' && <CardsQr profile={profile} />}
          {screen === 'hospList' && <HospitalList hospitals={hospitals} onOpenHospital={openHospital} />}
          {screen === 'hospDetail' && <HospitalDetail hospital={hospitalDetail} onOpenCost={openCost} loading={hospitalDetailLoading} />}
          {screen === 'hospCost' && <HospitalCost cost={hospitalCost} loading={hospitalCostLoading} error={hospitalCostError} />}
          {screen === 'helpMenu' && <HelpMenu onOpenClaimUpload={openClaimUpload} onOpenGrievanceForm={openGrievanceForm} />}
          {screen === 'claimUpload' && (
            <ClaimUpload requirements={claimRequirements} checked={checkedDocs} onToggle={toggleDoc} onSend={sendClaim} error={claimError} sending={claimSending} />
          )}
          {screen === 'claimSent' && <ClaimSent claim={claimResult} onOpenClaimHistory={openClaimHistory} />}
          {screen === 'claimHistory' && <ClaimHistory claims={claimHistory} />}
          {screen === 'grievForm' && (
            <GrievanceForm
              options={grievanceOptions}
              selectedId={selGrievanceId}
              onSelect={setSelGrievanceId}
              details={grievanceDetails}
              onDetailsChange={setGrievanceDetails}
              onFile={fileGrievance}
              error={grievanceError}
              sending={grievanceSending}
            />
          )}
          {screen === 'grievSent' && <GrievanceSent grievance={grievanceResult} onDone={goHelp} />}
        </main>

        {isCashless && caseData?.step ? (
          <div className="app-cta">
            <button className="btn btn-primary" onClick={advanceCashless}>{caseData.step.cta}</button>
          </div>
        ) : null}

        {isRoot ? (
          <TabBar
            active={screen === 'home' ? 'home' : screen === 'cardsWallet' ? 'cards' : screen === 'hospList' ? 'hospitals' : 'help'}
            onNavigate={(key) => ({ home: goHome, cards: goCards, hospitals: goHospitals, help: goHelp }[key]())}
          />
        ) : null}
      </div>
    </div>
  );
}
