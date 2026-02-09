import type { ButtonHTMLAttributes, RefObject } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "link" | "default" | "destructive";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  ref?: RefObject<HTMLButtonElement | null>
}