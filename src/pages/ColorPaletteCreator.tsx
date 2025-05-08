import { useState } from "react";
import chroma from "chroma-js";
import Layout from "../components/Layout";

function hexToRgb(hex: string) {
  const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.replace('#',''));
  return res ? [parseInt(res[1],16),parseInt(res[2],16),parseInt(res[3],16)] : null;
}
function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    [r, g, b]
      .map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

const TABS = ["Tailwind", "Palette"];
const DEFAULT_FREE = ["#fde7d7", "#facbae", "#f6a67b", "#f27745", "#ee5522"];

// Gera 11 tons (50 a 950) a partir da cor base
function generateTailwindShades(base: string) {
  // Usar HSL para suavizar a transição dos tons
  function hexToHsl(hex: string) {
    const rgb = hexToRgb(hex) || [238, 85, 34];
    const [r, g, b] = rgb.map(x => x / 255);
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    if (max !== min) {
      const d = max - min;
      s = (max + min) / 2 > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return [h * 360, s, (max + min) / 2];
  }
  function hslToHex(h: number, s: number, l: number) {
    let r: number, g: number, b: number;
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h / 360 + 1 / 3);
      g = hue2rgb(p, q, h / 360);
      b = hue2rgb(p, q, h / 360 - 1 / 3);
    }
    return rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
  }
  const [h, s] = hexToHsl(base);
  // Tailwind padrão: tons claros têm l maior, escuros menor
  const lightness = [0.97, 0.93, 0.85, 0.72, 0.6, 0.5, 0.42, 0.32, 0.22, 0.13, 0.07];
  return [
    { name: "50", hex: hslToHex(h, s, lightness[0]) },
    { name: "100", hex: hslToHex(h, s, lightness[1]) },
    { name: "200", hex: hslToHex(h, s, lightness[2]) },
    { name: "300", hex: hslToHex(h, s, lightness[3]) },
    { name: "400", hex: hslToHex(h, s, lightness[4]) },
    { name: "500", hex: hslToHex(h, s, lightness[5]) },
    { name: "600", hex: hslToHex(h, s, lightness[6]) },
    { name: "700", hex: hslToHex(h, s, lightness[7]) },
    { name: "800", hex: hslToHex(h, s, lightness[8]) },
    { name: "900", hex: hslToHex(h, s, lightness[9]) },
    { name: "950", hex: hslToHex(h, s, lightness[10]) },
  ];
}

// Funções para geração de paletas baseadas em teoria das cores
function getPalette(base: string, method: string, count: number) {
  let colors: string[] = [];
  switch (method) {
    case 'Monochromatic':
      colors = chroma.scale([chroma(base).brighten(2), base, chroma(base).darken(2)]).mode('lab').colors(count);
      break;
    case 'Complementary':
      colors = [base, chroma(base).set('hsl.h', "+180").hex()];
      colors = chroma.scale(colors).mode('lab').colors(count);
      break;
    case 'Split Complementary':
      colors = [base,
        chroma(base).set('hsl.h', "+150").hex(),
        chroma(base).set('hsl.h', "+210").hex()
      ];
      colors = chroma.scale(colors).mode('lab').colors(count);
      break;
    case 'Analogous':
      colors = [
        chroma(base).set('hsl.h', "-30").hex(),
        base,
        chroma(base).set('hsl.h', "+30").hex()
      ];
      colors = chroma.scale(colors).mode('lab').colors(count);
      break;
    case 'Tetradic':
      colors = [
        base,
        chroma(base).set('hsl.h', "+90").hex(),
        chroma(base).set('hsl.h', "+180").hex(),
        chroma(base).set('hsl.h', "+270").hex()
      ];
      colors = chroma.scale(colors).mode('lab').colors(count);
      break;
    case 'Triadic':
      colors = [
        base,
        chroma(base).set('hsl.h', "+120").hex(),
        chroma(base).set('hsl.h', "+240").hex()
      ];
      colors = chroma.scale(colors).mode('lab').colors(count);
      break;
    case 'Square':
      colors = [
        base,
        chroma(base).set('hsl.h', "+90").hex(),
        chroma(base).set('hsl.h', "+180").hex(),
        chroma(base).set('hsl.h', "+270").hex()
      ];
      colors = chroma.scale(colors).mode('lab').colors(count);
      break;
    default:
      colors = chroma.scale([chroma(base).brighten(2), base, chroma(base).darken(2)]).mode('lab').colors(count);
  }

  return colors;
}

const GENERATOR_METHODS = [
  'Monochromatic',
  'Complementary',
  'Split Complementary',
  'Analogous',
  'Tetradic',
  'Triadic',
  'Square',
];

