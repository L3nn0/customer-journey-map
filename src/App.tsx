import React, { useState, useRef, useEffect } from 'react';
import type {
  JourneyMapData,
  PersonaInfo,
  JourneyStage,
  CurvePoint,
  QuoteBubble,
  BottomSection,
} from './types/journey';
import {
  loadJourneyFromStorage,
  saveJourneyToStorage,
} from './data/defaultJourney';
import { HeaderNav } from './components/HeaderNav';
import { JourneyHeader } from './components/JourneyHeader';
import { StageColumns } from './components/StageColumns';
import { MotivationCanvas } from './components/MotivationCanvas';
import { BottomSections } from './components/BottomSections';
import { ExportModal } from './components/ExportModal';

export const App: React.FC = () => {
  const [journeyData, setJourneyData] = useState<JourneyMapData>(() =>
    loadJourneyFromStorage()
  );
  const [isEditMode, setIsEditMode] = useState<boolean>(true);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  const boardRef = useRef<HTMLDivElement>(null);

  // Auto-save to localStorage whenever journeyData changes
  useEffect(() => {
    saveJourneyToStorage(journeyData);
  }, [journeyData]);

  // Persona update
  const handlePersonaChange = (newPersona: PersonaInfo) => {
    setJourneyData((prev) => ({ ...prev, persona: newPersona }));
  };

  // Title update
  const handleTitleChange = (newTitle: string) => {
    setJourneyData((prev) => ({ ...prev, title: newTitle }));
  };

  // Stages update
  const handleStagesChange = (newStages: JourneyStage[]) => {
    setJourneyData((prev) => ({ ...prev, stages: newStages }));
  };

  // Add stage
  const handleAddStage = () => {
    if (journeyData.stages.length >= 10) return;
    const newStageIndex = journeyData.stages.length + 1;
    const newStage: JourneyStage = {
      id: `stage-${Date.now()}`,
      title: `PHASE ${newStageIndex}`,
      steps: [
        {
          id: `step-${Date.now()}-1`,
          text: 'Aktion oder Berührungspunkt eingeben',
        },
      ],
    };

    setJourneyData((prev) => ({
      ...prev,
      stages: [...prev.stages, newStage],
    }));
  };

  // Curve points update
  const handleCurveChange = (newPoints: CurvePoint[]) => {
    setJourneyData((prev) => ({ ...prev, curvePoints: newPoints }));
  };

  // Quotes update
  const handleQuotesChange = (newQuotes: QuoteBubble[]) => {
    setJourneyData((prev) => ({ ...prev, quotes: newQuotes }));
  };

  // Add a new quote bubble
  const handleAddQuote = () => {
    const newQuote: QuoteBubble = {
      id: `q-${Date.now()}`,
      text: '“Hier neues Zitat oder Nutzerkommentar eingeben”',
      xPercent: 50,
      yPercent: 45,
      tailDirection: 'down',
    };
    setJourneyData((prev) => ({
      ...prev,
      quotes: [...prev.quotes, newQuote],
    }));
  };

  // Bottom sections update
  const handleBottomSectionsChange = (updated: BottomSection[]) => {
    setJourneyData((prev) => ({ ...prev, bottomSections: updated }));
  };

  // Load a complete template
  const handleLoadTemplate = (template: JourneyMapData) => {
    setJourneyData(template);
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col text-stone-900">
      {/* Top Navigation & Toolbar */}
      <HeaderNav
        isEditMode={isEditMode}
        onToggleEditMode={() => setIsEditMode(!isEditMode)}
        onAddStage={handleAddStage}
        onAddQuote={handleAddQuote}
        onLoadTemplate={handleLoadTemplate}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        stagesCount={journeyData.stages.length}
      />

      {/* Main Board Viewport */}
      <main className="flex-1 overflow-x-auto p-4 sm:p-8 flex items-start justify-center">
        <div className="w-full max-w-[1240px] flex flex-col items-center">
          {/* Main Map Title */}
          <div className="w-full mb-4 flex items-center justify-between">
            {isEditMode ? (
              <input
                type="text"
                value={journeyData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Customer Journey Map Example"
                className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 border-b-2 border-dashed border-stone-300 focus:border-stone-900 focus:outline-hidden bg-transparent py-1 px-1"
              />
            ) : (
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
                {journeyData.title}
              </h2>
            )}

            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 no-print">
              {journeyData.stages.length} Phasen
            </span>
          </div>

          {/* THE JOURNEY BOARD (Matching the uploaded image reference!) */}
          <div
            ref={boardRef}
            className="print-container w-full bg-white border-2 border-stone-900 shadow-xl rounded-none transition-all duration-150 overflow-hidden"
            style={{ minWidth: '960px' }}
          >
            {/* Header Persona Block */}
            <JourneyHeader
              persona={journeyData.persona}
              isEditMode={isEditMode}
              onChange={handlePersonaChange}
            />

            {/* Stage Columns & Steps */}
            <StageColumns
              stages={journeyData.stages}
              isEditMode={isEditMode}
              onStagesChange={handleStagesChange}
              onAddStage={handleAddStage}
            />

            {/* Motivation / Emotion Curve & Quote Bubbles */}
            <MotivationCanvas
              curvePoints={journeyData.curvePoints}
              quotes={journeyData.quotes}
              stagesCount={journeyData.stages.length}
              isEditMode={isEditMode}
              onCurveChange={handleCurveChange}
              onQuotesChange={handleQuotesChange}
            />

            {/* Bottom Sections (Opportunities, Metrics, etc.) */}
            <BottomSections
              sections={journeyData.bottomSections}
              isEditMode={isEditMode}
              onSectionsChange={handleBottomSectionsChange}
            />
          </div>

          {/* Quick tips footer */}
          <footer className="mt-8 mb-4 text-center text-xs text-stone-400 no-print flex flex-col sm:flex-row items-center justify-center gap-3">
            <span>Customer Journey Map Editor • Offline PWA</span>
            <span>•</span>
            <span>Speichert automatisch im Browser (LocalStorage)</span>
            <span>•</span>
            <span>Optimiert für A4 Querformat Druck & PNG Export</span>
          </footer>
        </div>
      </main>

      {/* Export & Share Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        targetRef={boardRef}
        journeyData={journeyData}
        onLoadJourneyData={handleLoadTemplate}
      />
    </div>
  );
};

export default App;
