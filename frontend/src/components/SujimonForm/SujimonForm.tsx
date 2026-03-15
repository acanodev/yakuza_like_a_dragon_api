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

function SujimonForm({ show, data, submitHandler, toggleShow }: SujimonFormProps) {
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
        <Input bootstrap="form-control" type="text" name="name" id="name">
          Name
        </Input>

        <Input bootstrap="form-control" type="number" name="id_num" id="id_num">
          ID Number
        </Input>

        <Input bootstrap="form-control" type="text" name="category" id="category">
          Category
        </Input>

        <Input
          bootstrap="form-control"
          type="text"
          name="common_locations"
          id="common_locations"
        >
          Common Locations (separated by ",")
        </Input>

        <Input bootstrap="form-control" type="number" name="rarity" id="rarity">
          Rarity
        </Input>

        <Input bootstrap="form-control" type="text" name="skills" id="skills">
          Skills (separated by ",")
        </Input>

        <Input bootstrap="form-control" type="text" name="weaknesses" id="weaknesses">
          Weaknesses (separated by ",")
        </Input>

        <Input bootstrap="form-control" type="text" name="drops" id="drops">
          Drops (separated by ",")
        </Input>

        <Input bootstrap="form-control" type="text" name="image" id="image">
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
          {!data ? "Crear Sujimon" : "Editar Sujimon"}
        </Button>
      </Form>
    </Modal>
  );
}

export default SujimonForm;