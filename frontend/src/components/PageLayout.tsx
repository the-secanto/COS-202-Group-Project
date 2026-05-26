import type { ReactNode } from 'react';

type PageLayoutProps = {
  children: ReactNode;
  mainClassName?: string;
};

export function PageLayout({ children, mainClassName = '' }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className={`mx-auto w-full max-w-6xl ${mainClassName}`.trim()}>{children}</div>
    </div>
  );
}
