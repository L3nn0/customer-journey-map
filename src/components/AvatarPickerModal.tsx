import React, { useRef } from 'react';
import {
  User,
  Smile,
  Briefcase,
  Smartphone,
  ShoppingCart,
  GraduationCap,
  Sparkles,
  Upload,
  X,
  Heart,
} from 'lucide-react';

interface AvatarPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentIcon?: string;
  avatarUrl?: string;
  avatarType: 'icon' | 'customImage';
  onSelectIcon: (iconName: string) => void;
  onUploadImage: (dataUrl: string) => void;
}

const AVAILABLE_ICONS = [
  { name: 'user', label: 'Person', Icon: User },
  { name: 'smile', label: 'Freundlich', Icon: Smile },
  { name: 'briefcase', label: 'Business', Icon: Briefcase },
  { name: 'smartphone', label: 'Mobile', Icon: Smartphone },
  { name: 'cart', label: 'Shopper', Icon: ShoppingCart },
  { name: 'academic', label: 'Student', Icon: GraduationCap },
  { name: 'sparkle', label: 'VIP', Icon: Sparkles },
  { name: 'heart', label: 'Liebhaber', Icon: Heart },
];

export const AvatarPickerModal: React.FC<AvatarPickerModalProps> = ({
  isOpen,
  onClose,
  currentIcon = 'user',
  avatarUrl,
  avatarType,
  onSelectIcon,
  onUploadImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onUploadImage(reader.result);
          onClose();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <h3 className="text-lg font-bold text-stone-900">Persona Avatar anpassen</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-stone-800 transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-5 space-y-6">
          {/* Preset Icons */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
              Symbol auswählen
            </label>
            <div className="grid grid-cols-4 gap-3">
              {AVAILABLE_ICONS.map(({ name, label, Icon }) => {
                const isSelected = avatarType === 'icon' && currentIcon === name;
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => {
                      onSelectIcon(name);
                      onClose();
                    }}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition ${
                      isSelected
                        ? 'border-stone-900 bg-stone-100 text-stone-900 shadow-xs'
                        : 'border-stone-200 hover:border-stone-400 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <Icon size={26} strokeWidth={1.75} />
                    <span className="text-[11px] font-medium mt-1.5">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Image Upload */}
          <div className="pt-2 border-t border-stone-100">
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
              Eigenes Bild / Foto hochladen
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-stone-300 rounded-xl hover:border-stone-500 hover:bg-stone-50 transition text-stone-700 text-sm font-medium"
            >
              <Upload size={18} />
              <span>Bilddatei auswählen (PNG, JPG, SVG)...</span>
            </button>
            {avatarType === 'customImage' && avatarUrl && (
              <div className="mt-3 flex items-center gap-3 p-2 bg-stone-50 rounded-lg border border-stone-200">
                <img
                  src={avatarUrl}
                  alt="Avatar Vorschau"
                  className="w-10 h-10 rounded-full object-cover border border-stone-300"
                />
                <span className="text-xs text-stone-600 truncate flex-1">
                  Eigenes Foto aktiv
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 text-white rounded-lg text-sm font-medium hover:bg-stone-800 transition"
          >
            Fertig
          </button>
        </div>
      </div>
    </div>
  );
};
