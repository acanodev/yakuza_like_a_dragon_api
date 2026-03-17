import "./MainCharacterForm.css";
import Form from "../Form";
import Input from "../Input";
import Textarea from "../Textarea";
import Modal from "../Modal";
import Button from "../Button";
import type { z } from "zod";
import { mainCharacterSchema } from "../../schemas/mainCharacter";
import type { MainCharacter } from "../../types/Main_Character";
import Checkbox from "../Checkbox";
import { formattedDate } from "../../helpers/formattedDate";

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
          Nom
        </Input>

        <Input
          bootstrap="form-control"
          type="date"
          name="birth_date"
          id="birth_date"
          defaultValue={data?.birth_date ? formattedDate(data.birth_date) : ""}
        >
          Data de naixement
        </Input>

        <Input
          bootstrap="form-control"
          type="text"
          name="jobs"
          id="jobs"
          defaultValue={
            Array.isArray(data?.jobs) ? data.jobs.join(",") : (data?.jobs ?? "")
          }
        >
          Treballs (separat per ",")
        </Input>

        <Input
          bootstrap="form-control"
          type="url"
          name="image"
          id="image"
          defaultValue={data?.image ?? ""}
        >
          URL d'imatge
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

        <Checkbox
          bootstrap="form-check-input"
          name="isPlayable"
          id="isPlayable"
          defaultChecked={data?.isPlayable ? true : false}
        >
          <span className="form-check-label">Personatge jugable</span>
        </Checkbox>

        <Button bootstrap="btn btn-success" type="submit">
          {!data ? "Afegir" : "Editar"}
        </Button>
      </Form>
    </Modal>
  );
}

export default MainCharacterForm;
