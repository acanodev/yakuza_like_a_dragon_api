import Card from "./Card";
import Button from "./Button";
import type { MainCharacter } from "../types/Main_Chartacter";
import type { Sujimon } from "../types/Sujimon";

type ListProps = {
  content: (MainCharacter | Sujimon)[];
  showDetail: (id: any) => void;
  showDelete: (id: any) => void;
  showEdit: (id: any) => void;
};

function List({ content, showDetail, showDelete, showEdit }: ListProps) {
  return (
    <ul className="d-flex flex-wrap ms-4">
      {content?.map((el) => (
        <li key={el.id_num} className="ms-1">
          <Card headerText={undefined} id={undefined}>
            <div className="text-center">
              <img src={el.image} alt="" />
              <h2 className="el-name mt-2">{el.name}</h2>

              {"category" in el && (
                <p>
                  <strong>Categoria: </strong> {el.category}
                </p>
              )}

              <div>
                <Button
                  bootstrap="btn btn-warning me-3"
                  action={() => showDetail(el.id_num)}
                >
                  <i className="fa-solid fa-eye"></i>
                </Button>

                <Button
                  bootstrap="btn btn-success me-3"
                  action={() => showEdit(el.id_num)}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </Button>

                <Button
                  bootstrap="btn btn-danger"
                  action={() => showDelete(el.id_num)}
                >
                  <i className="fa-solid fa-trash"></i>
                </Button>
              </div>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
}

export default List;