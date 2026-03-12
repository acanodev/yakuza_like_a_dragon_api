import { useFormContext } from "react-hook-form";
import React from "react";

type textareaProps = {
    bootstrap?: string,
    name: string,
    id: any,
    cols?: number,
    rows?: number,
    children: React.ReactNode,
    defaultValue?: any
}

function Textarea ({bootstrap = undefined, name, id, cols = undefined, rows = undefined, children, defaultValue = null} : textareaProps) {

    const {
        register,
        formState: { errors }
    } = useFormContext() as any;

    return (
        <div className="d-flex flex-column">
            <label className="form-label" htmlFor={id}>
                {children}
            </label>

            <textarea className={bootstrap} name={name} id={id} cols={cols} rows={rows} defaultValue={defaultValue} {...register(name)}></textarea>

            {errors[name] && <p className="text-danger">{errors[name].message}</p>}
        </div>

    );
}

export default Textarea;