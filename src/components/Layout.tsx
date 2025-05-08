import { DarkThemeToggle } from "flowbite-react";
import RubyLogo from "../RubyLogo";

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
        <RubyLogo className="h-15" />
      </div>
      <div className="absolute top-4 right-4">
        <DarkThemeToggle className="hover:bg-icon-200 focus:ring-0 text-icon-950 dark:text-icon-50"/>
      </div>

      <div className="relative flex w-full max-w-6xl flex-col items-center justify-between min-h-screen">
        {children}
      </div>
    </main>
  );
};

export default Layout; 