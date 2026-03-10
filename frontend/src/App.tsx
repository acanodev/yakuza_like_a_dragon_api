import { useState } from "react";
import "./App.css";
import Button from "./components/Button";

function App() {
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
          aexpanded="false"
          acontrols="modalContent"
        >
          TEST
        </Button>
      </div>
    </>
  );
}

export default App;
