import classNames from "classnames";
import "./todo.style.scss";
import { ToDoListRow } from "../../LocalTypes";
import { BsCheckLg, BsArrowUp, BsArrowDown } from "react-icons/bs";
import { ePriority } from "../../enums";

/**
 * @presentational component
 * @param props
 * @returns
 */

function ToDoList(props: any) {
  console.log(props);
  const listStyleClass = classNames({
    "todo-severity-high": props.list,
  });

  return (
    <div style={{ height: "50vh", overflowY: "scroll" }}>
      {/* <ul className={listStyleClass}>{props.list}</ul> */}
      <ul>
        {props.list.map((x: ToDoListRow) => (
          <li
            key={x.id}
            className={
              x.priority === ePriority.High
                ? "todo-severity-high"
                : x.priority === ePriority.Normal
                ? "todo-severity-medium"
                : x.priority === ePriority.Low
                ? "todo-severity-low"
                : ""
            }
          >
            <div className="d-flex justify-content-between w-100">
              <p>{x.name}</p>
              <div className="d-flex">
              <button
                onClick={e => {
                    if( x.priority === ePriority.Low)
                    {
                        return;
                    }
                    props.updatePriorityCallBack(x.id, x.priority-1 as ePriority);
                }}
                >
                    <BsArrowDown/>
                </button>
                <button
                onClick={e => {
                    if( x.priority === ePriority.High)
                    {
                        return;
                    }
                    props.updatePriorityCallBack(x.id, x.priority+1 as ePriority);
                }}
                >
                    <BsArrowUp/>
                </button>
                <button
                  onClick={(e) => props.removeItemCallBack(x.id)}
                  value={x.id}
                >
                  <BsCheckLg />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
