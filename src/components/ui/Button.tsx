import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "link";

type BaseButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  loading?: boolean;
  className?: string;
};

type NativeButtonProps = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    as?: "button";
    href?: never;
  };

type AnchorButtonProps = BaseButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    as: "a";
    href: string;
    disabled?: boolean;
  };

export type ButtonProps = NativeButtonProps | AnchorButtonProps;

const baseClasses =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-body font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 motion-reduce:transition-colors motion-reduce:duration-0";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-slate-950 dark:text-white hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98] active:bg-accent focus-visible:ring-accent motion-reduce:hover:scale-100 motion-reduce:active:scale-100",
  secondary:
    "border border-border bg-muted text-foreground hover:border-border-hover hover:bg-background hover:scale-[1.02] active:scale-[0.98] active:bg-muted motion-reduce:hover:scale-100 motion-reduce:active:scale-100",
  ghost:
    "bg-transparent text-foreground hover:bg-muted hover:scale-[1.02] active:scale-[0.98] active:bg-background motion-reduce:hover:scale-100 motion-reduce:active:scale-100",
  link: "min-h-0 rounded-none px-0 py-0 text-accent underline-offset-4 hover:text-accent-hover hover:underline active:text-accent",
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent"
    />
  );
}

export function Button(props: ButtonProps) {
  const {
    as,
    children,
    variant = "primary",
    loading = false,
    className,
    ...restProps
  } = props;
  const classes = joinClasses(baseClasses, variantClasses[variant], className);

  if (as === "a") {
    const { disabled, href, ...anchorProps } = restProps as Omit<
      AnchorButtonProps,
      keyof BaseButtonProps | "as"
    >;
    const isDisabled = disabled || loading;

    return (
      <a
        {...anchorProps}
        href={isDisabled ? undefined : href}
        aria-disabled={isDisabled}
        className={classes}
        tabIndex={isDisabled ? -1 : anchorProps.tabIndex}
      >
        {loading ? <Spinner /> : null}
        <span>{children}</span>
      </a>
    );
  }

  const { disabled, type, ...buttonProps } = restProps as Omit<
    NativeButtonProps,
    keyof BaseButtonProps | "as"
  >;

  return (
    <button
      {...buttonProps}
      type={type ?? "button"}
      disabled={disabled || loading}
      className={classes}
    >
      {loading ? <Spinner /> : null}
      <span>{children}</span>
    </button>
  );
}
