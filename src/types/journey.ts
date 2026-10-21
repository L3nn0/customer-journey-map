export interface JourneyStep {
  id: string;
  text: string;
}

export interface JourneyStage {
  id: string;
  title: string;
  steps: JourneyStep[];
}

export interface CurvePoint {
  id: string;
  xPercent: number; // 0 to 100% across the whole stages width
  yPercent: number; // 0 (very high motivation / delighted) to 100 (very low / frustrated)
}

export interface QuoteBubble {
  id: string;
  text: string;
  xPercent: number; // 0 to 100%
  yPercent: number; // 0 to 100%
  tailDirection: 'down' | 'up';
}

export interface BottomSection {
  id: string;
  title: string;
  items: string[];
}

export interface PersonaInfo {
  name: string;
  scenario: string;
  avatarType: 'icon' | 'customImage';
  avatarUrl?: string;
  avatarIcon?: string;
  expectationsTitle: string;
  expectations: string[];
}

export interface JourneyMapData {
  id: string;
  title: string;
  persona: PersonaInfo;
  stages: JourneyStage[];
  curvePoints: CurvePoint[];
  quotes: QuoteBubble[];
  bottomSections: BottomSection[];
  settings: {
    theme: 'classic-mono' | 'modern-accent';
    showCurveBaseline: boolean;
    showEmotionLabels: boolean;
    showStepNumbers: boolean;
    curveStrokeWidth: number;
  };
}
