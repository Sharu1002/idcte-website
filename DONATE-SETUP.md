# Accepting donations (Stripe)

The `/donate` page lets visitors give once or monthly, in euros, with preset
amounts or a custom amount. It hands off to [Stripe Checkout](https://stripe.com/payments/checkout) —
a hosted, secure payment page — so this site never touches or stores card
details.

## One-time setup (10–15 minutes)

1. **Create a Stripe account** at [stripe.com](https://stripe.com) for IDCTE
   (you'll need the org's bank details for payouts — that part is between you
   and Stripe, not something anyone else should do for you).

2. **Get your API key**: Stripe Dashboard → Developers → API keys. Start with
   the **test** secret key (`sk_test_...`) to try everything safely with no
   real charges, then switch to the **live** key (`sk_live_...`) once you're
   ready to accept real donations.

3. **Add it as an environment variable** in Vercel (Project Settings →
   Environment Variables):
   - `STRIPE_SECRET_KEY` = your secret key

   Locally, add the same to `idcte-site/.env.local` (already gitignored):
   ```
   STRIPE_SECRET_KEY=sk_test_...
   ```

4. Redeploy. The Donate button will now create a real Stripe Checkout
   session. Test with [Stripe's test card](https://docs.stripe.com/testing)
   `4242 4242 4242 4242`, any future expiry, any CVC.

5. **Switch on live payments**: once `STRIPE_SECRET_KEY` is your `sk_live_...`
   key, donations are real. No code changes needed.

## Managing monthly donors

Monthly gifts create a Stripe **subscription**. To let donors update or
cancel their own monthly gift without emailing you, turn on the
[Customer Portal](https://dashboard.stripe.com/settings/billing/portal) in
the Stripe Dashboard — Stripe will email each donor a portal link
automatically after their first payment.

All donations (one-time and recurring) show up in the Stripe Dashboard under
Payments / Subscriptions — that's your donor and revenue record; this project
doesn't keep its own copy of that data.

## Currency

Amounts are in EUR. To change this, edit `CURRENCY` in
`src/app/api/checkout/route.ts` and the `€` symbols in
`src/components/DonateForm.tsx`.
