import "./SujimonForm.css";
import Form from "../Form";
import Input from "../Input";
import Textarea from "../Textarea";
import Modal from "../Modal";
import Button from "../Button";
import type { z } from "zod";
import { sujimonSchema } from "../../schemas/sujimon";
import type { Sujimon } from "../../types/Sujimon";

type SujimonFormData = z.input<typeof sujimonSchema>;

type SujimonFormProps = {
  show: boolean;
  data?: Sujimon;
  submitHandler: (data: SujimonFormData) => void;
  toggleShow: () => void;
};

function SujimonForm({
  show,
  data,
  submitHandler,
  toggleShow,
}: SujimonFormProps) {
  return (
    <Modal
      show={show}
      title={data ? `Editar ${data.name}` : "Crear Sujimon"}
      submitButton={false}
      toggleShow={toggleShow}
    >
      <Form
        id="sujimonForm"
        schema="sujimon"
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
          name="category"
          id="category"
          defaultValue={data?.category ?? ""}
        >
          Categoria
        </Input>

        <Input
          bootstrap="form-control"
          type="text"
          name="common_locations"
          id="common_locations"
          defaultValue={
            Array.isArray(data?.common_locations)
              ? data.common_locations.join(",")
              : (data?.common_locations ?? "")
          }
        >
          Ubicacions comuns (separat per ",")
        </Input>

        <Input
          bootstrap="form-control"
          type="number"
          name="rarity"
          id="rarity"
          defaultValue={data?.rarity ?? ""}
        >
          Raresa
        </Input>

        <Input
          bootstrap="form-control"
          type="text"
          name="skills"
          id="skills"
          defaultValue={
            Array.isArray(data?.skills)
              ? data.skills.join(",")
              : (data?.skills ?? "")
          }
        >
          Habilitats (separat per ",")
        </Input>

        <Input
          bootstrap="form-control"
          type="text"
          name="weaknesses"
          id="weaknesses"
          defaultValue={
            Array.isArray(data?.weaknesses)
              ? data.weaknesses.join(",")
              : (data?.weaknesses ?? "")
          }
        >
          Debilitats (separat per ",")
        </Input>

        <Input
          bootstrap="form-control"
          type="text"
          name="drops"
          id="drops"
          defaultValue={
            Array.isArray(data?.drops)
              ? data.drops.join(",")
              : (data?.drops ?? "")
          }
        >
          Drops (separat per ",")
        </Input>

        <Input
          bootstrap="form-control"
          type="url"
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
        >
          Description
        </Textarea>

        <Button bootstrap="btn btn-success" type="submit">
          {!data ? "Afegir" : "Editar"}
        </Button>
      </Form>
    </Modal>
  );
}

export default SujimonForm;
