import type { ButtonHTMLAttributes, RefObject } from "react";

type Variant = "primary" | "secondary";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  ref?: RefObject<HTMLButtonElement | null>
}