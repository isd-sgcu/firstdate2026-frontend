import { useState } from "react";

type WelcomePanelProps = {
  appName: string;
  apiBaseUrl: string;
};

export function WelcomePanel({ appName, apiBaseUrl }: WelcomePanelProps) {
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

      <div className="flex gap-2">
        <button type="button" onClick={() => setIsReady((value) => !value)}>
          {isReady ? "React's Ready" : "Check React"}
        </button>
        <button
          type="button"
          onClick={() => {
            alert(`API URL: ${apiBaseUrl}`);
          }}
        >
          View API URL
        </button>
      </div>
    </section>
  );
}
