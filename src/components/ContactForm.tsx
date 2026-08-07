"use client";

import { useState, FormEvent } from "react";
import { t, type Locale } from "@/lib/i18n";

export default function ContactForm({
  email,
  locale = "en",
}: {
  email: string;
  locale?: Locale;
}) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = form.subject || `Message from ${form.name || "the IDCTE website"}`;
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-brand-900">
            {t(locale, "form_name")}
          </label>
          <input
            id="name"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="mt-1.5 w-full rounded-sm border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-brand-900">
            {t(locale, "email_label")}
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="mt-1.5 w-full rounded-sm border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-brand-900">
          {t(locale, "form_subject")}
        </label>
        <input
          id="subject"
          value={form.subject}
          onChange={(e) => update("subject", e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-brand-900">
          {t(locale, "form_message")}
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-sm bg-brand-500 px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-brand-600"
      >
        {t(locale, "form_send")}
      </button>

      {sent && (
        <p className="text-sm text-brand-700">
          Opening your email client to send this to {email}. If nothing
          opened, email us directly at{" "}
          <a href={`mailto:${email}`} className="underline">
            {email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
