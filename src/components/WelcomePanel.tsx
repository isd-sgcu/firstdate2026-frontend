import { useState } from "react";

type WelcomePanelProps = {
  appName: string;
};

export function WelcomePanel({ appName }: WelcomePanelProps) {
  const [isReady, setIsReady] = useState(false);

  return (
    <section className="welcome-panel" aria-labelledby="welcome-heading">
      <div>
        <p className="eyebrow">Frontend starter</p>
        <h1 id="welcome-heading">{appName}</h1>
        <p className="lede">
          Astro, React, and TypeScript are ready for the team to start building
          product screens.
        </p>
      </div>

      <button type="button" onClick={() => setIsReady((value) => !value)}>
        {isReady ? "Ready" : "Check React"}
      </button>
    </section>
  );
}
