import "./MainCharacterList.css";
import { useState, useEffect } from "react";
import Card from "../Card";
import Button from "../Button";
import { useGetAxios } from "../../hooks/useAxios";
import { usePostAxios } from "../../hooks/useAxios";
import { useDeleteAxios } from "../../hooks/useAxios";
import type { MainCharacter } from "../../types/Main_Chartacter";
import type { ListType } from "../../types/ListType";
import { BASE_URL, MAIN_CHARACTERS_ENDPOINT } from "../../constants/consts";
import List from "../List";

type MainCharacterListProps = {
  switchList: (curList: ListType) => void;
};

function MainCharacterList({ switchList }: MainCharacterListProps) {
  const [reloadURLKey, setReloadURLKey] = useState(0);

  const { data, loading, error } = useGetAxios<MainCharacter[]>(
    `${BASE_URL}/${MAIN_CHARACTERS_ENDPOINT}?r=${reloadURLKey}`,
  );

  const showDetail = (id: number) => {
    console.log("Detail:", id);
  };

  const showEdit = (id: number) => {
    console.log("Edit:", id);
  };

  const showDelete = (id: number) => {
    console.log("Delete:", id);
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
            action={() => console.log("Create")}
          >
            <i className="fa-solid fa-circle-plus pe-4"></i> Afegir Main
            Character
          </Button>
        </div>
      </div>
      <Card headerText="Main Characters" id="mainCharacterList">
        <List
          content={data ?? []}
          showDetail={showDetail}
          showEdit={showEdit}
          showDelete={showDelete}
        ></List>
      </Card>
    </>
  );
}

export default MainCharacterList;
