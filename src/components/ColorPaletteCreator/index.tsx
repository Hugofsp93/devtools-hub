import React from 'react';
import Layout from '../../components/Layout';
import { TailwindTab } from './components/TailwindTab';
import { PaletteTab } from './components/PaletteTab';
import { usePersistedState } from '../../utils/usePersistedState';
import { TABS } from './constants';
import type { TabType } from './constants';

/**
 * Main component for the Color Palette Creator tool
 * Manages tab state and renders appropriate tab content
 */
const ColorPaletteCreator: React.FC = () => {
  // Persist the selected tab
  const [tab, setTab] = usePersistedState<TabType>("color-palette-active-tab", "Tailwind");

  return (
    <Layout>
      <div className="flex flex-col items-center gap-10 py-8">
        <div className="flex flex-col items-center gap-2 pb-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-icon-50 tracking-tight">
            Color Palette Creator
          </h1>
          <span className="text-lg text-icon-600 dark:text-icon-200">
            Generate harmonious color schemes for your projects
          </span>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-2">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-t-lg font-semibold transition border-b-2 ${
                tab === t
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-icon-700 dark:text-icon-200 hover:text-primary-500'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Content */}
        {tab === "Tailwind" ? (
          <TailwindTab />
        ) : (
          <PaletteTab />
        )}
      </div>
    </Layout>
  );
};

export default ColorPaletteCreator; 