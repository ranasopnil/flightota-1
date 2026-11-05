"use client";

import * as React from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps extends Omit<React.ComponentProps<"input">, "size"> {
  size?: "sm" | "default" | "lg";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      size = "default",
      startIcon,
      endIcon,
      clearable = false,
      onClear,
      disabled,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(value ?? defaultValue ?? "");

    const isPasswordType = type === "password";
    const actualType = isPasswordType ? (showPassword ? "text" : "password") : type;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value);
      onChange?.(e);
    };

    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);

    const hasValue = Boolean(internalValue && String(internalValue).length > 0);

    const sizeClasses = {
      sm: "h-8 px-2.5 text-base sm:text-xs rounded-lg",
      default: "h-10 px-3.5 py-2 text-base sm:text-sm rounded-lg",
      lg: "h-11 px-4 py-2.5 text-base sm:text-sm rounded-lg",
    }[size];

    const paddingLeftClass = startIcon
      ? size === "sm"
        ? "pl-8"
        : size === "lg"
        ? "pl-11"
        : "pl-10"
      : "";

    const hasEndAdornment = Boolean(
      endIcon || isPasswordType || (clearable && hasValue && !disabled)
    );

    const paddingRightClass = hasEndAdornment
      ? size === "sm"
        ? "pr-8"
        : size === "lg"
        ? "pr-11"
        : "pr-10"
      : "";

    const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setInternalValue("");
      onClear?.();
    };

    const inputNode = (
      <input
        ref={ref}
        type={actualType}
        data-slot="input"
        data-size={size}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        onChange={handleInputChange}
        className={cn(
          "w-full min-w-0 border transition-all duration-150 outline-none",
          // Smart modern surface: frosted card with subtle and border
          "bg-card/70 hover:bg-card focus-visible:bg-card",
          "border-input/85 hover:border-input focus-visible:border-primary",
          "text-foreground placeholder:text-muted-foreground/75",
          // Enhanced focus glow
          "focus-visible:ring-3 focus-visible:ring-primary/15 ",
          // Accessible invalid & disabled states
          "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted/60 disabled:opacity-50",
          "dark:bg-card/40 dark:hover:bg-card/70 dark:focus-visible:ring-primary/25",
          sizeClasses,
          paddingLeftClass,
          paddingRightClass,
          className
        )}
        {...props}
      />
    );

    if (!startIcon && !hasEndAdornment) {
      return inputNode;
    }

    return (
      <div className="relative w-full flex items-center">
        {startIcon && (
          <div
            className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground/80 flex items-center justify-center",
              size === "sm" ? "size-3.5 left-2.5" : size === "lg" ? "size-4.5 left-3.5" : "size-4"
            )}
            aria-hidden
          >
            {startIcon}
          </div>
        )}

        {inputNode}

        {hasEndAdornment && (
          <div
            className={cn(
              "absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-muted-foreground",
              size === "sm" ? "right-2" : size === "lg" ? "right-3" : "right-2.5"
            )}
          >
            {clearable && hasValue && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                tabIndex={-1}
                aria-label="Clear input"
                className="p-1 rounded-md text-muted-foreground/70 hover:text-foreground hover:bg-muted/80 transition-colors cursor-pointer"
              >
                <X className="size-3.5" />
              </button>
            )}

            {isPasswordType && (
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="p-1 rounded-md text-muted-foreground/70 hover:text-foreground hover:bg-muted/80 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
              </button>
            )}

            {endIcon && <div className="pointer-events-none flex items-center justify-center">{endIcon}</div>}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
