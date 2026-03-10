function Card({ headerText = null, children, id = null } : { headerText : string | null, children : any, id : any }) {
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