import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create your fan account — TryDiscreet" },
      {
        name: "description",
        content: "Join TryDiscreet in under a minute and start unlocking private creator content.",
      },
      { property: "og:title", content: "Create your fan account — TryDiscreet" },
      {
        property: "og:description",
        content: "Join TryDiscreet in under a minute and start unlocking private creator content.",
      },
    ],
  }),
  component: Register,
});

function Register() {
  const [done, setDone] = useState(false);

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="card-surface space-y-4">
        <div>
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-muted-foreground">Discreet by default. No real names shown.</p>
        </div>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
        >
          <Field label="Display name">
            <input className="field" placeholder="How creators see you" required />
          </Field>
          <Field label="Email">
            <input className="field" type="email" placeholder="you@email.com" required />
          </Field>
          <Field label="Password">
            <input className="field" type="password" required />
          </Field>
          <Field label="Confirm password">
            <input className="field" type="password" required />
          </Field>
          <Field label="Gender">
            <select className="field" defaultValue="">
              <option value="" disabled>
                Select
              </option>
              <option>Male</option>
              <option>Female</option>
              <option>Prefer not to say</option>
            </select>
          </Field>
          <Field label="Date of birth">
            <input className="field" type="date" required />
          </Field>
          <Field label="Sexual orientation (optional)">
            <select className="field" defaultValue="">
              <option value="">Prefer not to say</option>
              <option>Heterosexual</option>
              <option>Homosexual</option>
              <option>Bisexual</option>
            </select>
          </Field>

          <button type="submit" className="btn-primary w-full">
            Create Account
          </button>
        </form>

        {done && (
          <p className="pill bg-success/15 text-success w-full justify-center">
            Account created — welcome to TryDiscreet
          </p>
        )}

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-accent">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
