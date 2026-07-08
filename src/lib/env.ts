export const appConfig = {
  appName: import.meta.env.PUBLIC_APP_NAME || "firstdate 2026",
  apiBaseUrl: import.meta.env.PUBLIC_API_BASE_URL || "http://localhost:3000",

  // go to /redirect when 18 Jun 19:00
  redirectAt: new Date("2026-07-18T19:00:00+07:00").getTime(),
} as const;
