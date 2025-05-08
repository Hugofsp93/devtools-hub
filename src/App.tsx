import { DarkThemeToggle } from "flowbite-react";
import RubyLogo from "./RubyLogo.tsx"

export default function App() {
  const CARDS = [
    {
      title: "CSS Gradient Studio",
      description:
        "Create, customize, and export beautiful CSS gradients with live preview and code generation",
      url: "https://cssgradient.io",
    },
    {
      title: "Color Palette Creator",
      description:
        "Generate harmonious color schemes with complementary, analogous, and triadic color combinations, perfect for design projects",
      url: "https://coolors.co",
    },
    {
      title: "Box Shadow Generator",
      description:
        "Design and customize box shadows with an intuitive interface, complete with live preview and CSS code export",
      url: "https://box-shadow.dev",
    },
    {
      title: "Geometric Pattern Maker",
      description:
        "Create stunning geometric patterns and backgrounds with customizable shapes, colors, and arrangements",
      url: "https://pattern.monster",
    },
    {
      title: "TaskFlow",
      description:
        "A minimalist task management app with drag-and-drop functionality, categories, and progress tracking",
      url: "https://todoist.com",
    },
    {
      title: "QR Code Studio",
      description:
        "Generate, customize, and download QR codes with various styles, colors, and error correction levels",
      url: "https://www.qr-code-generator.com",
    },
    {
      title: "AI Image Creator",
      description:
        "Transform text descriptions into unique images using AI, with style customization and export options",
      url: "https://www.midjourney.com",
    },
    {
      title: "Email Sandbox",
      description:
        "Test and preview email templates with real-time rendering and spam score checking",
      url: "https://mailtrap.io",
    },
    {
      title: "Glassmorphism Designer",
      description:
        "Create modern glass-like UI elements with customizable blur, transparency, and border effects",
      url: "https://glassmorphism.com",
    },
    {
      title: "Color Picker Pro",
      description:
        "Advanced color selection tool with hex, RGB, HSL values, and color harmony suggestions",
      url: "https://colorpicker.me",
    },
    {
      title: "Chart Builder",
      description:
        "Create interactive charts and graphs with various types (line, bar, pie) and customizable data visualization",
      url: "https://www.chartjs.org",
    },
    {
      title: "JSON Visualizer",
      description:
        "Format, validate, and visualize JSON data with tree view and syntax highlighting",
      url: "https://jsoneditoronline.org",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center bg-white px-4 py-12 dark:bg-gray-900">
      <div className="absolute inset-0 size-full">
        <div className="relative h-full w-full select-none">
          <img
            className="absolute right-0 min-w-dvh dark:hidden"
            alt="Pattern Light"
            src="/light-dune.svg"
          />
          <img
            className="absolute right-0 hidden dark:block"
            alt="Pattern Dark"
            src="/dark-dune.svg"
          />
        </div>
      </div>
      <div className="absolute top-4 left-4">
        <RubyLogo className="h-15" />
      </div>
      <div className="absolute top-4 right-4">
        <DarkThemeToggle className="hover:bg-icon-200 focus:ring-0 text-icon-950 dark:text-icon-50"/>
      </div>

      <div className="relative flex w-full max-w-6xl flex-col items-center justify-center gap-12">
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
                target="_blank"
                className="outline-primary-600 dark:outline-primary-500 group hover:border-primary-600 dark:hover:border-primary-500 cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-gray-50 outline-offset-2 focus:outline-2 dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="flex flex-col items-center gap-6 p-4">
                  <div className="flex flex-1 items-center gap-2">
                    <div className="flex flex-1 flex-col items-start justify-center gap-1.5 pl-3.5 dark:border-gray-700">
                      <div className="w-full font-sans text-lg leading-4 font-semibold text-gray-900 dark:text-gray-200">
                        {card.title}
                      </div>

                      <div className="w-full font-sans text-sm leading-5 font-normal text-gray-500 dark:text-gray-400">
                        {card.description}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 gap-2 ml-auto">
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
        <footer>
          <p className="text-icon-950 dark:text-icon-200">Monte meu footer parceiro</p>
        </footer>
      </div>
    </main>
  );
}
