import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import CSSGradientStudio from "./pages/CSSGradientStudio";
import ColorPaletteCreator from "./components/ColorPaletteCreator";
import BoxShadowGenerator from "./pages/BoxShadowGenerator";
import GeometricPatternMaker from "./pages/GeometricPatternMaker";
import TaskFlow from "./pages/TaskFlow";
import QRCodeStudio from "./pages/QRCodeStudio";
import AIImageCreator from "./pages/AIImageCreator";
import EmailSandbox from "./pages/EmailSandbox";
import GlassmorphismDesigner from "./pages/GlassmorphismDesigner";
import ColorPickerPro from "./pages/ColorPickerPro";
import ChartBuilder from "./pages/ChartBuilder";
import JSONVisualizer from "./pages/JSONVisualizer";

export default function App() {
  const CARDS = [
    {
      title: "CSS Gradient Studio",
      description:
        "Create, customize, and export beautiful CSS gradients with live preview and code generation",
      url: "/css-gradient-studio",
    },
    {
      title: "Color Palette Creator",
      description:
        "Generate harmonious color schemes with complementary, analogous, and triadic color combinations, perfect for design projects",
      url: "/color-palette-creator",
    },
    {
      title: "Box Shadow Generator",
      description:
        "Design and customize box shadows with an intuitive interface, complete with live preview and CSS code export",
      url: "/box-shadow-generator",
    },
    {
      title: "Geometric Pattern Maker",
      description:
        "Create stunning geometric patterns and backgrounds with customizable shapes, colors, and arrangements",
      url: "/geometric-pattern-maker",
    },
    {
      title: "TaskFlow",
      description:
        "A minimalist task management app with drag-and-drop functionality, categories, and progress tracking",
      url: "/taskflow",
    },
    {
      title: "QR Code Studio",
      description:
        "Generate, customize, and download QR codes with various styles, colors, and error correction levels",
      url: "/qr-code-studio",
    },
    {
      title: "AI Image Creator",
      description:
        "Transform text descriptions into unique images using AI, with style customization and export options",
      url: "/ai-image-creator",
    },
    {
      title: "Email Sandbox",
      description:
        "Test and preview email templates with real-time rendering and spam score checking",
      url: "/email-sandbox",
    },
    {
      title: "Glassmorphism Designer",
      description:
        "Create modern glass-like UI elements with customizable blur, transparency, and border effects",
      url: "/glassmorphism-designer",
    },
    {
      title: "Color Picker Pro",
      description:
        "Advanced color selection tool with hex, RGB, HSL values, and color harmony suggestions",
      url: "/color-picker-pro",
    },
    {
      title: "Chart Builder",
      description:
        "Create interactive charts and graphs with various types (line, bar, pie) and customizable data visualization",
      url: "/chart-builder",
    },
    {
      title: "JSON Visualizer",
      description:
        "Format, validate, and visualize JSON data with tree view and syntax highlighting",
      url: "/json-visualizer",
    },
  ];

  const Home = () => (
    <Layout>
      <div className="flex flex-col items-center gap-12">
        <div className="relative flex flex-col items-center gap-6 pb-10">
          <h1 className="relative text-center text-4xl leading-[125%] font-bold text-icon-950 dark:text-icon-50">
            Build fast
          </h1>
          <span className="inline-flex flex-col items-center justify-center gap-2.5 text-center">
            <span className="inline text-xl text-icon-600 dark:text-icon-200">
              Hey! Check some interesting tools for development
            </span>
          </span>
        </div>

        <div className="relative flex w-full flex-col items-start gap-6 self-stretch">
          <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CARDS.map((card) => (
              <a
                key={card.title}
                href={card.url}
                className="outline-primary-600 dark:outline-primary-500 group hover:border-2 hover:border-primary-600 dark:hover:border-primary-500 cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="flex flex-col items-center gap-6 p-4">
                  <div className="flex flex-1 items-center gap-2">
                    <div className="flex flex-1 flex-col items-start justify-center gap-1.5 pl-3.5 dark:border-gray-700">
                      <div className="w-full font-sans text-lg font-semibold text-gray-900 dark:text-gray-200">
                        {card.title}
                      </div>

                      <div className="w-full min-h-15 font-sans text-sm font-normal text-gray-500 dark:text-gray-400">
                        {card.description}
                      </div>
                    </div>
                  </div>

                  <div className="ml-auto inline-flex font-medium hover:underline mb-auto">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="group-hover:text-primary-600 dark:group-hover:text-primary-500 h-6 w-6 text-gray-500 transition-transform group-hover:translate-x-1"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.2929 7.29289C14.6834 6.90237 15.3166 6.90237 15.7071 7.29289L19.7071 11.2929C19.8946 11.4804 20 11.7348 20 12C20 12.2652 19.8946 12.5196 19.7071 12.7071L15.7071 16.7071C15.3166 17.0976 14.6834 17.0976 14.2929 16.7071C13.9024 16.3166 13.9024 15.6834 14.2929 15.2929L16.5858 13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H16.5858L14.2929 8.70711C13.9024 8.31658 13.9024 7.68342 14.2929 7.29289Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/css-gradient-studio" element={<CSSGradientStudio />} />
        <Route path="/color-palette-creator" element={<ColorPaletteCreator />} />
        <Route path="/box-shadow-generator" element={<BoxShadowGenerator />} />
        <Route path="/geometric-pattern-maker" element={<GeometricPatternMaker />} />
        <Route path="/taskflow" element={<TaskFlow />} />
        <Route path="/qr-code-studio" element={<QRCodeStudio />} />
        <Route path="/ai-image-creator" element={<AIImageCreator />} />
        <Route path="/email-sandbox" element={<EmailSandbox />} />
        <Route path="/glassmorphism-designer" element={<GlassmorphismDesigner />} />
        <Route path="/color-picker-pro" element={<ColorPickerPro />} />
        <Route path="/chart-builder" element={<ChartBuilder />} />
        <Route path="/json-visualizer" element={<JSONVisualizer />} />
      </Routes>
    </Router>
  );
}
