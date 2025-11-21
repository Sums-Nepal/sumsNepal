import React from "react";
import type { ButtonProps } from "../../types";
import "./Button.css"

const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  className,
  ref,
  ...props
}) => {
  return (
    <>
      <button ref={ref} className={`btn ${variant}-btn ${className}`} {...props}>
        {children}
      </button>
    </>
  );
};

export default Button;
