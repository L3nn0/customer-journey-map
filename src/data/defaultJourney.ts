import type { JourneyMapData } from '../types/journey';

export const EXAMPLE_JOURNEY: JourneyMapData = {
  id: 'example-jumping-jamie',
  title: 'Customer Journey Map Example',
  persona: {
    name: 'JUMPING JAMIE',
    scenario:
      'Scenario: Jamie needs to switch her current mobile plan. She wants a plan that can save her money without having to sacrifice usage limits.',
    avatarType: 'icon',
    avatarIcon: 'user',
    expectationsTitle: 'EXPECTATIONS',
    expectations: [
      'Clear online information',
      'Ability to compare plan breakdowns',
      'Friendly and helpful customer support',
    ],
  },
  stages: [
    {
      id: 'stage-1',
      title: 'DEFINE',
      steps: [
        { id: 's1-1', text: 'Review current plan' },
        { id: 's1-2', text: 'Define parameters for new plan' },
      ],
    },
    {
      id: 'stage-2',
      title: 'COMPARE',
      steps: [
        { id: 's2-1', text: 'Watches commercial on TV' },
        {
          id: 's2-2',
          text: 'Researches companies and offers on consumer reports website',
        },
        {
          id: 's2-3',
          text: 'Uses current carrier website tool to compare options',
        },
      ],
    },
    {
      id: 'stage-3',
      title: 'NEGOTIATE',
      steps: [
        {
          id: 's3-1',
          text: 'Calls current carrier to tell them she is shopping around',
        },
        { id: 's3-2', text: 'Calls competitors to see what they can offer' },
      ],
    },
    {
      id: 'stage-4',
      title: 'SELECT',
      steps: [
        {
          id: 's4-1',
          text: 'Decides on a new plan and calls customer service to switch service',
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
      text: '“I wonder if I can pay less.”',
      xPercent: 12,
      yPercent: 23,
      tailDirection: 'down',
    },
    {
      id: 'q-2',
      text: '“That offer seems like a better deal.”',
      xPercent: 23,
      yPercent: 72,
      tailDirection: 'up',
    },
    {
      id: 'q-3',
      text: '“Ugh, why is this so difficult?!”',
      xPercent: 46,
      yPercent: 82,
      tailDirection: 'up',
    },
    {
      id: 'q-4',
      text: '“Over it. I’m switch-ing providers.”',
      xPercent: 63,
      yPercent: 60,
      tailDirection: 'down',
    },
    {
      id: 'q-5',
      text: '“Well, I guess that was all worth it.”',
      xPercent: 83,
      yPercent: 46,
      tailDirection: 'down',
    },
  ],
  bottomSections: [
    {
      id: 'bs-1',
      title: 'OPPORTUNITIES',
      items: [
        'Compare alternate companies’ offers for her',
        'Breakdown current plan into $ amounts',
        'Customer support via text messaging/chat',
      ],
    },
    {
      id: 'bs-2',
      title: 'INTERNAL OWNERSHIP + METRICS',
      items: [
        'Customer Support Team: reduce average call time to 2 minutes',
        'Web Team: add funtionality to allow Jamie to compare plans within our site',
        'Marketing Team: track competing offers to create competitor database',
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
      title: 'ENTDECKEN',
      steps: [
        { id: 's1-1', text: 'Problem erkennen' },
        { id: 's1-2', text: 'Erste Recherche durchführen' },
      ],
    },
    {
      id: 'stage-2',
      title: 'EVALUIEREN',
      steps: [
        { id: 's2-1', text: 'Optionen miteinander vergleichen' },
        { id: 's2-2', text: 'Reviews und Feedback prüfen' },
      ],
    },
    {
      id: 'stage-3',
      title: 'ENTSCHEIDEN',
      steps: [
        { id: 's3-1', text: 'Auswahl treffen' },
        { id: 's3-2', text: 'Kauf- / Buchungsprozess starten' },
      ],
    },
    {
      id: 'stage-4',
      title: 'NUTZEN',
      steps: [
        { id: 's4-1', text: 'Erstes Onboarding durchlaufen' },
        { id: 's4-2', text: 'Produkt im Alltag verwenden' },
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
      text: '“Das klingt genau nach dem, was ich brauche.”',
      xPercent: 20,
      yPercent: 22,
      tailDirection: 'down',
    },
    {
      id: 'q-2',
      text: '“Hier fehlt mir noch eine klare Übersicht.”',
      xPercent: 50,
      yPercent: 78,
      tailDirection: 'up',
    },
    {
      id: 'q-3',
      text: '“Super einfach eingerichtet!”',
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
        'Transparente Preisvergleiche anbieten',
        'Onboarding mit interaktivem Guide vereinfachen',
      ],
    },
    {
      id: 'bs-2',
      title: 'METRIKEN & VERANTWORTLICHKEITEN',
      items: [
        'UX Team: Drop-off Rate im Funnel um 15% senken',
        'Support Team: Antwortzeit unter 5 Minuten halten',
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

const STORAGE_KEY = 'customer_journey_map_data_v1';

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
