import { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import type { ListType } from "./types/ListType"

function App() {

  const [list, setList] = useState<ListType>("mainCharacters");

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


      </div>
    </>
  );
}

export default App;
