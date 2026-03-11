import React from "react";

type CardProps = {
  headerText: string | undefined,
  children: React.ReactNode,
  id: any
}

function Card({ headerText = undefined, children, id = undefined } : CardProps) {
  const className = `card mb-4`;

  return (
    <div className={className} {...(id ? { id } : {})}>
      {headerText && (
        <div className="card-header">{headerText}</div>
      )}
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

export default Card;