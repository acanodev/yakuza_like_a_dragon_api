import { useFormContext } from "react-hook-form";
import React from "react";

type checkboxProps = {
    bootstrap?: string,
    name: string,
    id?: any,
    children?: React.ReactNode,
    defaultChecked?: boolean
}

function Checkbox({bootstrap = undefined, name, id, children = null, defaultChecked = false} : checkboxProps) {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <div className="d-flex">
            <input className={bootstrap} type="checkbox" id={id} defaultChecked={defaultChecked} value="true" {...register(name)}/>

            <label className="ms-2 me-2" htmlFor={id}>
                {children}
            </label>

            {errors[name] && <p className="text-danger">{(errors[name] as any).message}</p>}
        </div>
        
    );
}

export default Checkbox;