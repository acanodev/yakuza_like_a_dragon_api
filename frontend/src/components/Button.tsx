import React from "react";

type ButtonProps = {
  bootstrap?: string;
  type?: "submit" | "reset" | "button";
  children?: React.ReactNode;
  action?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  dtoggle?: string;
  dtarget?: string;
  aexpanded?: boolean | undefined;
  acontrols?: string;
};

function Button({
  bootstrap = "",
  type = "button",
  children = null,
  action = undefined,
  dtoggle = undefined,
  dtarget = undefined,
  aexpanded = undefined,
  acontrols = undefined,
}: ButtonProps) {
  return (
    <button
      className={bootstrap}
      type={type}
      onClick={type !== "submit" ? action : undefined}
      data-bs-toggle={dtoggle}
      data-bs-target={dtarget}
      aria-expanded={aexpanded}
      aria-controls={acontrols}
    >
      {children}
    </button>
  );
}

export default Button;
