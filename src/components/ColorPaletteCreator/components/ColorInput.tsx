import React, { useState, useEffect } from 'react';
import { validateHexColor } from '../../../utils/colorUtils';

interface ColorInputProps {
  value: string;
  onChange: (color: string) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

/**
 * A component that combines a color picker and hex input
 * Handles color validation and formatting
 */
export const ColorInput: React.FC<ColorInputProps> = ({
  value,
  onChange,
  disabled = false,
  label = "Color:",
  className = ""
}) => {
  // Local state for the input value
  const [inputValue, setInputValue] = useState(value);

  // Update local input when prop value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleHexInput = (val: string) => {
    // Update the input value immediately for responsiveness
    setInputValue(val);
    
    // Remove any spaces and ensure # is present
    val = val.trim();
    if (!val.startsWith('#')) val = '#' + val;
    
    // Validate and update parent if valid
    const validatedColor = validateHexColor(val);
    if (validatedColor) {
      onChange(validatedColor);
    }
  };

  const handleColorPicker = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setInputValue(newColor);
    onChange(newColor);
  };

  return (
    <div className={`flex gap-2 items-center ${className}`}>
      {label && (
        <label className="text-xl content-center font-semibold text-gray-900 dark:text-icon-50">
          {label}
        </label>
      )}
      <input
        type="color"
        value={value}
        onChange={handleColorPicker}
        className="w-10 h-10 p-0 bg-transparent cursor-pointer transition"
        aria-label={`Select ${label.toLowerCase()}`}
        disabled={disabled}
      />
      <input
        type="text"
        value={inputValue}
        onChange={(e) => handleHexInput(e.target.value)}
        maxLength={7}
        className="w-24 rounded-lg border px-2 py-2 text-md bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-icon-50 border-gray-200 dark:border-gray-700 outline-none transition font-mono"
        aria-label={`Hex value for ${label.toLowerCase()}`}
        disabled={disabled}
        placeholder="#000000"
      />
    </div>
  );
}; 