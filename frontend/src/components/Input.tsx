import { useFormContext } from "react-hook-form";
import React from "react";

type inputProps = {
    bootstrap?: string,
    type: string,
    name: string,
    id?: any,
    children?: React.ReactNode,
    defaultValue?: any,
    step?: string
}

function Input({ bootstrap = undefined, type, name, id = null, children = null, defaultValue = null, step = "any" } : inputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext() as any;

  return (
    <div className="d-flex flex-column">
      { id && children && (<label className="form-label" htmlFor={id}>
        {children}
      </label>)}

      <input className={bootstrap} type={type} id={id} defaultValue={defaultValue} step={step} {...register(name)} />

      {errors[name] && <p className="text-danger">{errors[name].message}</p>}
    </div>
  );
}

export default Input;