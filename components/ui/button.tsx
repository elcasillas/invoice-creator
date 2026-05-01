import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

const buttonBaseClasses =
  "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:cursor-not-allowed disabled:opacity-60";

const buttonVariants = {
  secondary: "border border-slate-200 bg-white text-slate-900 hover:bg-slate-100",
  primary: "border border-slate-900 bg-slate-900 text-white hover:bg-slate-800"
} as const;

type ButtonVariant = keyof typeof buttonVariants;

export function Button({
  variant = "secondary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return <button className={cn(buttonBaseClasses, buttonVariants[variant], className)} {...props} />;
}

export function ButtonLink({
  variant = "secondary",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant }) {
  return <Link className={cn(buttonBaseClasses, buttonVariants[variant], className)} {...props} />;
}
