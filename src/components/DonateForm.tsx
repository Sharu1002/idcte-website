"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { t, type Locale } from "@/lib/i18n";

const PRESETS = [10, 25, 50, 100, 250];

export default function DonateForm({ locale = "en" }: { locale?: Locale }) {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  const [frequency, setFrequency] = useState<"once" | "monthly">("monthly");
  const [amount, setAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedAmount = customAmount ? Number(customAmount) : amount;
  const validAmount =
    selectedAmount !== null &&
    Number.isFinite(selectedAmount) &&
    selectedAmount >= 1;

  function selectPreset(value: number) {
    setAmount(value);
    setCustomAmount("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validAmount || !selectedAmount) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: selectedAmount, frequency }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div>
      {status === "success" && (
        <div className="mb-8 border-l-2 border-brand-500 bg-brand-50/60 p-5 text-sm text-brand-900">
          {t(locale, "donate_success")}
        </div>
      )}
      {status === "canceled" && (
        <div className="mb-8 border-l-2 border-slate-300 bg-slate-50 p-5 text-sm text-slate-700">
          {t(locale, "donate_canceled")}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="inline-flex rounded-full border border-brand-900/15 p-1">
          {(["monthly", "once"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFrequency(f)}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold uppercase tracking-wide transition-colors ${
                frequency === f
                  ? "bg-brand-500 text-white"
                  : "text-brand-900 hover:bg-brand-50"
              }`}
            >
              {f === "monthly" ? t(locale, "donate_monthly") : t(locale, "donate_once")}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-5">
          {PRESETS.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => selectPreset(value)}
              className={`rounded-sm border py-4 text-lg font-semibold transition-colors ${
                amount === value && !customAmount
                  ? "border-brand-500 bg-brand-500 text-white"
                  : "border-brand-900/15 text-brand-900 hover:border-brand-500"
              }`}
            >
              €{value}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <label htmlFor="custom-amount" className="block text-sm font-medium text-brand-900">
            {t(locale, "donate_custom_amount")}
          </label>
          <div className="relative mt-1.5 max-w-[200px]">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
              €
            </span>
            <input
              id="custom-amount"
              type="number"
              min={1}
              step="1"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="Other"
              className="w-full rounded-sm border border-slate-300 py-3 pl-7 pr-3 text-lg text-slate-900 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={!validAmount || loading}
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-7 py-4 text-base font-semibold uppercase tracking-wide text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {loading
            ? t(locale, "donate_redirecting")
            : `${t(locale, "donate")} €${validAmount ? selectedAmount : "0"} ${
                frequency === "monthly" ? t(locale, "donate_monthly") : t(locale, "donate_once")
              }`}
        </button>

        <p className="mt-4 text-xs text-slate-500">
          {t(locale, "donate_secure_note")}
        </p>
      </form>
    </div>
  );
}
