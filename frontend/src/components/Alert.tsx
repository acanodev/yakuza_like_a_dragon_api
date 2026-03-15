type AlertProps = {
    type: string;
    children: any;
}

function Alert({ type = "danger", children } : AlertProps) {
    return (
        <div className={`alert alert-${type}`}>
            {children}
        </div>
    );
}

export default Alert;