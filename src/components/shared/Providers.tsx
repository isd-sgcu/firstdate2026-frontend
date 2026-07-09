import { Toaster } from "@components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

// ครอบทุก react subtree ที่จะใช้ tanstack query
// ห้ามมี astro layout อยู่ระหว่าง <Providers/> กับ component ที่ใช้
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
    </QueryClientProvider>
  );
}