const MIN_PALETTE = 3;
const MAX_PALETTE = 10;

const ColorPaletteCreator = () => {
  const [tab, setTab] = useState("Tailwind");
  const [base, setBase] = useState("#ee5522");
  const [baseInput, setBaseInput] = useState("#ee5522");
  const [copiedIdx, setCopiedIdx] = useState<number|null>(null);

  // Tailwind shades (dinâmico)
  const shades = generateTailwindShades(base);

  // Switch state
  const [switchOn, setSwitchOn] = useState(true);

  // Free palette: only first color is editable/lockable, rest are generated
  const [generatorMethod, setGeneratorMethod] = useState('Monochromatic');
  const [paletteCount, setPaletteCount] = useState(5);
  const [freeBase, setFreeBase] = useState(DEFAULT_FREE[0]);
  const [freeBaseInput, setFreeBaseInput] = useState(DEFAULT_FREE[0]);
  const [freeLocked, setFreeLocked] = useState(false);
  const freePalette = getPalette(freeBase, generatorMethod, paletteCount);

  // Handle base hex input
  const handleBaseInput = (val: string) => {
    if (!val.startsWith("#")) val = "#" + val.replace(/^#+/, "");
    val = val.slice(0, 7).replace(/[^#0-9a-fA-F]/g, "");
    setBaseInput(val);
    if (/^#([0-9A-Fa-f]{6})$/.test(val)) setBase(val);
  };
  const handleBasePicker = (val: string) => {
    setBase(val);
    setBaseInput(val);
  };

  const handleCopy = (hex: string, idx: number) => {
    navigator.clipboard.writeText(hex);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1200);
  };

  // Free handlers
  const handleFreeBaseInput = (val: string) => {
    if (!val.startsWith("#")) val = "#" + val.replace(/^#+/, "");
    val = val.slice(0, 7).replace(/[^#0-9a-fA-F]/g, "");
    setFreeBaseInput(val);
    if (/^#([0-9A-Fa-f]{6})$/.test(val)) setFreeBase(val);
  };
  const handleFreeBasePicker = (val: string) => {
    setFreeBase(val);
    setFreeBaseInput(val);
  };
  const handleAddColor = () => {
    setPaletteCount(count => Math.min(count + 1, MAX_PALETTE));
  };
  const handleRemoveColor = () => {
    setPaletteCount(count => Math.max(count - 1, MIN_PALETTE));
  };

  return (
    <Layout>
      <div className="flex flex-col items-center gap-10 py-8">
        <div className="flex flex-col items-center gap-2 pb-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-icon-50 tracking-tight">Color Palette Creator</h1>
          <span className="text-lg text-icon-600 dark:text-icon-200">Generate harmonious color schemes for your projects</span>
        </div>
        {/* Tabs */}
        <div className="flex gap-2 mb-2">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-t-lg font-semibold transition border-b-2 ${tab===t ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-icon-700 dark:text-icon-200 hover:text-primary-500'}`}
            >
              {t}
            </button>
          ))}
        </div>
        {/* Content */}
        {tab === "Tailwind" && (
          <div className="w-full max-w-6xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 flex flex-col gap-8 shadow-xl transition-all">
            {/* Base color input */}
            <div className="flex flex-col md:flex-row gap-4 justify-start mb-6">
              <label className="text-xl content-center font-semibold text-gray-900 dark:text-icon-50">Base color:</label>
              <input
                type="color"
                value={base}
                onChange={e => handleBasePicker(e.target.value)}
                className="w-12 h-12 p-0 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-transparent cursor-pointer transition"
                aria-label="Select base color"
              />
              <input
                type="text"
                value={baseInput}
                onChange={e => handleBaseInput(e.target.value)}
                maxLength={7}
                className="w-28 rounded-lg border px-3 py-3 text-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-icon-50 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-400 outline-none transition font-mono"
                aria-label="Hex value for base color"
              />
            </div>
            {/* Color shades bar */}
            <div className="w-full flex justify-center gap-2 overflow-x-auto py-2">
              {shades.map((shade, idx) => {
                // Contrast: if light, use black text; if dark, use white text
                const rgb = hexToRgb(shade.hex) || [255,255,255];
                const brightness = (rgb[0]*299 + rgb[1]*587 + rgb[2]*114) / 1000;
                const textColor = brightness > 160 ? "#222" : "#fff";
                const borderColor = shade.name === "500" ? "#2563eb" : "rgba(0,0,0,0.08)";
                return (
                  <div
                    key={shade.name}
                    className={`flex flex-col justify-between items-center min-w-[90px] h-36 rounded-xl px-2 py-2 shadow border-2 relative transition-all select-none ${shade.name === "500" ? "scale-105 z-10 ring-2 ring-primary-200 dark:ring-primary-900" : ""}`}
                    style={{ background: shade.hex, borderColor }}
                  >
                    <button
                      onClick={() => handleCopy(shade.hex, idx)}
                      className={`absolute top-2 right-2 text-xs p-1 rounded hover:bg-white/20 transition`}
                      style={{ color: textColor, borderColor: 'transparent' }}
                      title="Copy HEX"
                    >
                      {copiedIdx===idx ? "✔" : <span>⧉</span>}
                    </button>
                    <span className="text-xs font-bold mb-1" style={{ color: textColor, opacity: 0.85 }}>{shade.name}</span>
                    <div className="flex-1 flex items-center justify-center">
                      <span
                        className="text-base font-mono font-bold cursor-pointer select-all"
                        style={{ color: textColor }}
                        onClick={() => handleCopy(shade.hex, idx)}
                        title="Click to copy"
                      >
                        {shade.hex.toUpperCase()}
                      </span>
                    </div>
                  </div>
                );
              })}
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
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold border border-gray-200 dark:border-gray-700"
                    style={{ background: shades[1].hex, color: shades[7].hex }}
                  >
                    Badge
                  </span>
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
        )}
        {tab === "Palette" && (
          <div className="max-w-7xl min-w-7xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 flex flex-col gap-8 shadow-xl transition-all">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
              <div className="">
                <div className="flex gap-2 items-center">
                  <label className="text-xl content-center font-semibold text-gray-900 dark:text-icon-50">Base color:</label>
                  <input
                    type="color"
                    value={freeBase}
                    onChange={e => handleFreeBasePicker(e.target.value)}
                    className="w-10 h-10 p-0 bg-transparent cursor-pointer transition"
                    aria-label={`Select base color`}
                    disabled={freeLocked}
                  />
                  <input
                    type="text"
                    value={freeBaseInput}
                    onChange={e => handleFreeBaseInput(e.target.value)}
                    maxLength={7}
                    className="w-24 rounded-lg border px-2 py-2 text-md bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-icon-50 border-gray-200 dark:border-gray-700 outline-none transition font-mono"
                    aria-label={`Hex value for base color`}
                    disabled={freeLocked}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex gap-2 items-center">
                  <label className="text-md font-semibold text-gray-900 dark:text-icon-50">Generator Method:</label>
                  <select
                    className="rounded-lg border px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-icon-50 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-400 outline-none transition"
                    value={generatorMethod}
                    onChange={e => setGeneratorMethod(e.target.value)}
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
                  <span className="text-lg px-2 font-mono font-bold text-gray-900 dark:text-icon-50">{paletteCount}</span>
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
              {freePalette.map((color, idx, arr) => {
                const rgb = hexToRgb(color) || [255,255,255];
                const brightness = (rgb[0]*299 + rgb[1]*587 + rgb[2]*114) / 1000;
                const textColor = brightness > 160 ? "#222" : "#fff";
                // Largura dinâmica: cada card ocupa 100%/N da largura
                const flexBasis = `${100 / arr.length}%`;
                return (
                  <div key={idx} className="flex flex-col justify-between items-center h-full px-6 py-8 shadow relative select-none transition-all"
                    style={{ background: color, flex: `1 1 ${flexBasis}`, minWidth: 0 }}>
                    {/* Copy button e hex */}
                    {idx === 0 && (
                      <div className="absolute top-4 right-4 flex gap-1">
                        <button
                          onClick={() => setFreeLocked(l => !l)}
                          className={`text-2xl p-1 rounded hover:bg-white/20 transition ${freeLocked ? "text-primary-600 dark:text-primary-400" : "text-icon-400 dark:text-icon-200"}`}
                          title={freeLocked ? "Unlock" : "Lock"}
                          style={{ color: textColor }}
                        >
                          {freeLocked ? "🔒" : "🔓"}
                        </button>
                      </div>
                    )}

                    <div className="flex-1 flex flex-row items-center justify-center">
                      <span
                        className="text-xl font-mono font-bold cursor-pointer select-all"
                        style={{ color: textColor }}
                        onClick={() => handleCopy(color, idx)}
                        title="Click to copy"
                      >
                        {color.toUpperCase()}
                      </span>
                      <button
                        onClick={() => handleCopy(color, idx)}
                        className="ml-1 text-lg p-1 rounded hover:bg-white/20 transition border-none outline-none"
                        style={{ color: textColor, background: 'transparent' }}
                        title="Copy HEX"
                      >
                        {copiedIdx===idx ? "✔" : <span>⧉</span>}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ColorPaletteCreator; 