import type { JourneyMapData } from '../types/journey';

export const EXAMPLE_JOURNEY: JourneyMapData = {
  id: 'example-saas-journey',
  title: 'Customer Journey Map',
  persona: {
    name: 'ALEX RIVERA',
    scenario:
      'Szenario: Alex sucht nach einer modernen Softwarelösung für sein Team, um manuelle Arbeitsabläufe zu automatisieren und die Produktivität nachhaltig zu steigern.',
    avatarType: 'icon',
    avatarIcon: 'user',
    expectationsTitle: 'ERWARTUNGEN',
    expectations: [
      'Transparente Preismodelle ohne versteckte Kosten',
      'Intuitive Benutzeroberfläche und schnelle Einrichtung',
      'Kompetenter und reaktionsschneller Kundensupport',
    ],
  },
  stages: [
    {
      id: 'stage-1',
      title: 'ENTDECKEN',
      steps: [
        { id: 's1-1', text: 'Engpässe im aktuellen Arbeitsablauf erkennen' },
        { id: 's1-2', text: 'Anforderungen und Kriterien im Team definieren' },
      ],
    },
    {
      id: 'stage-2',
      title: 'VERGLEICHEN',
      steps: [
        { id: 's2-1', text: 'Online nach führenden Software-Lösungen suchen' },
        {
          id: 's2-2',
          text: 'Feature-Listen, Bewertungen und Testberichte analysieren',
        },
        {
          id: 's2-3',
          text: 'Kostenlose Testversion starten und erste Tests durchführen',
        },
      ],
    },
    {
      id: 'stage-3',
      title: 'ENTSCHEIDEN',
      steps: [
        {
          id: 's3-1',
          text: 'Budget und Lizenzoptionen mit dem Management abstimmen',
        },
        { id: 's3-2', text: 'Passenden Tarif auswählen und Vertrag abschließen' },
      ],
    },
    {
      id: 'stage-4',
      title: 'NUTZEN',
      steps: [
        {
          id: 's4-1',
          text: 'Team einladen, Onboarding durchlaufen und Tool produktiv nutzen',
        },
      ],
    },
  ],
  curvePoints: [
    { id: 'cp-0', xPercent: 0, yPercent: 55 },
    { id: 'cp-1', xPercent: 12, yPercent: 35 },
    { id: 'cp-2', xPercent: 23, yPercent: 62 },
    { id: 'cp-3', xPercent: 36, yPercent: 57 },
    { id: 'cp-4', xPercent: 50, yPercent: 68 },
    { id: 'cp-5', xPercent: 62, yPercent: 77 },
    { id: 'cp-6', xPercent: 75, yPercent: 65 },
    { id: 'cp-7', xPercent: 88, yPercent: 44 },
    { id: 'cp-8', xPercent: 100, yPercent: 32 },
  ],
  quotes: [
    {
      id: 'q-1',
      text: '„Gibt es dafür nicht eine einfachere Software?“',
      xPercent: 12,
      yPercent: 23,
      tailDirection: 'down',
    },
    {
      id: 'q-2',
      text: '„Die Feature-Übersicht sieht auf den ersten Blick super aus.“',
      xPercent: 23,
      yPercent: 72,
      tailDirection: 'up',
    },
    {
      id: 'q-3',
      text: '„Die Preisstaffelung ist für Teams leider etwas unübersichtlich.“',
      xPercent: 46,
      yPercent: 82,
      tailDirection: 'up',
    },
    {
      id: 'q-4',
      text: '„Der Checkout-Prozess war schnell und unkompliziert.“',
      xPercent: 63,
      yPercent: 60,
      tailDirection: 'down',
    },
    {
      id: 'q-5',
      text: '„Die Einführung hat sich gelohnt, wir sparen jede Woche Zeit!“',
      xPercent: 83,
      yPercent: 46,
      tailDirection: 'down',
    },
  ],
  bottomSections: [
    {
      id: 'bs-1',
      title: 'CHANCEN & POTENZIALE (OPPORTUNITIES)',
      items: [
        'Transparente Feature-Matrix und ROI-Rechner auf der Website anbieten',
        'Interaktive Produkttour während der ersten Testphase einblenden',
        'Persönlichen Onboarding-Call für Team-Accounts bereitstellen',
      ],
    },
    {
      id: 'bs-2',
      title: 'VERANTWORTLICHKEITEN & METRIKEN',
      items: [
        'Product Team: Drop-off Rate im Onboarding-Prozess um 20% senken',
        'Marketing Team: Conversion-Rate von Free-Trial zu Paid optimieren',
        'Support Team: Durchschnittliche Antwortzeit unter 3 Minuten halten',
      ],
    },
  ],
  settings: {
    theme: 'classic-mono',
    showCurveBaseline: true,
    showEmotionLabels: false,
    showStepNumbers: true,
    curveStrokeWidth: 2.5,
  },
};

