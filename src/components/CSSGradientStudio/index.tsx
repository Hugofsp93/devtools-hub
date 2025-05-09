import { useState } from "react";
import Layout from "../../components/Layout";
import { usePersistedState } from "../../utils/usePersistedState";

const CSSGradientStudio = () => {
  const [type, setType] = usePersistedState("css-gradient-type", "linear");
  const [color1, setColor1] = usePersistedState("css-gradient-color1", "#f86e0d");
  const [color2, setColor2] = usePersistedState("css-gradient-color2", "#ffd500");
  const [angle, setAngle] = usePersistedState("css-gradient-angle", 90);
  const [angleInput, setAngleInput] = useState(angle.toString());
  const [color1Input, setColor1Input] = useState(color1);
  const [color2Input, setColor2Input] = useState(color2);
  const [copyCss, setCopyCss] = useState(false);
  const [copyTailwindcss, setCopyTailwindcss] = useState(false);

  // Handle color1 hex input
  const handleColor1Input = (val: string) => {
    if (!val.startsWith("#")) val = "#" + val.replace(/^#+/, "");
    val = val.slice(0, 7).replace(/[^#0-9a-fA-F]/g, "");
    setColor1Input(val);
    if (/^#([0-9A-Fa-f]{6})$/.test(val)) setColor1(val);
  };
  // Handle color2 hex input
  const handleColor2Input = (val: string) => {
    if (!val.startsWith("#")) val = "#" + val.replace(/^#+/, "");
    val = val.slice(0, 7).replace(/[^#0-9A-Fa-f]/g, "");
    setColor2Input(val);
    if (/^#([0-9A-Fa-f]{6})$/.test(val)) setColor2(val);
  };

  // Sync color pickers with input
  const handleColor1Picker = (val: string) => {
    setColor1(val);
    setColor1Input(val);
  };
  const handleColor2Picker = (val: string) => {
    setColor2(val);
    setColor2Input(val);
  };

  // Handle angle input as string
  const handleAngleInput = (val: string) => {
    // Permit empty string
    setAngleInput(val);
    // Only update the persisted value if it's a valid number
    if (/^\d{1,3}$/.test(val)) {
      const num = Number(val);
      if (num >= 0 && num <= 360) setAngle(num);
    }
  };

  const gradient =
    type === "linear"
      ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
      : `radial-gradient(circle, ${color1}, ${color2})`;

  const cssCode = `background: ${gradient};`;
  const tailwindcssCode =
    type === "linear"
      ? `bg-gradient-to-r from-[${color1}] to-[${color2}]`
      : `bg-[radial-gradient(ellipse_at_center,${color1},${color2})]`;

  const handleCopy = (type: 'cssCode' | 'tailwindcssCode') => {
    navigator.clipboard.writeText(type === 'cssCode' ? cssCode : tailwindcssCode);
    if (type === 'cssCode') {
      setCopyCss(true);
      setTimeout(() => setCopyCss(false), 1200);
    } else {
      setCopyTailwindcss(true);
      setTimeout(() => setCopyTailwindcss(false), 1200);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center gap-10 py-8">
        <div className="flex flex-col items-center gap-2 pb-4">
          <h1 className="text-4xl font-bold text-icon-950 dark:text-icon-50 tracking-tight">CSS Gradient Studio</h1>
          <span className="text-lg text-icon-600 dark:text-icon-200">Create beautiful CSS gradients with live preview</span>
        </div>

        {/* Gradient Preview */}
        <div className="w-full max-w-2xl rounded-2xl border border-icon-200 dark:border-icon-700 shadow-lg overflow-hidden mb-2 bg-icon-50 dark:bg-gray-900 transition-all">
          <div
            className="w-full h-52 transition-all duration-300"
            style={{ background: gradient }}
          />
        </div>

        {/* Controls */}
        <div className="w-full max-w-2xl bg-icon-100 dark:bg-gray-900 border border-icon-200 dark:border-icon-800 rounded-2xl p-6 flex flex-col md:flex-row gap-6 md:gap-10 items-center justify-center transition-all min-h-[140px]" style={{ minWidth: 0 }}>
          {/* Type */}
          <div className="flex flex-col items-start gap-1 w-full max-w-[120px]">
            <label className="text-xs font-semibold text-icon-950 dark:text-icon-100 mb-1">Type</label>
            <select
              className="rounded-lg border px-3 py-2 w-full bg-icon-50 dark:bg-gray-900 text-icon-950 dark:text-icon-50 border-icon-200 dark:border-icon-900 focus:ring-1 focus:ring-icon-400 outline-none transition"
              value={type}
              onChange={e => setType(e.target.value)}
            >
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
            </select>
          </div>
          {/* Color 1 */}
          <div className="flex flex-col items-start gap-1 w-full max-w-[180px]">
            <label className="text-xs font-semibold text-icon-950 dark:text-icon-100 mb-1">Color 1</label>
            <div className="flex items-center gap-2 w-full">
              <input
                type="color"
                value={color1}
                onChange={e => handleColor1Picker(e.target.value)}
                className="w-10 h-10 p-0 cursor-pointer transition"
                aria-label="Select first color"
              />
              <input
                type="text"
                value={color1Input}
                onChange={e => handleColor1Input(e.target.value)}
                maxLength={7}
                className="w-20 rounded-lg border px-2 py-2 text-sm bg-icon-50 dark:bg-gray-900 text-icon-950 dark:text-icon-50 border-icon-200 dark:border-icon-700 focus:ring-1 focus:ring-icon-400 outline-none transition font-mono"
                aria-label="Hex value for color 1"
              />
            </div>
          </div>
          {/* Color 2 */}
          <div className="flex flex-col items-start gap-1 w-full max-w-[180px]">
            <label className="text-xs font-semibold text-icon-950 dark:text-icon-100 mb-1">Color 2</label>
            <div className="flex items-center gap-2 w-full">
              <input
                type="color"
                value={color2}
                onChange={e => handleColor2Picker(e.target.value)}
                className="w-10 h-10 p-0 bg-transparent cursor-pointer transition"
                aria-label="Select second color"
              />
              <input
                type="text"
                value={color2Input}
                onChange={e => handleColor2Input(e.target.value)}
                maxLength={7}
                className="w-20 rounded-lg border px-2 py-2 text-sm bg-icon-50 dark:bg-gray-900 text-icon-950 dark:text-icon-50 border-icon-200 dark:border-icon-700 focus:ring-1 focus:ring-icon-400 outline-none transition font-mono"
                aria-label="Hex value for color 2"
              />
            </div>
          </div>
          {/* Angle */}
          {type === "linear" && (
            <div className="flex flex-col items-start gap-1 w-full max-w-[120px]">
              <label className="text-xs font-semibold text-icon-950 dark:text-icon-100 mb-1">Angle</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  min={0}
                  max={360}
                  value={angleInput}
                  onChange={e => handleAngleInput(e.target.value)}
                  className="rounded-lg border px-2 py-1 w-16 bg-icon-50 dark:bg-gray-900 text-icon-950 dark:text-icon-50 border-icon-200 dark:border-icon-700 focus:ring-1 focus:ring-icon-400 outline-none transition font-mono"
                  aria-label="Set angle for linear gradient"
                  placeholder="0-360"
                />
                <span className="text-xs text-icon-950 dark:text-icon-200">deg</span>
              </div>
            </div>
          )}
          {type === "radial" && (
            <div className={`flex flex-col items-start gap-1 w-full max-w-[120px] ${type === 'radial' ? 'opacity-50' : ''}`}>
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Angle</label>
              <div className="flex items-center gap-2">
                <input className="rounded-lg border px-2 py-1 w-16 bg-icon-100 dark:bg-gray-700 text-icon-950 dark:text-icon-50 border-icon-200 dark:border-icon-700" disabled />
                <span className="text-xs text-gray-600 dark:text-gray-400">deg</span>
              </div>
            </div>
          )}
        </div>

        {/* CSS Code Output */}
        <div className="w-full max-w-2xl flex flex-col gap-2">
          <label className="block text-xs font-semibold text-icon-950 dark:text-icon-50 mb-1">CSS Code</label>
          <div className="flex flex-col sm:flex-row sm:justify-center gap-2">
            <pre className="bg-icon-50 dark:bg-gray-900 rounded-lg px-4 py-3 text-sm overflow-x-auto select-all flex-1 border border-icon-200 dark:border-icon-700 transition-all font-mono text-icon-950 dark:text-icon-50">{cssCode}</pre>
            <button
              onClick={() => handleCopy('cssCode')}
              className="min-w-[90px] px-4 py-2 rounded-lg font-semibold transition bg-primary-500 text-icon-50 hover:bg-primary-400 focus:ring-1 focus:ring-primary-400 outline-none relative text-center"
              aria-label="Copy CSS code"
            >
              <span className="invisible">Copied!</span>
              <span className="absolute left-0 right-0 w-full text-center">{copyCss ? "Copied!" : "Copy"}</span>
            </button>
          </div>
        </div>

        {/* Tailwind CSS Code Output */}
        <div className="w-full max-w-2xl flex flex-col gap-2">
          <label className="block text-xs font-semibold text-icon-950 dark:text-icon-50 mb-1">Tailwindcss Code</label>
          <div className="flex flex-col sm:flex-row sm:justify-center gap-2">
            <pre className="bg-icon-50 dark:bg-gray-900 rounded-lg px-4 py-3 text-sm overflow-x-auto select-all flex-1 border border-icon-200 dark:border-icon-700 transition-all font-mono text-icon-950 dark:text-icon-50">{tailwindcssCode}</pre>
            <button
              onClick={() => handleCopy('tailwindcssCode')}
              className="min-w-[90px] px-4 py-2 rounded-lg font-semibold transition bg-primary-500 text-icon-50 hover:bg-primary-400 focus:ring-1 focus:ring-primary-400 outline-none relative text-center"
              aria-label="Copy Tailwindcss code"
            >
              <span className="invisible">Copied!</span>
              <span className="absolute left-0 right-0 w-full text-center">{copyTailwindcss ? "Copied!" : "Copy"}</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CSSGradientStudio; 