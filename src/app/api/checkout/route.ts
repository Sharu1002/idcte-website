import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const CURRENCY = "eur";
const MIN_AMOUNT = 1;
const MAX_AMOUNT = 100000;

export async function POST(request: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      {
        error:
          "Donations aren't configured yet. See idcte-site/DONATE-SETUP.md to add a Stripe secret key.",
      },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => null);
  const amount = Number(body?.amount);
  const frequency = body?.frequency === "monthly" ? "monthly" : "once";

  if (!Number.isFinite(amount) || amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
    return NextResponse.json({ error: "Invalid donation amount." }, { status: 400 });
  }

  const stripe = new Stripe(secretKey);
  const origin = request.nextUrl.origin;
  const unitAmount = Math.round(amount * 100);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: frequency === "monthly" ? "subscription" : "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: CURRENCY,
            unit_amount: unitAmount,
            product_data: {
              name:
                frequency === "monthly"
                  ? "Monthly donation to IDCTE"
                  : "Donation to IDCTE",
              description:
                "International Diplomatic Council of Tamil Eelam — supporting advocacy, research, and knowledge mobilization for Eelam Tamils.",
            },
            ...(frequency === "monthly"
              ? { recurring: { interval: "month" as const } }
              : {}),
          },
        },
      ],
      success_url: `${origin}/donate?status=success`,
      cancel_url: `${origin}/donate?status=canceled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
