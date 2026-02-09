import React from "react";
import { motion } from "framer-motion";
import type { ButtonProps } from "../../types";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = "primary",
  children,
  className = "",
  type = "button",
  ...props
}, ref) => {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-primary/30",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary/10",
    ghost: "bg-transparent text-foreground hover:bg-secondary",
    link: "text-primary underline-offset-4 hover:underline",
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  };

  // Filter out any props that might conflict with motion
  const { onDrag, onDragStart, onDragEnd, onAnimationStart, ...safeProps } = props as any;

  return (
    <motion.button
      ref={ref}
      type={type}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        px-6 py-2.5 rounded-xl font-semibold transition-all duration-300
        flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant as keyof typeof variants] || variants.primary}
        ${className}
      `}
      {...safeProps}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = "Button";

export default Button;
