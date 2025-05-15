import { QRCodeStyle } from './types';
import { useRef } from 'react';
import { usePersistedState } from '../../utils/usePersistedState';

interface QRCodeCustomizationProps {
  style: QRCodeStyle;
  onStyleChange: (style: QRCodeStyle) => void;
  qrRef: React.RefObject<HTMLDivElement | null>;
}

const QRCodeCustomization = ({ style, onStyleChange }: QRCodeCustomizationProps) => {
  const [fileName, setFileName] = usePersistedState<string>('qrcode-logo-filename', '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleColorChange = (type: 'fgColor' | 'bgColor', value: string) => {
    onStyleChange({ ...style, [type]: value });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        onStyleChange({ ...style, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setFileName('');
    onStyleChange({ ...style, logo: undefined });
    // Limpar o valor do input file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-icon-950 dark:text-icon-50">Customization</h2>

      <div>
        <label className="block text-xs font-semibold text-icon-950 dark:text-icon-100 mb-1">Foreground Color</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={style.fgColor}
            onChange={(e) => handleColorChange('fgColor', e.target.value)}
            className="w-10 h-10 p-0 cursor-pointer transition"
            aria-label="Select foreground color"
          />
          <input
            type="text"
            value={style.fgColor}
            onChange={(e) => handleColorChange('fgColor', e.target.value)}
            className="w-20 rounded-lg border px-2 py-2 text-sm bg-icon-50 dark:bg-gray-900 text-icon-950 dark:text-icon-50 border-icon-200 dark:border-icon-700 focus:ring-1 focus:ring-icon-400 outline-none transition font-mono"
            aria-label="Hex value for foreground color"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-icon-950 dark:text-icon-100 mb-1">Background Color</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={style.bgColor}
            onChange={(e) => handleColorChange('bgColor', e.target.value)}
            className="w-10 h-10 p-0 cursor-pointer transition"
            aria-label="Select background color"
          />
          <input
            type="text"
            value={style.bgColor}
            onChange={(e) => handleColorChange('bgColor', e.target.value)}
            className="w-20 rounded-lg border px-2 py-2 text-sm bg-icon-50 dark:bg-gray-900 text-icon-950 dark:text-icon-50 border-icon-200 dark:border-icon-700 focus:ring-1 focus:ring-icon-400 outline-none transition font-mono"
            aria-label="Hex value for background color"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-icon-950 dark:text-icon-100 mb-1">Logo</label>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleLogoUpload}
              className="block max-w-32 text-sm text-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-500 file:text-icon-100 hover:file:bg-primary-400 file:transition-colors file:cursor-pointer cursor-pointer"
            />
            {style.logo && (
              <div className="flex items-center gap-2 p-2 pl-0 text-gray-600 dark:text-gray-200 rounded text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                <span>{fileName}</span>
              </div>
            )}
          </div>
          <div className="flex justify-start mt-1 ml-3">
            {style.logo ? (
              <button
                onClick={handleRemoveLogo}
                className="text-sm text-red-500 hover:text-red-600 transition-colors"
              >
                Remove logo
              </button>
            ) : (
              <div className="m-2.5"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeCustomization; 