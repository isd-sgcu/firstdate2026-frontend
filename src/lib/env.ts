type AppConfigType = {
  appName: string;
  apiBaseUrl: string;
  redirectAt: number;
  redirectTo: string;
};

export const appConfig: AppConfigType = {
  appName: import.meta.env.PUBLIC_APP_NAME || "firstdate 2026",
  apiBaseUrl: import.meta.env.PUBLIC_API_BASE_URL || "http://localhost:3000",

  // go to /redirect when 18 Jul 19:00
  redirectAt: new Date("2026-07-18T19:00:00+07:00").getTime(),

  // go to rpkm's path
  redirectTo:
    import.meta.env.PUBLIC_REDIRECT_TO || "https://rpkm2026.com/landing",
} as const;
