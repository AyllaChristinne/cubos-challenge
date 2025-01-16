import { ReactNode } from "react";
import "./index.scss";

interface IButtonProps {
  onClick: VoidFunction;
  ariaLabel: string;
  variant?: "primary" | "secondary";
  icon?: ReactNode;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function Button({
  onClick,
  variant = "primary",
  icon,
  label,
  ariaLabel,
  className,
  disabled = false,
}: IButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={`button button__${variant} ${className}`}
    >
      {label}
      {icon}
    </button>
  );
}
