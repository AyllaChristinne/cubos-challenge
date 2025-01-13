import { forwardRef, ReactNode, useEffect, useRef, useState } from "react";
import "./index.scss";

interface IInputProps {
  placeholder: string;
  name: string;
  type: string;
  value: string;
  onChange: (value: string | undefined) => void;
  icon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ onChange, value, name, placeholder, icon, type }, ref) => {
    const [localValue, setLocalValue] = useState(value.trim());
    const timer = useRef<NodeJS.Timeout | null>(null);

    const focusInput = () => {
      if (ref && typeof ref !== "function") {
        ref.current?.focus();
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setLocalValue(value);

      timer.current && clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        onChange(value.trim());
      }, 1000);
    };

    return (
      <div
        className="search_container"
        tabIndex={0}
        role="textbox"
        onClick={focusInput}
        onKeyDown={(e) => {
          if (e.key === "Enter") focusInput();
        }}
      >
        <input
          type={type}
          className="search_input"
          name={name}
          placeholder={placeholder}
          autoComplete="off"
          ref={ref}
          value={localValue}
          onChange={handleChange}
          tabIndex={-1}
        />
        {icon}
      </div>
    );
  }
);
