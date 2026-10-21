import React, { useState } from 'react';
import {
  User,
  Smile,
  Briefcase,
  Smartphone,
  ShoppingCart,
  GraduationCap,
  Sparkles,
  Heart,
  Plus,
  Trash2,
  Camera,
} from 'lucide-react';
import type { PersonaInfo } from '../types/journey';
import { AvatarPickerModal } from './AvatarPickerModal';

interface JourneyHeaderProps {
  persona: PersonaInfo;
  isEditMode: boolean;
  onChange: (updated: PersonaInfo) => void;
}

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
  user: User,
  smile: Smile,
  briefcase: Briefcase,
  smartphone: Smartphone,
  cart: ShoppingCart,
  academic: GraduationCap,
  sparkle: Sparkles,
  heart: Heart,
};

export const JourneyHeader: React.FC<JourneyHeaderProps> = ({
  persona,
  isEditMode,
  onChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const SelectedIcon = ICON_MAP[persona.avatarIcon || 'user'] || User;

  const handleNameChange = (val: string) => {
    onChange({ ...persona, name: val });
  };

  const handleScenarioChange = (val: string) => {
    onChange({ ...persona, scenario: val });
  };

  const handleExpectationsTitleChange = (val: string) => {
    onChange({ ...persona, expectationsTitle: val });
  };

  const handleExpectationItemChange = (index: number, val: string) => {
    const updated = [...persona.expectations];
    updated[index] = val;
    onChange({ ...persona, expectations: updated });
  };

  const handleAddExpectation = () => {
    onChange({
      ...persona,
      expectations: [...persona.expectations, 'Neue Erwartung eingeben...'],
    });
  };

  const handleDeleteExpectation = (index: number) => {
    onChange({
      ...persona,
      expectations: persona.expectations.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="border-b-2 border-stone-900 px-8 py-6 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Avatar + Persona + Scenario */}
        <div className="md:col-span-7 flex items-start gap-5">
          {/* Avatar circle */}
          <div className="relative group shrink-0">
            <button
              type="button"
              disabled={!isEditMode}
              onClick={() => setIsModalOpen(true)}
              className={`w-20 h-20 rounded-full border-2 border-stone-900 flex items-center justify-center bg-stone-50 overflow-hidden transition ${
                isEditMode
                  ? 'cursor-pointer hover:border-stone-700 hover:bg-stone-100 ring-2 ring-transparent hover:ring-stone-400'
                  : 'cursor-default'
              }`}
              title={isEditMode ? 'Klicke zum Ändern des Avatars' : undefined}
            >
              {persona.avatarType === 'customImage' && persona.avatarUrl ? (
                <img
                  src={persona.avatarUrl}
                  alt={persona.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <SelectedIcon size={42} strokeWidth={1.5} className="text-stone-900" />
              )}
            </button>
            {isEditMode && (
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="absolute -bottom-1 -right-1 bg-stone-900 text-white p-1.5 rounded-full shadow-md hover:bg-stone-700 transition"
                title="Avatar ändern"
              >
                <Camera size={12} />
              </button>
            )}
          </div>

          {/* Persona details */}
          <div className="flex-1 min-w-0">
            {isEditMode ? (
              <input
                type="text"
                value={persona.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="PERSONA NAME"
                className="w-full text-2xl font-bold tracking-wider text-stone-950 uppercase border-b border-dashed border-stone-400 focus:border-stone-900 focus:outline-hidden bg-transparent mb-1"
              />
            ) : (
              <h2 className="text-2xl font-bold tracking-wider text-stone-950 uppercase mb-1">
                {persona.name}
              </h2>
            )}

            {isEditMode ? (
              <textarea
                value={persona.scenario}
                onChange={(e) => handleScenarioChange(e.target.value)}
                placeholder="Szenario beschreiben..."
                rows={3}
                className="w-full text-sm text-stone-700 leading-relaxed border border-dashed border-stone-300 rounded-md p-2 focus:border-stone-900 focus:outline-hidden bg-stone-50/50 resize-y"
              />
            ) : (
              <p className="text-sm text-stone-700 leading-relaxed font-normal">
                {persona.scenario}
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Expectations */}
        <div className="md:col-span-5 md:pl-6 md:border-l border-stone-200">
          <div className="flex items-center justify-between mb-2">
            {isEditMode ? (
              <input
                type="text"
                value={persona.expectationsTitle}
                onChange={(e) => handleExpectationsTitleChange(e.target.value)}
                className="text-base font-bold tracking-wider text-stone-950 uppercase border-b border-dashed border-stone-400 focus:border-stone-900 focus:outline-hidden bg-transparent"
              />
            ) : (
              <h3 className="text-base font-bold tracking-wider text-stone-950 uppercase">
                {persona.expectationsTitle}
              </h3>
            )}

            {isEditMode && (
              <button
                type="button"
                onClick={handleAddExpectation}
                className="inline-flex items-center gap-1 text-xs font-medium text-stone-600 hover:text-stone-950 px-2 py-0.5 rounded-md hover:bg-stone-100 transition"
              >
                <Plus size={14} />
                <span>Punkt</span>
              </button>
            )}
          </div>

          <ul className="space-y-1.5 text-sm text-stone-700">
            {persona.expectations.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 group">
                <span className="text-stone-900 font-bold select-none mt-0.5">•</span>
                {isEditMode ? (
                  <div className="flex-1 flex items-center gap-1">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleExpectationItemChange(idx, e.target.value)}
                      className="flex-1 text-sm text-stone-700 border-b border-stone-200 focus:border-stone-900 focus:outline-hidden bg-transparent py-0.5"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteExpectation(idx)}
                      className="opacity-0 group-hover:opacity-100 text-stone-400 hover:text-red-600 transition p-0.5"
                      title="Löschen"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ) : (
                  <span className="leading-snug">{item}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <AvatarPickerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentIcon={persona.avatarIcon}
        avatarUrl={persona.avatarUrl}
        avatarType={persona.avatarType}
        onSelectIcon={(icon) =>
          onChange({
            ...persona,
            avatarIcon: icon,
            avatarType: 'icon',
          })
        }
        onUploadImage={(url) =>
          onChange({
            ...persona,
            avatarUrl: url,
            avatarType: 'customImage',
          })
        }
      />
    </div>
  );
};
