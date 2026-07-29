import type { PropsWithChildren, ReactNode } from "react";
import { DarkThemeToggle } from "flowbite-react";

interface LayoutProps extends PropsWithChildren {
  headerActions?: ReactNode;
}

export default function Layout({ children, headerActions }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4 bg-white px-6 py-4 shadow dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          📚 My Book Archive
        </h1>

        <div className="flex flex-wrap items-center gap-4">
          {headerActions}
          <DarkThemeToggle />
        </div>
      </header>

      <main className="flex-1 px-6 py-8">{children}</main>

      <footer className="bg-gray-800 py-4 text-center text-white">
        Erez Haimov | All Rights Reserved &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
