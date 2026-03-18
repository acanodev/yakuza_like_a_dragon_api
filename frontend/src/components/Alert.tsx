import React from "react";

type AlertProps = {
    type?: string;
    children: React.ReactNode;
}

function Alert({ type = "danger", children } : AlertProps) {
    return (
        <div className={`alert alert-${type}`}>
            {children}
        </div>
    );
}

export default Alert;