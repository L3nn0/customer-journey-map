import React from 'react';
import type { JourneyStage, JourneyStep } from '../types/journey';
import {
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';

interface StageColumnsProps {
  stages: JourneyStage[];
  isEditMode: boolean;
  onStagesChange: (newStages: JourneyStage[]) => void;
  onAddStage: () => void;
}

export const StageColumns: React.FC<StageColumnsProps> = ({
  stages,
  isEditMode,
  onStagesChange,
  onAddStage,
}) => {
  // Title update
  const handleTitleChange = (index: number, newTitle: string) => {
    const updated = [...stages];
    updated[index] = { ...updated[index], title: newTitle };
    onStagesChange(updated);
  };

  // Move stage left
  const handleMoveStage = (fromIndex: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? fromIndex - 1 : fromIndex + 1;
    if (targetIndex < 0 || targetIndex >= stages.length) return;

    const updated = [...stages];
    const temp = updated[fromIndex];
    updated[fromIndex] = updated[targetIndex];
    updated[targetIndex] = temp;
    onStagesChange(updated);
  };

  // Delete stage
  const handleDeleteStage = (index: number) => {
    if (stages.length <= 2) return;
    const updated = stages.filter((_, i) => i !== index);
    onStagesChange(updated);
  };

  // Steps management
  const handleStepChange = (stageIndex: number, stepIndex: number, text: string) => {
    const updated = [...stages];
    const stage = { ...updated[stageIndex] };
    const steps = [...stage.steps];
    steps[stepIndex] = { ...steps[stepIndex], text };
    stage.steps = steps;
    updated[stageIndex] = stage;
    onStagesChange(updated);
  };

  const handleAddStep = (stageIndex: number) => {
    const updated = [...stages];
    const stage = { ...updated[stageIndex] };
    const newStep: JourneyStep = {
      id: `step-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      text: 'Neuer Schritt...',
    };
    stage.steps = [...stage.steps, newStep];
    updated[stageIndex] = stage;
    onStagesChange(updated);
  };

  const handleDeleteStep = (stageIndex: number, stepIndex: number) => {
    const updated = [...stages];
    const stage = { ...updated[stageIndex] };
    stage.steps = stage.steps.filter((_, i) => i !== stepIndex);
    updated[stageIndex] = stage;
    onStagesChange(updated);
  };

  const handleMoveStep = (stageIndex: number, stepIndex: number, direction: 'up' | 'down') => {
    const stage = { ...stages[stageIndex] };
    const targetIndex = direction === 'up' ? stepIndex - 1 : stepIndex + 1;
    if (targetIndex < 0 || targetIndex >= stage.steps.length) return;

    const steps = [...stage.steps];
    const temp = steps[stepIndex];
    steps[stepIndex] = steps[targetIndex];
    steps[targetIndex] = temp;
    stage.steps = steps;

    const updated = [...stages];
    updated[stageIndex] = stage;
    onStagesChange(updated);
  };

  // Compute global continuous numbering for steps across stages (just like in the reference image: 1, 2 in DEFINE, 3, 4, 5 in COMPARE, 6, 7 in NEGOTIATE, 8 in SELECT)
  let cumulativeStepCount = 0;
  const stageStepOffsets = stages.map((stage) => {
    const offset = cumulativeStepCount;
    cumulativeStepCount += stage.steps.length;
    return offset;
  });

  return (
    <div>
      {/* Stage Column Titles Header Bar */}
      <div
        className="grid border-b-2 border-stone-900 bg-white"
        style={{ gridTemplateColumns: `repeat(${stages.length}, 1fr)` }}
      >
        {stages.map((stage, idx) => (
          <div
            key={stage.id}
            className={`py-3 px-3 flex flex-col items-center justify-center text-center relative group ${
              idx < stages.length - 1 ? 'border-r-2 border-stone-900' : ''
            }`}
          >
            {isEditMode ? (
              <div className="w-full flex items-center justify-between gap-1">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => handleMoveStage(idx, 'left')}
                  className="p-1 text-stone-400 hover:text-stone-900 disabled:opacity-20 transition"
                  title="Spalte nach links"
                >
                  <ChevronLeft size={14} />
                </button>

                <input
                  type="text"
                  value={stage.title}
                  onChange={(e) => handleTitleChange(idx, e.target.value)}
                  className="text-base font-bold tracking-widest text-stone-950 uppercase text-center border-b border-dashed border-stone-400 focus:border-stone-900 focus:outline-hidden bg-transparent flex-1"
                />

                <div className="flex items-center">
                  <button
                    type="button"
                    disabled={idx === stages.length - 1}
                    onClick={() => handleMoveStage(idx, 'right')}
                    className="p-1 text-stone-400 hover:text-stone-900 disabled:opacity-20 transition"
                    title="Spalte nach rechts"
                  >
                    <ChevronRight size={14} />
                  </button>

                  {stages.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleDeleteStage(idx)}
                      className="p-1 text-stone-400 hover:text-red-600 transition"
                      title="Spalte löschen"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <h3 className="text-base font-bold tracking-widest text-stone-950 uppercase">
                {stage.title}
              </h3>
            )}
          </div>
        ))}
      </div>

      {/* Stage Steps Area */}
      <div
        className="grid bg-white"
        style={{ gridTemplateColumns: `repeat(${stages.length}, 1fr)` }}
      >
        {stages.map((stage, stageIdx) => {
          const stepOffset = stageStepOffsets[stageIdx];

          return (
            <div
              key={stage.id}
              className={`p-4 min-h-[170px] flex flex-col justify-between ${
                stageIdx < stages.length - 1 ? 'border-r-2 border-stone-900' : ''
              }`}
            >
              <div className="space-y-3">
                {stage.steps.map((step, stepIdx) => {
                  const globalStepNum = stepOffset + stepIdx + 1;

                  return (
                    <div
                      key={step.id}
                      className="group flex items-start gap-2 text-xs text-stone-800 leading-relaxed"
                    >
                      <span className="font-bold select-none text-stone-950 pt-0.5 shrink-0">
                        {globalStepNum}.
                      </span>

                      {isEditMode ? (
                        <div className="flex-1 flex flex-col gap-1">
                          <textarea
                            value={step.text}
                            onChange={(e) =>
                              handleStepChange(stageIdx, stepIdx, e.target.value)
                            }
                            rows={2}
                            className="w-full text-xs text-stone-800 border-b border-stone-200 focus:border-stone-900 focus:outline-hidden bg-transparent resize-y py-0.5"
                          />
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition text-stone-400">
                            <button
                              type="button"
                              disabled={stepIdx === 0}
                              onClick={() => handleMoveStep(stageIdx, stepIdx, 'up')}
                              className="p-0.5 hover:text-stone-700 disabled:opacity-20"
                              title="Nach oben"
                            >
                              <ArrowUp size={11} />
                            </button>
                            <button
                              type="button"
                              disabled={stepIdx === stage.steps.length - 1}
                              onClick={() => handleMoveStep(stageIdx, stepIdx, 'down')}
                              className="p-0.5 hover:text-stone-700 disabled:opacity-20"
                              title="Nach unten"
                            >
                              <ArrowDown size={11} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteStep(stageIdx, stepIdx)}
                              className="p-0.5 hover:text-red-600 ml-auto"
                              title="Schritt löschen"
                            >
                              <Trash2 size={11} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="font-medium text-stone-800">{step.text}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              {isEditMode && (
                <div className="pt-3 mt-3 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => handleAddStep(stageIdx)}
                    className="w-full flex items-center justify-center gap-1.5 py-1 text-xs font-medium text-stone-500 hover:text-stone-900 hover:bg-stone-50 rounded-md border border-dashed border-stone-200 hover:border-stone-400 transition"
                  >
                    <Plus size={13} />
                    <span>Schritt hinzufügen</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isEditMode && stages.length < 10 && (
        <div className="border-t border-stone-200 py-1.5 px-4 bg-stone-50/60 flex justify-end no-print">
          <button
            type="button"
            onClick={onAddStage}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-950 transition"
          >
            <Plus size={13} />
            <span>Phase hinzufügen ({stages.length}/10)</span>
          </button>
        </div>
      )}
    </div>
  );
};
