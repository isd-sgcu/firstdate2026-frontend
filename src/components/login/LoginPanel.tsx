import { Button } from "@components/ui/button";

export function LoginPanel() {
  return (
    <section className="grid gap-6 rounded-lg bg-white p-6">
      <h1 className="text-4xl font-bold">Sample Login</h1>
      <form method="post" className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          Email
          <input
            className="rounded-xl border px-3 py-2"
            type="email"
            name="email"
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          Password
          <input
            type="password"
            className="rounded-xl border px-3 py-2"
            name="password"
            required
          />
        </label>
        <Button type="submit">Login</Button>
      </form>
    </section>
  );
}
