import React, { useState } from 'react';
import {
  Download,
  Image as ImageIcon,
  Printer,
  FileCode,
  X,
  Check,
  Loader2,
  Copy,
} from 'lucide-react';
import { toPng, toBlob } from 'html-to-image';
import confetti from 'canvas-confetti';
import type { JourneyMapData } from '../types/journey';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetRef: React.RefObject<HTMLDivElement | null>;
  journeyData: JourneyMapData;
  onLoadJourneyData: (data: JourneyMapData) => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  targetRef,
  journeyData,
  onLoadJourneyData,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });
  };

  // Export PNG (High-Res)
  const handleExportPng = async () => {
    if (!targetRef.current) return;
    try {
      setIsExporting(true);
      setStatusMessage('Erstelle hochauflösendes PNG...');

      const dataUrl = await toPng(targetRef.current, {
        pixelRatio: 2.5, // Crisp 2.5x retina quality
        backgroundColor: '#ffffff',
        filter: (node) => {
          return !node.classList?.contains('no-print');
        },
      });

      const link = document.createElement('a');
      link.download = `${journeyData.persona.name.toLowerCase().replace(/\s+/g, '-')}-journey-map.png`;
      link.href = dataUrl;
      link.click();

      triggerConfetti();
      setStatusMessage('Erfolgreich als PNG heruntergeladen!');
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err) {
      console.error('PNG export failed', err);
      setStatusMessage('Fehler beim PNG Export');
    } finally {
      setIsExporting(false);
    }
  };

  // Copy PNG to Clipboard
  const handleCopyPngToClipboard = async () => {
    if (!targetRef.current) return;
    try {
      setIsExporting(true);
      setStatusMessage('Kopiere Bild in die Zwischenablage...');

      const blob = await toBlob(targetRef.current, {
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        filter: (node) => !node.classList?.contains('no-print'),
      });

      if (blob && navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        setCopied(true);
        triggerConfetti();
        setStatusMessage('In die Zwischenablage kopiert! Bereit zum Einfügen.');
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (err) {
      console.error('Copy to clipboard failed', err);
      setStatusMessage('Kopieren nicht unterstützt oder fehlgeschlagen');
    } finally {
      setIsExporting(false);
    }
  };

  // Export Print / PDF
  const handlePrint = () => {
    onClose();
    setTimeout(() => {
      window.print();
    }, 200);
  };

  // Export JSON
  const handleExportJson = () => {
    const jsonStr = JSON.stringify(journeyData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${journeyData.persona.name.toLowerCase().replace(/\s+/g, '-')}-journey.json`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
    triggerConfetti();
  };

  // Import JSON
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed && parsed.stages && parsed.curvePoints) {
            onLoadJourneyData(parsed);
            onClose();
            triggerConfetti();
          } else {
            alert('Ungültiges Journey Map JSON-Format.');
          }
        } catch {
          alert('Fehler beim Lesen der JSON-Datei.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 no-print">
      <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 w-full max-w-lg p-6 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <Download className="text-stone-900" size={20} />
            <h3 className="text-lg font-bold text-stone-900">Journey Map exportieren</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-stone-800 transition"
          >
            <X size={20} />
          </button>
        </div>

        {statusMessage && (
          <div className="mt-3 p-3 bg-stone-100 text-stone-800 rounded-lg text-xs font-medium flex items-center gap-2">
            <Check size={14} className="text-emerald-600" />
            <span>{statusMessage}</span>
          </div>
        )}

        <div className="mt-5 space-y-3">
          {/* Export PNG */}
          <button
            type="button"
            disabled={isExporting}
            onClick={handleExportPng}
            className="w-full flex items-center justify-between p-4 rounded-xl border border-stone-200 hover:border-stone-900 hover:bg-stone-50 transition text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-stone-900 text-white flex items-center justify-center">
                {isExporting ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <ImageIcon size={20} />
                )}
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-900">
                  PNG Bild herunterladen (Retina 2.5x)
                </h4>
                <p className="text-xs text-stone-500">
                  Perfekt für Präsentationen, Figma, Miro, Notion oder Berichte
                </p>
              </div>
            </div>
            <Download
              size={18}
              className="text-stone-400 group-hover:text-stone-900 transition"
            />
          </button>

          {/* Copy PNG */}
          <button
            type="button"
            disabled={isExporting}
            onClick={handleCopyPngToClipboard}
            className="w-full flex items-center justify-between p-4 rounded-xl border border-stone-200 hover:border-stone-900 hover:bg-stone-50 transition text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center border border-stone-300">
                {copied ? (
                  <Check size={20} className="text-emerald-600" />
                ) : (
                  <Copy size={20} />
                )}
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-900">
                  In Zwischenablage kopieren
                </h4>
                <p className="text-xs text-stone-500">
                  Direkt mit Strg+V in Dokumente oder Chats einfügen
                </p>
              </div>
            </div>
            <Copy
              size={18}
              className="text-stone-400 group-hover:text-stone-900 transition"
            />
          </button>

          {/* Print / PDF */}
          <button
            type="button"
            onClick={handlePrint}
            className="w-full flex items-center justify-between p-4 rounded-xl border border-stone-200 hover:border-stone-900 hover:bg-stone-50 transition text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center border border-stone-300">
                <Printer size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-900">
                  Drucken / Als PDF speichern
                </h4>
                <p className="text-xs text-stone-500">
                  Optimiertes Querformat-Layout für Din-A4 / Letter
                </p>
              </div>
            </div>
            <Printer
              size={18}
              className="text-stone-400 group-hover:text-stone-900 transition"
            />
          </button>

          {/* JSON Backup & Share */}
          <div className="pt-2 border-t border-stone-200 flex gap-2">
            <button
              type="button"
              onClick={handleExportJson}
              className="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-xs font-semibold text-stone-700 transition"
            >
              <FileCode size={15} />
              <span>JSON sichern</span>
            </button>

            <label className="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-xs font-semibold text-stone-700 transition cursor-pointer">
              <FileCode size={15} />
              <span>JSON laden</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportJson}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-sm font-medium transition"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
