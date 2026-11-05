import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-transparent p-2 sm:p-4 flex items-center justify-center antialiased">
      {children}
    </div>
  );
}
