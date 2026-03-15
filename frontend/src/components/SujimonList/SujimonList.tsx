import "./SujimonList.css";
import { useState, useEffect } from "react";
import Card from "../Card";
import Button from "../Button";
import { useGetAxios } from "../../hooks/useAxios";
import { usePostAxios } from "../../hooks/useAxios";
import { usePutAxios } from "../../hooks/useAxios";
import { useDeleteAxios } from "../../hooks/useAxios";
import type { Sujimon, NewSujimon } from "../../types/Sujimon";
import type { ListType } from "../../types/ListType";
import { BASE_URL, SUJIMON_ENDPOINT } from "../../constants/consts";
import List from "../List";
import Modal from "../Modal";
import SujimonModal from "../SujimonModal/SujimonModal";
import SujimonForm from "../SujimonForm/SujimonForm";

type SujimonListProps = {
  switchList: (curList: ListType) => void;
};

function SujimonList({ switchList }: SujimonListProps) {
  const [reloadURLKey, setReloadURLKey] = useState<number>(0);
  const [showSujimonDetail, setShowSujimonDetail] = useState<boolean>(false);
  const [showSujimonForm, setShowSujimonForm] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const {
    data: allData,
    loading: allLoading,
    error: allError,
  } = useGetAxios<Sujimon[]>(
    `${BASE_URL}/${SUJIMON_ENDPOINT}?r=${reloadURLKey}`,
  );

  const {
    data: current,
    loading: loadingCurrent,
    error: errorCurrent,
  } = useGetAxios<Sujimon>(
    selectedId ? `${BASE_URL}/${SUJIMON_ENDPOINT}/${selectedId}` : null,
  );

  const {
    handlePost,
    loading: uploading,
    error: postError,
  } = usePostAxios<Sujimon, NewSujimon>();

  const {
    handlePut,
    loading: updating,
    error: putError,
  } = usePutAxios<Sujimon, NewSujimon>();

  const {
    handleDelete,
    loading: deleting,
    error: deleteError,
  } = useDeleteAxios<void>();

  const showDetail = (id: number) => {
    setShowSujimonDetail(true);
    setSelectedId(id);
  };

  const closeDetail = () => {
    setShowSujimonDetail(false);
    setSelectedId(null);
  };

  const showForm = (id: number | undefined) => {
    setShowSujimonForm(true);
    if (id) {
      setSelectedId(id);
    }
  };

  const closeForm = () => {
    setShowSujimonForm(false);
    if (selectedId) {
      setSelectedId(null);
    }
  };

  const createSujimon = (data: any) => {
    const url = `${BASE_URL}/${SUJIMON_ENDPOINT}`;

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

  const editSujimon = (data: any) => {
    if (!selectedId) return;

    const url = `${BASE_URL}/${SUJIMON_ENDPOINT}/${selectedId}`;

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

  const deleteSujimon = (id: number) => {
    if (!id) {
      closeDelete();
      return;
    }

    const url = `${BASE_URL}/${SUJIMON_ENDPOINT}/${id}`;
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
            bootstrap="btn btn-mc text-white"
            type="button"
            action={() => switchList("sujimon")}
          >
            <i className="fa-solid fa-dragon pe-4"></i> Canviar a llistat de
            Main Characters
          </Button>
        </div>
        <div className="col-3">
          <Button
            bootstrap="btn btn-warning"
            type="button"
            action={() => showForm(undefined)}
          >
            <i className="fa-solid fa-circle-plus pe-4"></i> Afegir Sujimon
          </Button>
        </div>
      </div>

      <Card headerText="Sujimon" id="sujimonList">
        <List
          content={allData ?? []}
          showDetail={showDetail}
          showEdit={showForm}
          showDelete={showDelete}
        ></List>
      </Card>

      <SujimonModal
        show={showSujimonDetail}
        data={current}
        toggleShow={closeDetail}
      ></SujimonModal>

      <SujimonForm
        key={current?.id_num ?? "new"}
        show={showSujimonForm}
        data={current ?? undefined}
        toggleShow={closeForm}
        submitHandler={!current ? createSujimon : editSujimon}
      ></SujimonForm>

      <Modal
        show={showDeleteModal}
        title={`Eliminar ${current?.name}`}
        submitButton={true}
        submitButtonText="Eliminar"
        submitButtonBootstrap="btn btn-danger"
        toggleShow={closeDelete}
        action={deleteSujimon}
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

export default SujimonList;
