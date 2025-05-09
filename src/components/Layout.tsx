import { DarkThemeToggle } from "flowbite-react";
import RubyLogo from "../RubyLogo";
import { SunSvgIcon } from "../components/SunSvgIcon";
import { MoonSvgIcon } from "../components/MoonSvgIcon";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="flex min-h-screen flex-col items-center bg-icon-100 px-4 py-12 dark:bg-gray-800">
      <div className="fixed inset-0 w-full h-full overflow-hidden">
        <div className="relative w-full h-full select-none">
          <img
            className="absolute right-0 w-full h-full object-cover object-right dark:hidden"
            alt="Pattern Light"
            src="/light-dune.svg"
          />
          <img
            className="absolute right-0 w-full h-full object-cover object-right hidden dark:block"
            alt="Pattern Dark"
            src="/dark-dune.svg"
          />
        </div>
      </div>
      <div className="absolute top-4 left-4">
        <a href="/">
          <RubyLogo className="h-15" />
        </a>
      </div>
      <div className="absolute top-4 right-4">
        <DarkThemeToggle iconDark={SunSvgIcon} iconLight={MoonSvgIcon} className="hover:bg-icon-200 focus:ring-0 text-icon-950 dark:text-icon-50 [&>svg]:w-10 [&>svg]:h-10" />
      </div>

      <div className="relative flex w-full max-w-6xl flex-col items-center justify-between min-h-screen">
        {children}
      </div>
      <footer className="w-full mt-12">
        <div className="flex flex-col sm:flex-row justify-around items-center py-6 px-4 backdrop-blur-sm">
          <p className="text-sm text-icon-900 dark:text-icon-200">Made with ❤️ by <a className="font-semibold text-primary-600 dark:text-primary-400 hover:underline underline-offset-2" href="https://github.com/Hugofsp93" target="_blank">Hugofsp93</a></p>
          <p className="text-sm text-icon-900 dark:text-icon-200">© 2025 <a className="font-semibold text-primary-600 dark:text-primary-400 hover:underline underline-offset-2" href="https://github.com/Hugofsp93/devtools-hub" target="_blank">DevTools Hub</a></p>
        </div>
      </footer>
    </main>
  );
};

export default Layout; 