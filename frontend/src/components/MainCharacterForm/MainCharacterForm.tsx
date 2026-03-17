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
  const formattedDate = (date?: string) => {
    if (!date) return "";
    const d = new Date(date); // Data que arriba des de data
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0"); // getMonth per defecte comença des de 0. Per tant hem de sumar 1.
    // padStart serveix per afegir un 0 al inici en cas de que el número tingui menys de dos caràcters. Març (3) -> 03.
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

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
