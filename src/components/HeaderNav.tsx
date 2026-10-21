import React, { useState, useEffect } from 'react';
import {
  Edit3,
  Eye,
  Plus,
  MessageSquarePlus,
  Download,
  RotateCcw,
  Sparkles,
  Smartphone,
} from 'lucide-react';
import { EXAMPLE_JOURNEY, BLANK_JOURNEY } from '../data/defaultJourney';
import type { JourneyMapData } from '../types/journey';

interface HeaderNavProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
  onAddStage: () => void;
  onAddQuote: () => void;
  onLoadTemplate: (template: JourneyMapData) => void;
  onOpenExportModal: () => void;
  stagesCount: number;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  isEditMode,
  onToggleEditMode,
  onAddStage,
  onAddQuote,
  onLoadTemplate,
  onOpenExportModal,
  stagesCount,
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200 px-4 sm:px-8 py-3 no-print">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Left: Branding & Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-stone-900 text-white flex items-center justify-center font-black text-sm tracking-tighter shadow-xs">
            JM
          </div>
          <div>
            <h1 className="text-base font-bold text-stone-900 leading-tight">
              Customer Journey Map Creator
            </h1>
            <p className="text-[11px] text-stone-500 hidden sm:block">
              PWA & GitHub Pages Ready • Interaktive Motivationskurve
            </p>
          </div>
        </div>

        {/* Center: Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Mode Switcher */}
          <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
            <button
              type="button"
              onClick={onToggleEditMode}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                isEditMode
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <Edit3 size={14} />
              <span>Bearbeiten</span>
            </button>
            <button
              type="button"
              onClick={onToggleEditMode}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                !isEditMode
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <Eye size={14} />
              <span>Vorschau</span>
            </button>
          </div>

          {/* Quick Actions (only visible in edit mode) */}
          {isEditMode && (
            <>
              <button
                type="button"
                disabled={stagesCount >= 10}
                onClick={onAddStage}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-white rounded-xl text-xs font-semibold shadow-xs transition"
                title={
                  stagesCount >= 10
                    ? 'Maximal 10 Spalten erreicht'
                    : 'Neue Phase / Spalte hinzufügen'
                }
              >
                <Plus size={14} />
                <span>Spalte ({stagesCount}/10)</span>
              </button>

              <button
                type="button"
                onClick={onAddQuote}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold border border-stone-200 transition"
                title="Neues Zitat / Sprechblase zur Kurve hinzufügen"
              >
                <MessageSquarePlus size={14} />
                <span>Zitat</span>
              </button>
            </>
          )}
        </div>

        {/* Right: Templates, Export, PWA */}
        <div className="flex items-center gap-2">
          {/* Templates Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowTemplateMenu(!showTemplateMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-50 hover:bg-stone-100 text-stone-700 rounded-xl text-xs font-medium border border-stone-200 transition"
            >
              <RotateCcw size={13} />
              <span>Vorlagen</span>
            </button>

            {showTemplateMenu && (
              <div className="absolute right-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                <button
                  type="button"
                  onClick={() => {
                    onLoadTemplate(EXAMPLE_JOURNEY);
                    setShowTemplateMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-stone-50 flex items-center gap-2 text-stone-800"
                >
                  <Sparkles size={14} className="text-amber-500" />
                  <div>
                    <div className="font-semibold">Beispiel-Journey</div>
                    <div className="text-[10px] text-stone-400">Vollständige Vorlage</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onLoadTemplate(BLANK_JOURNEY);
                    setShowTemplateMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-stone-50 flex items-center gap-2 text-stone-800"
                >
                  <Plus size={14} className="text-stone-400" />
                  <div>
                    <div className="font-semibold">Leere Vorlage</div>
                    <div className="text-[10px] text-stone-400">Neu starten</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Export Button */}
          <button
            type="button"
            onClick={onOpenExportModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold shadow-xs transition"
          >
            <Download size={14} />
            <span>Export</span>
          </button>

          {/* PWA Install Button */}
          {isInstallable && (
            <button
              type="button"
              onClick={handleInstallClick}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition animate-pulse"
              title="Als eigenständige App auf PC oder Handy installieren"
            >
              <Smartphone size={14} />
              <span>Installieren</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