export const BLANK_JOURNEY: JourneyMapData = {
  id: 'new-journey-map',
  title: 'Neue Customer Journey Map',
  persona: {
    name: 'PERSONA NAME',
    scenario: 'Szenario: Beschreibe hier das Ziel und den Kontext des Nutzers...',
    avatarType: 'icon',
    avatarIcon: 'user',
    expectationsTitle: 'ERWARTUNGEN',
    expectations: [
      'Schneller, unkomplizierter Ablauf',
      'Transparente Informationen',
      'Zuverlässiger Support bei Rückfragen',
    ],
  },
  stages: [
    {
      id: 'stage-1',
      title: 'PHASE 1',
      steps: [
        { id: 's1-1', text: 'Erster Berührungspunkt' },
        { id: 's1-2', text: 'Problem oder Bedarf erkennen' },
      ],
    },
    {
      id: 'stage-2',
      title: 'PHASE 2',
      steps: [
        { id: 's2-1', text: 'Optionen miteinander vergleichen' },
        { id: 's2-2', text: 'Bewertungen und Informationen prüfen' },
      ],
    },
    {
      id: 'stage-3',
      title: 'PHASE 3',
      steps: [
        { id: 's3-1', text: 'Entscheidung treffen' },
        { id: 's3-2', text: 'Aktion oder Kauf durchführen' },
      ],
    },
    {
      id: 'stage-4',
      title: 'PHASE 4',
      steps: [
        { id: 's4-1', text: 'Produkt / Service im Alltag nutzen' },
      ],
    },
  ],
  curvePoints: [
    { id: 'cp-0', xPercent: 0, yPercent: 50 },
    { id: 'cp-1', xPercent: 20, yPercent: 35 },
    { id: 'cp-2', xPercent: 50, yPercent: 65 },
    { id: 'cp-3', xPercent: 80, yPercent: 40 },
    { id: 'cp-4', xPercent: 100, yPercent: 25 },
  ],
  quotes: [
    {
      id: 'q-1',
      text: '„Das klingt genau nach dem, was ich brauche.“',
      xPercent: 20,
      yPercent: 22,
      tailDirection: 'down',
    },
    {
      id: 'q-2',
      text: '„Hier fehlt mir noch eine klare Übersicht.“',
      xPercent: 50,
      yPercent: 78,
      tailDirection: 'up',
    },
    {
      id: 'q-3',
      text: '„Super einfach eingerichtet!“',
      xPercent: 85,
      yPercent: 28,
      tailDirection: 'down',
    },
  ],
  bottomSections: [
    {
      id: 'bs-1',
      title: 'CHANCEN & OPPORTUNITIES',
      items: [
        'Transparente Übersichten bereitstellen',
        'Onboarding mit interaktivem Guide vereinfachen',
      ],
    },
    {
      id: 'bs-2',
      title: 'METRIKEN & VERANTWORTLICHKEITEN',
      items: [
        'UX Team: Benutzerfreundlichkeit an kritischen Touchpoints steigern',
        'Support Team: Zufriedenheitsrate (CSAT) über 90% halten',
      ],
    },
  ],
  settings: {
    theme: 'classic-mono',
    showCurveBaseline: true,
    showEmotionLabels: false,
    showStepNumbers: true,
    curveStrokeWidth: 2.5,
  },
};

const STORAGE_KEY = 'customer_journey_map_data_v2';

export function loadJourneyFromStorage(): JourneyMapData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.stages && parsed.curvePoints) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading saved journey from localStorage', e);
  }
  return EXAMPLE_JOURNEY;
}

export function saveJourneyToStorage(data: JourneyMapData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving journey to localStorage', e);
  }
}
