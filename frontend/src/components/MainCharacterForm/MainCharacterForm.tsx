import "./MainCharacterForm.css";
import Form from "../Form";
import Input from "../Input";
import Textarea from "../Textarea";
import Modal from "../Modal";
import Button from "../Button";
import type { z } from "zod";
import { mainCharacterSchema } from "../../schemas/mainCharacter";
import type { MainCharacter } from "../../types/Main_Character";

type MainCharacterFormData = z.input<typeof mainCharacterSchema>;

type MainCharacterFormProps = {
  show: boolean;
  data?: MainCharacter;
  submitHandler: (data: MainCharacterFormData) => void;
  toggleShow: () => void;
};

function MainCharacterForm({
  show,
  data,
  submitHandler,
  toggleShow,
}: MainCharacterFormProps) {
  return (
    <Modal
      show={show}
      title={data ? `Editar ${data.name}` : "Crear Main Character"}
      submitButton={false}
      toggleShow={toggleShow}
    >
      <Form
        id="mainCharacterForm"
        schema="mainCharacter"
        submitHandler={submitHandler as any}
        bootstrap="d-flex flex-column gap-3"
      >
        <Input
          bootstrap="form-control"
          type="text"
          name="name"
          id="name"
          defaultValue={data?.name ?? ""}
        >
          Name
        </Input>

        <Input
          bootstrap="form-control"
          type="number"
          name="id_num"
          id="id_num"
          defaultValue={data?.id_num ?? ""}
        >
          ID
        </Input>

        <Input
          bootstrap="form-control"
          type="text"
          name="jobs"
          id="jobs"
          defaultValue={
            Array.isArray(data?.jobs)
              ? data.jobs.join(",")
              : (data?.jobs ?? "")
          }
        >
          Treballs (separat per ",")
        </Input>

        <Input
          bootstrap="form-control"
          type="text"
          name="image"
          id="image"
          defaultValue={data?.image ?? ""}
        >
          Image URL
        </Input>

        <Textarea
          bootstrap="form-control"
          name="description"
          id="description"
          rows={4}
          defaultValue={data?.description ?? ""}
        >
          Descripció
        </Textarea>

        <Button bootstrap="btn btn-success" type="submit">
          {!data ? "Afegir" : "Editar"}
        </Button>
      </Form>
    </Modal>
  );
}

export default MainCharacterForm;
