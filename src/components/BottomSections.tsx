import React from 'react';
import type { BottomSection } from '../types/journey';
import { Plus, Trash2 } from 'lucide-react';

interface BottomSectionsProps {
  sections: BottomSection[];
  isEditMode: boolean;
  onSectionsChange: (updated: BottomSection[]) => void;
}

export const BottomSections: React.FC<BottomSectionsProps> = ({
  sections,
  isEditMode,
  onSectionsChange,
}) => {
  const handleTitleChange = (index: number, title: string) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], title };
    onSectionsChange(updated);
  };

  const handleItemChange = (sectionIndex: number, itemIndex: number, value: string) => {
    const updated = [...sections];
    const items = [...updated[sectionIndex].items];
    items[itemIndex] = value;
    updated[sectionIndex] = { ...updated[sectionIndex], items };
    onSectionsChange(updated);
  };

  const handleAddItem = (sectionIndex: number) => {
    const updated = [...sections];
    updated[sectionIndex] = {
      ...updated[sectionIndex],
      items: [...updated[sectionIndex].items, 'Neuer Punkt...'],
    };
    onSectionsChange(updated);
  };

  const handleDeleteItem = (sectionIndex: number, itemIndex: number) => {
    const updated = [...sections];
    updated[sectionIndex] = {
      ...updated[sectionIndex],
      items: updated[sectionIndex].items.filter((_, i) => i !== itemIndex),
    };
    onSectionsChange(updated);
  };

  const handleAddSection = () => {
    if (sections.length >= 4) return;
    const newSection: BottomSection = {
      id: `bs-${Date.now()}`,
      title: 'NEUER BEREICH',
      items: ['Punkt 1 eingeben...'],
    };
    onSectionsChange([...sections, newSection]);
  };

  const handleDeleteSection = (index: number) => {
    if (sections.length <= 1) return;
    onSectionsChange(sections.filter((_, i) => i !== index));
  };

  return (
    <div className="border-t-2 border-stone-900 bg-white">
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${sections.length}, 1fr)` }}
      >
        {sections.map((section, secIdx) => (
          <div
            key={section.id}
            className={`p-6 ${
              secIdx < sections.length - 1 ? 'border-r-2 border-stone-900' : ''
            }`}
          >
            {/* Section Title */}
            <div className="flex items-center justify-between mb-4 pb-1 border-b border-stone-100">
              {isEditMode ? (
                <div className="flex-1 flex items-center justify-between gap-2">
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => handleTitleChange(secIdx, e.target.value)}
                    className="text-base font-bold tracking-widest text-stone-950 uppercase border-b border-dashed border-stone-400 focus:border-stone-900 focus:outline-hidden bg-transparent flex-1"
                  />
                  {sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleDeleteSection(secIdx)}
                      className="p-1 text-stone-400 hover:text-red-600 transition"
                      title="Bereich löschen"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              ) : (
                <h3 className="text-base font-bold tracking-widest text-stone-950 uppercase">
                  {section.title}
                </h3>
              )}
            </div>

            {/* Bullet points */}
            <ul className="space-y-2 text-xs text-stone-700">
              {section.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start gap-2 group">
                  <span className="text-stone-900 font-bold select-none mt-0.5">•</span>
                  {isEditMode ? (
                    <div className="flex-1 flex items-center gap-1">
                      <textarea
                        value={item}
                        onChange={(e) =>
                          handleItemChange(secIdx, itemIdx, e.target.value)
                        }
                        rows={2}
                        className="flex-1 text-xs text-stone-700 border-b border-stone-200 focus:border-stone-900 focus:outline-hidden bg-transparent py-0.5 resize-y"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(secIdx, itemIdx)}
                        className="opacity-0 group-hover:opacity-100 text-stone-400 hover:text-red-600 transition p-0.5"
                        title="Punkt löschen"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ) : (
                    <span className="leading-relaxed font-normal">{item}</span>
                  )}
                </li>
              ))}
            </ul>

            {/* Add Bullet Button */}
            {isEditMode && (
              <div className="mt-4 pt-2">
                <button
                  type="button"
                  onClick={() => handleAddItem(secIdx)}
                  className="flex items-center gap-1 text-xs font-medium text-stone-500 hover:text-stone-900 px-2 py-1 rounded hover:bg-stone-50 border border-dashed border-stone-200 hover:border-stone-400 transition"
                >
                  <Plus size={12} />
                  <span>Punkt hinzufügen</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {isEditMode && sections.length < 4 && (
        <div className="p-3 border-t border-stone-100 flex justify-center bg-stone-50/50 no-print">
          <button
            type="button"
            onClick={handleAddSection}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 px-3 py-1.5 rounded-lg border border-dashed border-stone-300 hover:border-stone-600 transition"
          >
            <Plus size={14} />
            <span>Weiteren Bereich unten hinzufügen (+ Spalte)</span>
          </button>
        </div>
      )}
    </div>
  );
};
