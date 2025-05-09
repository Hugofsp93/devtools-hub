import React from 'react';
import { getContrastText } from '../../../utils/colorUtils';

interface ColorCardProps {
  color: string;
  index: number;
  totalColors: number;
  copiedIdx: number | null;
  onCopy: (hex: string, idx: number) => void;
  isLockable?: boolean;
  isLocked?: boolean;
  onToggleLock?: () => void;
}

/**
 * A component that displays a color with its hex value and copy functionality
 * Optionally includes a lock toggle for the first color in palette mode
 */
export const ColorCard: React.FC<ColorCardProps> = ({
  color,
  index,
  totalColors,
  copiedIdx,
  onCopy,
  isLockable = false,
  isLocked = false,
  onToggleLock
}) => {
  const textColor = getContrastText(color);
  const flexBasis = `${100 / totalColors}%`;

  return (
    <div 
      className="flex flex-col justify-between items-center h-full px-6 py-8 shadow relative select-none transition-all"
      style={{ background: color, flex: `1 1 ${flexBasis}`, minWidth: 0 }}
    >
      {isLockable && (
        <div className="absolute top-4 right-4 flex gap-1">
          <button
            onClick={onToggleLock}
            className={`text-2xl p-1 rounded hover:bg-white/20 transition ${isLocked ? "text-primary-600 dark:text-primary-400" : "text-icon-400 dark:text-icon-200"}`}
            title={isLocked ? "Unlock" : "Lock"}
            style={{ color: textColor }}
          >
            {isLocked ? "🔒" : "🔓"}
          </button>
        </div>
      )}

      <div className="flex-1 flex flex-row items-center justify-center">
        <span
          className="text-xl font-mono font-bold cursor-pointer select-all"
          style={{ color: textColor }}
          onClick={() => onCopy(color, index)}
          title="Click to copy"
        >
          {color.toUpperCase()}
        </span>
        <button
          onClick={() => onCopy(color, index)}
          className="ml-1 text-lg p-1 rounded hover:bg-white/20 transition border-none outline-none"
          style={{ color: textColor, background: 'transparent' }}
          title="Copy HEX"
        >
          {copiedIdx === index ? "✔" : <span>⧉</span>}
        </button>
      </div>
    </div>
  );
}; 