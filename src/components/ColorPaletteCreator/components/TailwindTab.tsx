import React, { useState } from 'react';
import { ColorInput } from './ColorInput';
import { useColorCopy } from '../hooks/useColorCopy';
import { usePersistedState } from '../hooks/usePersistedState';
import { generateTailwindShades } from '../services/paletteGenerator';
import type { TailwindShade } from '../services/paletteGenerator';
import { getContrastText, hexToRgb } from '../../../utils/colorUtils';

interface TailwindTabProps {
  className?: string;
}

/**
 * Tab component for Tailwind color shade generation
 * Generates a set of color shades following Tailwind's convention
 * Includes Flowbite component examples for preview
 */
export const TailwindTab: React.FC<TailwindTabProps> = ({ className = "" }) => {
  // Use persisted state for the base color
  const [base, setBase] = usePersistedState('tailwind-base-color', "#ee5522");
  const [baseInput, setBaseInput] = usePersistedState('tailwind-base-input', base);
  const { copiedIdx, handleCopy } = useColorCopy();
  const shades = generateTailwindShades(base);
  
  // Switch state
  const [switchOn, setSwitchOn] = useState(true);

  const handleBaseChange = (color: string) => {
    setBase(color);
    setBaseInput(color);
  };

  return (
    <div className={`w-full max-w-7xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 flex flex-col gap-8 shadow-xl transition-all ${className}`}>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
        <ColorInput
          value={baseInput}
          onChange={handleBaseChange}
          label="Base color:"
        />
      </div>

      {/* Color shades display */}
      <div className="w-full flex flex-col">
        <div className="w-full flex">
          {shades.map((shade: TailwindShade) => (
            <div
              key={shade.name}
              className="flex-1 h-16 flex items-center justify-center cursor-pointer group relative"
              style={{ background: shade.hex }}
              onClick={() => handleCopy(shade.hex, parseInt(shade.name))}
            >
              <span
                className="font-mono text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: getContrastText(shade.hex) }}
              >
                {shade.hex.toUpperCase()}
              </span>
              {copiedIdx === parseInt(shade.name) && (
                <span
                  className="absolute top-1 right-1 text-xs"
                  style={{ color: getContrastText(shade.hex) }}
                >
                  ✓
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="w-full flex">
          {shades.map((shade: TailwindShade) => (
            <div key={shade.name} className="flex-1 text-center py-2 text-sm font-mono text-gray-600 dark:text-gray-400">
              {shade.name}
            </div>
          ))}
        </div>
      </div>

      {/* Flowbite Preview - more examples */}
      <div className="mt-10 w-full flex flex-col gap-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-icon-50 mb-2">Preview with Flowbite components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Button */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-gray-900 dark:text-icon-50">Button</span>
            <button
              className="px-6 py-2 rounded-lg font-semibold shadow border border-gray-200 dark:border-gray-700"
              style={{ background: shades[5].hex, color: (hexToRgb(shades[5].hex) || [0,0,0]).reduce((a,c)=>a+c,0)/3 > 180 ? '#222':'#fff' }}
            >
              Primary Button
            </button>
            <button
              className="px-6 py-2 rounded-lg font-semibold shadow border border-gray-200 dark:border-gray-700"
              style={{ background: shades[0].hex, color: (hexToRgb(shades[2].hex) || [0,0,0]).reduce((a,c)=>a+c,0)/3 > 180 ? '#222':'#fff' }}
            >
              Secondary Button
            </button>
          </div>
          {/* Badge */}

          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-gray-900 dark:text-icon-50">Badge</span>
            <div className="flex flex-row gap-2">
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-bold border border-gray-200 dark:border-gray-700"
                style={{ backgroundColor: shades[1].hex, color: shades[7].hex }}
              >
                Badge
              </span>
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-bold border border-gray-200 dark:border-gray-700"
                style={{ backgroundColor: shades[6].hex }}
              >
                Badge
              </span>
            </div>
          </div>

          {/* Input */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-gray-900 dark:text-icon-50">Input</span>
            <input
              className="rounded-lg border px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-icon-50 border-gray-200 dark:border-gray-700 outline-none transition"
              placeholder="Type something..."
              style={{ borderColor: shades[2].hex, outline: `1px solid ${shades[2].hex}` }}
            />
          </div>
          {/* Alert */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-gray-900 dark:text-icon-50">Alert</span>
            <div
              className="rounded-lg px-4 py-3 border-l-4 shadow"
              style={{ background: shades[0].hex, borderLeftColor: shades[5].hex, color: shades[8].hex }}
            >
              <b>Alert Example:</b> This is an alert demonstrating how it looks with your picked color.
            </div>
          </div>
          {/* Card */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-gray-900 dark:text-icon-50">Card</span>
            <div
              className="rounded-2xl p-6 shadow border flex flex-col md:flex-row gap-6 items-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <div
                className="w-16 h-16 rounded-xl border border-gray-200 dark:border-gray-700"
                style={{ background: shades[5].hex }}
              />
              <div className="flex-1">
                <div className="font-bold text-gray-900 dark:text-icon-50 mb-1">Card Title</div>
                <div className="text-sm text-icon-700 dark:text-icon-200">This is a card example using shade 500 as highlight.</div>
              </div>
              <button
                className="px-4 py-2 rounded-lg font-semibold text-icon-50 transition" style={{ background: shades[5].hex }}
              >
                Action
              </button>
            </div>
          </div>
          {/* Dropdown */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-gray-900 dark:text-icon-50">Dropdown</span>
            <select
              className="rounded-lg border px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-icon-50 border-gray-200 dark:border-gray-700 outline-none transition"
              style={{ borderColor: shades[2].hex, outline: `1px solid ${shades[2].hex}` }}
            >
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
          {/* Switch */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-gray-900 dark:text-icon-50">Switch</span>
            <label className="inline-flex items-center me-5 cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" checked={switchOn} onChange={()=>setSwitchOn(v=>!v)} />
              <div
                className="relative w-11 h-6 border-none rounded-full peer peer-focus:ring-2 peer-focus:ring-white dark:peer-focus:ring-black peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:before:border-none peer-checked:after:border-none after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white before:border-none after:border-none after:rounded-full after:h-5 after:w-5 after:transition-all duration-400"
                style={{ background: switchOn ? shades[5].hex : '#ddd' }}
              ></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-icon-50">{switchOn ? 'Active' : 'Inactive'}</span>
            </label>
          </div>
          {/* Progress */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-gray-900 dark:text-icon-50">Progress</span>
            <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
              <div
                className="h-4 rounded-full"
                style={{ width: '60%', background: shades[5].hex }}
              ></div>
            </div>
          </div>
          {/* Tabs */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-gray-900 dark:text-icon-50">Tabs</span>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-t-lg font-semibold border-b-2" style={{ borderBottomColor: shades[5].hex, color: shades[5].hex }}>Tab 1</button>
              <button className="px-4 py-2 rounded-t-lg font-semibold border-b-2 border-transparent text-gray-900 dark:text-icon-50 bg-white dark:bg-gray-900">Tab 2</button>
            </div>
          </div>
          {/* Avatar */}
          <div className="flex flex-col gap-2 items-center">
            <span className="text-sm font-semibold text-gray-900 dark:text-icon-50">Avatar</span>
            <div className="w-16 h-16 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center text-2xl font-bold" style={{ background: shades[5].hex, color: '#fff' }}>A</div>
          </div>
          {/* Tooltip (mock) */}
          <div className="flex flex-col gap-2 items-center">
            <span className="text-sm font-semibold text-gray-900 dark:text-icon-50">Tooltip</span>
            <div className="relative group">
              <button className="px-4 py-2 rounded-lg font-semibold transition" style={{ background: shades[5].hex, color: (hexToRgb(shades[5].hex) || [0,0,0]).reduce((a,c)=>a+c,0)/3 > 180 ? '#222':'#fff' }}>Hover me</button>
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 px-4 py-2 rounded text-xs" style={{ background: shades[8].hex, color: '#fff' }}>
                Example tooltip
              </div>
            </div>
          </div>
          {/* Modal (mock) */}
          <div className="flex flex-col gap-2 items-center">
            <span className="text-sm font-semibold text-gray-900 dark:text-icon-50">Modal</span>
            <div className="relative w-full">
              <div className="absolute top-0 left-0 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-6 z-20">
                <div className="font-bold text-gray-900 dark:text-icon-50 mb-2">Modal Title</div>
                <div className="text-sm text-icon-700 dark:text-icon-200 mb-4">This is a modal example using shade 500 as action color.</div>
                <button className="px-4 py-2 rounded-lg font-semibold transition" style={{ background: shades[5].hex, color: (hexToRgb(shades[5].hex) || [0,0,0]).reduce((a,c)=>a+c,0)/3 > 180 ? '#222':'#fff' }}>Close</button>
              </div>
            </div>
          </div>
          {/* Table (mock) */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <span className="text-sm font-semibold text-gray-900 dark:text-icon-50">Table</span>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <thead style={{ background: shades[1].hex }}>
                  <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200 dark:border-gray-700">
                    <td className="px-4 py-2 text-gray-900 dark:text-icon-50">Item 1</td>
                    <td className="px-4 py-2"><span className="px-2 py-1 rounded" style={{ background: shades[2].hex, color: (hexToRgb(shades[2].hex) || [0,0,0]).reduce((a,c)=>a+c,0)/3 > 180 ? '#222':'#fff' }}>Active</span></td>
                    <td className="px-4 py-2"><button className="px-2 py-1 rounded text-xs font-semibold transition" style={{ background: shades[5].hex, color: (hexToRgb(shades[5].hex) || [0,0,0]).reduce((a,c)=>a+c,0)/3 > 180 ? '#222':'#fff' }}>Edit</button></td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-700">
                    <td className="px-4 py-2 text-gray-900 dark:text-icon-50">Item 2</td>
                    <td className="px-4 py-2"><span className="px-2 py-1 rounded" style={{ background: shades[7].hex, color: (hexToRgb(shades[7].hex) || [0,0,0]).reduce((a,c)=>a+c,0)/3 > 180 ? '#222':'#fff' }}>Inactive</span></td>
                    <td className="px-4 py-2"><button className="px-2 py-1 rounded text-xs font-semibold transition" style={{ background: shades[5].hex, color: (hexToRgb(shades[5].hex) || [0,0,0]).reduce((a,c)=>a+c,0)/3 > 180 ? '#222':'#fff' }}>Edit</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 