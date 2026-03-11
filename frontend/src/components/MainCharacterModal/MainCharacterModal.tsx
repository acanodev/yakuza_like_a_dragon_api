import Modal from "../Modal";
import "./MainCharacterModal.css";
import type { MainCharacter } from "../../types/Main_Chartacter";

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
  { label: "Treballs", field: "jobs" },
  { label: "Descripció", field: "description" },
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

export default MainCharacterModal;
