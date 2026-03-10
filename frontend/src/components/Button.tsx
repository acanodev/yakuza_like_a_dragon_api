import React from "react";

function Button({
  bootstrap = "",
  type = "button",
  children = null,
  action = undefined,
  dtoggle = undefined,
  dtarget = undefined,
  aexpanded = undefined,
  acontrols = undefined,
}: {
  bootstrap?: string;
  type?: "submit" | "reset" | "button";
  children?: React.ReactNode;
  action?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  dtoggle?: string;
  dtarget?: string;
  aexpanded?: string;
  acontrols?: string;
}) {
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