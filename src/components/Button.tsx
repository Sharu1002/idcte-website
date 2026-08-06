import Link from "next/link";
import { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost-light";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-wide transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500";

const variants: Record<Variant, string> = {
  primary: "bg-brand-500 text-white hover:bg-brand-600",
  secondary: "bg-white text-brand-900 hover:bg-brand-50",
  outline:
    "border border-brand-900 text-brand-900 hover:bg-brand-900 hover:text-white bg-transparent",
  "ghost-light":
    "border border-white text-white hover:bg-white hover:text-brand-900",
};

type Props = ComponentProps<typeof Link> & { variant?: Variant };

export default function Button({
  variant = "primary",
  className = "",
  ...props
}: Props) {
  return (
    <Link
      {...props}
      className={`${base} ${variants[variant]} ${className}`}
    />
  );
}
