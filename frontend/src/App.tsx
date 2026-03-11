import { useState, useEffect } from "react";
import "./App.css";
import Button from "./components/Button";
import type { ListType } from "./types/ListType";
import { ACTIVE_LIST_KEY } from "./constants/consts";
import MainCharacterList from "./components/MainCharacterList/MainCharacterList";

function App() {

  const [list, setList] = useState(() => {
    return localStorage.getItem(ACTIVE_LIST_KEY) || "mainCharacters";
  }); // mainCharacters | sujimon
  useEffect(() => {
    localStorage.setItem(ACTIVE_LIST_KEY, list);
  });

  const switchList = (curList : ListType) : void => {
    const selectedList = curList !== "mainCharacters" ? "mainCharacters" : "sujimon";
    setList(selectedList);
  };

  return (
    <>
      <div className="container">
        <header className="mt-5">
          <h1 className="text-white display-3">
            Frontend Yakuza Like a Dragon API
          </h1>
        </header>

        <Button
          bootstrap="btn btn-primary"
          type="button"
          action={() => console.log("clic")}
          dtoggle="modal"
          dtarget="#myModal"
          aexpanded={false}
          acontrols="modalContent"
        >
          TEST
        </Button>

        <div className="mt-4">
          <MainCharacterList switchList={switchList}></MainCharacterList>
        </div>
      </div>
    </>
  );
}

export default App;
