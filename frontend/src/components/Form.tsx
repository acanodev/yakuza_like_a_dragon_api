import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mainCharacterSchema } from "../schemas/mainCharacter";
import { sujimonSchema } from "../schemas/sujimon";
import React from "react";
import { z } from "zod";

type schemaType = "mainCharacter" | "sujimon";

type FormProps = {
  id: any;
  bootstrap?: string;
  children: React.ReactNode;
  submitHandler: (data: MainCharacterForm | SujimonForm) => void;
  schema: schemaType;
};

type MainCharacterForm = z.input<typeof mainCharacterSchema>;
type SujimonForm = z.input<typeof sujimonSchema>;

function Form({
  id,
  bootstrap = undefined,
  children,
  submitHandler,
  schema,
}: FormProps) {
  const currentSchema =
    schema === "mainCharacter" ? mainCharacterSchema : sujimonSchema;

  const methods = useForm<MainCharacterForm | SujimonForm>({
    resolver: zodResolver(currentSchema) as any,
  });

  const onSubmit = (data: MainCharacterForm | SujimonForm) => {
    console.log(data);
    submitHandler(data);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form
        id={id}
        className={bootstrap}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
}

export default Form;
