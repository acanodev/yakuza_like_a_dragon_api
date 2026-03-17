import Modal from "../Modal";
import "./MainCharacterModal.css";
import type { MainCharacter } from "../../types/Main_Character";
import { formattedDate } from "../../helpers/formattedDate";

type MainCharacterModalProps = {
  show: boolean;
  data: MainCharacter | null;
  toggleShow: () => void;
};

type DetailField = {
  label: string;
  field: keyof MainCharacter;
};

const detailFields: DetailField[] = [
  { label: "ID", field: "id_num" },
  { label: "Nom", field: "name" },
  { label: "Data de naixement", field: "birth_date" },
  { label: "Treballs", field: "jobs" },
  { label: "Descripció", field: "description" },
  { label: "Personatge jugable", field: "isPlayable" }
];

function MainCharacterModal({
  show,
  data,
  toggleShow,
}: MainCharacterModalProps) {
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
          {data.image && (
            <img src={data.image} alt={data.name} className="mb-3" />
          )}

          {detailFields.map(({ label, field }) => {
            const value = data[field];

            let displayValue;

            if (Array.isArray(value)) {
              displayValue = value.length >= 1 ? value.join(", ") : "-";
            } else if (field === "birth_date" && typeof value === "string") {
              displayValue = value ? formattedDate(value) : "-";
            } else if (field === "isPlayable") {
              displayValue = value ? "✅" : "❌";
            } else if (value === null || value === undefined || value === "") {
              displayValue = "-";
            } else {
              displayValue = value;
            }

            return (
              <p key={field}>
                <strong>{label}:</strong> {displayValue}
              </p>
            );
          })}
        </div>
      )}
      </Modal>
    </>
  );
}

export default MainCharacterModal;
