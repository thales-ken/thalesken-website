import type { ReactNode } from "react";

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="/" aria-label="Portfolio home">THALES KEN<span>.</span></a>
        <nav aria-label="Main navigation">
          <a href="/art">ART</a><a href="/video">VIDEO</a><a href="/code">CODE</a><a href="/contact">CONTACT</a>
        </nav>
      </header>
      {children}
      <footer>© 2026 — THALES KEN GAZIERI KOJIMA / ALL RIGHTS RESERVED</footer>
    </div>
  );
}
