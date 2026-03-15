import Modal from "../Modal";
import "./SujimonModal.css";
import type { Sujimon } from "../../types/Sujimon";

type SujimonModalProps = {
  show: boolean;
  data: Sujimon | null;
  toggleShow: () => void;
};

type DetailField = {
  label: string;
  field: keyof Sujimon;
};

const detailFields: DetailField[] = [
  { label: "ID", field: "id_num" },
  { label: "Nom", field: "name" },
  { label: "Categoria", field: "category" },
  { label: "Ubicacions comuns", field: "common_locations" },
  { label: "Raresa", field: "rarity" },
  { label: "Habilitats", field: "skills" },
  { label: "Debilitats", field: "weaknesses" },
  { label: "Drops", field: "drops" },
  { label: "Descripció", field: "description" },
];

function SujimonModal({ show, data, toggleShow }: SujimonModalProps) {
  return (
    <>
      <Modal
        show={show}
        title={data?.name}
        submitButton={false}
        secondaryButtonText="Sortir"
        toggleShow={toggleShow}
      >
        {data && (
          <div className="text-center">
            <img src={data.image} alt="" className="mb-3" />
            {detailFields.map(({ label, field }) => (
              <p key={field}>
                <strong>{label}:</strong>{" "}
                {Array.isArray(data[field])
                  ? data[field].join(", ") || "-"
                  : data[field]}
              </p>
            ))}
          </div>
        )}
      </Modal>
    </>
  );
}

export default SujimonModal;
