export const appConfig = {
  appName: import.meta.env.PUBLIC_APP_NAME || "RPKM 2026",
  apiBaseUrl: import.meta.env.PUBLIC_API_BASE_URL || "http://localhost:3000",
} as const;
