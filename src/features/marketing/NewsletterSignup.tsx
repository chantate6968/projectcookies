"use client";

import { useState } from "react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "done">("idle");

  return (
    <section className="border-t border-[#e8ddd2] bg-[#fff8f4] px-6 py-16">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[#5d3a3a]">
          Join our email list
        </h2>
        <p className="mt-3 text-sm leading-7 text-[#6d5a4c]">
          Get restock updates and launch offers.
        </p>
        {status === "done" ? (
          <p className="mt-8 text-sm font-medium text-[#5d3a3a]">
            Thanks — we will be in touch before the next restock.
          </p>
        ) : (
          <form
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              if (!email.trim()) {
                return;
              }
              setStatus("done");
            }}
          >
            <label className="sr-only" htmlFor="newsletter-email">
              Email
            </label>
            <input
              className="min-w-0 flex-1 border border-[#d9cfc4] bg-white px-4 py-3 text-sm outline-none focus:border-[#5d3a3a]"
              id="newsletter-email"
              name="email"
              placeholder="Email address"
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button
              className="bg-[#5d3a3a] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#4a2f2f]"
              type="submit"
            >
              Sign up
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
