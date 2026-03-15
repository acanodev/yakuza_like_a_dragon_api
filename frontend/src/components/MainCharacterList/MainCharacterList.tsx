import "./MainCharacterList.css";
import { useState, useEffect } from "react";
import Card from "../Card";
import Button from "../Button";
import { useGetAxios } from "../../hooks/useAxios";
import { usePostAxios } from "../../hooks/useAxios";
import { usePutAxios } from "../../hooks/useAxios";
import { useDeleteAxios } from "../../hooks/useAxios";
import type {
  MainCharacter,
  NewMainCharacter,
} from "../../types/Main_Character";
import type { ListType } from "../../types/ListType";
import { BASE_URL, MAIN_CHARACTERS_ENDPOINT } from "../../constants/consts";
import List from "../List";
import Modal from "../Modal";
import MainCharacterModal from "../MainCharacterModal/MainCharacterModal";
import MainCharacterForm from "../MainCharacterForm/MainCharacterForm";

type MainCharacterListProps = {
  switchList: (curList: ListType) => void;
};

function MainCharacterList({ switchList }: MainCharacterListProps) {
  const [reloadURLKey, setReloadURLKey] = useState<number>(0);
  const [showMcDetail, setShowMcDetail] = useState<boolean>(false);
  const [showMcForm, setShowMcForm] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const {
    data: allData,
    loading: allLoading,
    error: allError,
  } = useGetAxios<MainCharacter[]>(
    `${BASE_URL}/${MAIN_CHARACTERS_ENDPOINT}?r=${reloadURLKey}`,
  );

  const {
    data: current,
    loading: loadingCurrent,
    error: errorCurrent,
  } = useGetAxios<MainCharacter>(
    selectedId ? `${BASE_URL}/${MAIN_CHARACTERS_ENDPOINT}/${selectedId}` : null,
  );

  const {
    handlePost,
    loading: uploading,
    error: postError,
  } = usePostAxios<MainCharacter, NewMainCharacter>();

  const {
    handlePut,
    loading: updating,
    error: putError,
  } = usePutAxios<MainCharacter, NewMainCharacter>();

  const {
    handleDelete,
    loading: deleting,
    error: deleteError,
  } = useDeleteAxios<void>();

  const showDetail = (id: number) => {
    setShowMcDetail(true);
    setSelectedId(id);
  };

  const closeDetail = () => {
    setShowMcDetail(false);
    setSelectedId(null);
  };

  const showForm = (id: number | undefined) => {
    setShowMcForm(true);
    if (id) {
      setSelectedId(id);
    }
  };

  const closeForm = () => {
    setShowMcForm(false);
    if (selectedId) {
      setSelectedId(null);
    }
  };

  const createMainCharacter = (data: any) => {
    const url = `${BASE_URL}/${MAIN_CHARACTERS_ENDPOINT}`;

    handlePost(
      url,
      {
        ...data,
        description: data.description?.trim() || "",
      },
      () => {
        closeForm();
        setReloadURLKey((prev) => prev + 1);
      },
    );
  };

  const editMainCharacter = (data: any) => {
    if (!selectedId) return;

    const url = `${BASE_URL}/${MAIN_CHARACTERS_ENDPOINT}/${selectedId}`;

    handlePut(
      url,
      {
        ...data,
        description: data.description?.trim() || "Sin descripción",
      },
      () => {
        closeForm();
        setReloadURLKey((prev) => prev + 1);
      },
    );
  };

  const showDelete = (id: number) => {
    setShowDeleteModal(true);
    setSelectedId(id);
  };

  const closeDelete = () => {
    setShowDeleteModal(false);
    setSelectedId(null);
  };

  const deleteMainCharacter = (id: number) => {
    if (!id) {
      closeDelete();
      return;
    }

    const url = `${BASE_URL}/${MAIN_CHARACTERS_ENDPOINT}/${id}`;
    handleDelete(url, () => {
      closeDelete();
      setReloadURLKey((prev) => prev + 1);
    });
  };

  return (
    <>
      <div className="row mb-5">
        <div className="col-3">
          <Button
            bootstrap="btn btn-sujimon text-white"
            type="button"
            action={() => switchList("mainCharacters")}
          >
            <i className="fa-solid fa-skull pe-4"></i> Canviar a llistat de
            Sujimon
          </Button>
        </div>
        <div className="col-3">
          <Button
            bootstrap="btn btn-warning"
            type="button"
            action={() => showForm(undefined)}
          >
            <i className="fa-solid fa-circle-plus pe-4"></i> Afegir Main
            Character
          </Button>
        </div>
      </div>

      <Card headerText="Main Characters" id="mainCharacterList">
        <List
          content={allData ?? []}
          showDetail={showDetail}
          showEdit={showForm}
          showDelete={showDelete}
        ></List>
      </Card>

      <MainCharacterModal
        show={showMcDetail}
        data={current}
        toggleShow={closeDetail}
      ></MainCharacterModal>

      <MainCharacterForm
        key={current?.id_num ?? "new"}
        show={showMcForm}
        data={current ?? undefined}
        toggleShow={closeForm}
        submitHandler={!current ? createMainCharacter : editMainCharacter}
      ></MainCharacterForm>

      <Modal
        show={showDeleteModal}
        title={`Eliminar ${current?.name}`}
        submitButton={true}
        submitButtonText="Eliminar"
        submitButtonBootstrap="btn btn-danger"
        toggleShow={closeDelete}
        action={deleteMainCharacter}
        target={current?.id_num}
      >
        <span>
          Estàs segur que vols eliminar {current?.name}? Aquesta acció és
          irreversible!
        </span>
      </Modal>
    </>
  );
}

export default MainCharacterList;
