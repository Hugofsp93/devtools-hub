import React from 'react';
import { ColorInput } from './ColorInput';
import { ColorCard } from './ColorCard';
import { useColorCopy } from '../hooks/useColorCopy';
import { usePersistedState } from '../hooks/usePersistedState';
import { generatePalette } from '../services/paletteGenerator';
import { GENERATOR_METHODS, MIN_PALETTE, MAX_PALETTE, DEFAULT_FREE } from '../constants';
import type { GeneratorMethodType } from '../constants';

interface PaletteTabProps {
  className?: string;
}

/**
 * Tab component for generating color palettes
 * Supports various color harmony methods and customizable palette size
 */
export const PaletteTab: React.FC<PaletteTabProps> = ({ className = "" }) => {
  // Use persisted state for all user preferences
  const [generatorMethod, setGeneratorMethod] = usePersistedState<GeneratorMethodType>(
    'palette-generator-method',
    'Monochromatic'
  );
  const [paletteCount, setPaletteCount] = usePersistedState(
    'palette-count',
    5
  );
  const [freeBase, setFreeBase] = usePersistedState(
    'palette-base-color',
    DEFAULT_FREE[0]
  );
  const [freeLocked, setFreeLocked] = usePersistedState(
    'palette-base-locked',
    false
  );
  const { copiedIdx, handleCopy } = useColorCopy();

  const freePalette = generatePalette(freeBase, generatorMethod, paletteCount);

  const handleAddColor = () => setPaletteCount(count => Math.min(count + 1, MAX_PALETTE));
  const handleRemoveColor = () => setPaletteCount(count => Math.max(count - 1, MIN_PALETTE));

  return (
    <div className={`max-w-7xl min-w-7xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 flex flex-col gap-8 shadow-xl transition-all ${className}`}>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
        <ColorInput
          value={freeBase}
          onChange={setFreeBase}
          disabled={freeLocked}
          label="Base color:"
        />
        
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <label className="text-md font-semibold text-gray-900 dark:text-icon-50">
              Generator Method:
            </label>
            <select
              className="rounded-lg border px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-icon-50 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-400 outline-none transition"
              value={generatorMethod}
              onChange={e => setGeneratorMethod(e.target.value as GeneratorMethodType)}
            >
              {GENERATOR_METHODS.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <br/>
          <div className="flex gap-2 justify-end">
            <button
              onClick={handleRemoveColor}
              className="px-3 py-1 rounded-lg font-semibold bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-icon-50 transition"
              disabled={paletteCount <= MIN_PALETTE}
            >
              -
            </button>
            <span className="text-lg px-2 font-mono font-bold text-gray-900 dark:text-icon-50">
              {paletteCount}
            </span>
            <button
              onClick={handleAddColor}
              className="px-3 py-1 rounded-lg font-semibold bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-icon-50 transition"
              disabled={paletteCount >= MAX_PALETTE}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Palette as large vertical columns */}
      <div className="w-full flex gap-0 min-w-6xl overflow-x-auto pb-2" style={{ height: '70vh' }}>
        {freePalette.map((color, idx) => (
          <ColorCard
            key={idx}
            color={color}
            index={idx}
            totalColors={freePalette.length}
            copiedIdx={copiedIdx}
            onCopy={handleCopy}
            isLockable={idx === 0}
            isLocked={freeLocked}
            onToggleLock={() => setFreeLocked(l => !l)}
          />
        ))}
      </div>
    </div>
  );
}; 