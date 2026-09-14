import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — TryDiscreet" },
      { name: "description", content: "Sign in to your TryDiscreet fan or creator account." },
      { property: "og:title", content: "Login — TryDiscreet" },
      {
        property: "og:description",
        content: "Sign in to your TryDiscreet fan or creator account.",
      },
    ],
  }),
  component: Login,
});

function Login() {
  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <form className="card-surface space-y-4" onSubmit={(e) => e.preventDefault()}>
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <label className="block space-y-1.5">
          <span className="text-xs font-semibold text-muted-foreground">Email</span>
          <input className="field" type="email" placeholder="you@email.com" />
        </label>
        <label className="block space-y-1.5">
          <span className="text-xs font-semibold text-muted-foreground">Password</span>
          <input className="field" type="password" />
        </label>
        <button className="btn-primary w-full">Login</button>
        <p className="text-center text-sm text-muted-foreground">
          New here?{" "}
          <Link to="/register" className="text-accent">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}
