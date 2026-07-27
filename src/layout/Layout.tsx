import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-10 bg-white px-6 py-4 shadow dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          📚 My Book Archive
        </h1>
      </header>

      <main className="flex-1 px-6 py-8">{children}</main>

      <footer className="bg-gray-800 py-4 text-center text-white">
        My Book Archive &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
