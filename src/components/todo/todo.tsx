import { FormEvent, useRef, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { ToDoListRow } from "../../LocalTypes";
import ToDoList from "./todoList";
import { ePriority } from "../../enums";

function Todo() {
  const [store, setStore] = useLocalStorage([
    { name: "hello", id: 1, isDone: false, priority: ePriority.Low },
  ] as ToDoListRow[]);
  const [counter, setCounter] = useState<number>(2);
  const [state, setState] = useState<ToDoListRow[]>(store);

  const input = useRef<HTMLInputElement>(null);

  function removeItem(e: number) {
    const newState = state.filter((x: ToDoListRow) => x.id !== e) ?? null;
    if (!newState) return;

    setState(newState);
    setStore(newState);
  }

  function updatePriority(e: number, priority: ePriority | number) {
    const newState = state.map((x) => {
      return x.id === e ? { ...x, priority: priority } : x;
    });

    setState(newState);
    setStore(newState);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (input.current == null || input.current.value.length < 1) {
      return;
    }

    let value = input.current.value ?? "";

    setCounter(counter + 1);

    const newRow: ToDoListRow = {
      name: value,
      id: counter,
      isDone: false,
      priority: ePriority.Low,
    };

    setState((prevState) => [...prevState, newRow]);

    setStore([...store, newRow]);
    input.current.value = "";
  }

  return (
    <div style={{ width: "20vw" }}>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="new item"
            ref={input}
          />
          <label>new item</label>
        </div>

        <button type="submit">Add</button>
      </form>

      <ToDoList
        list={state}
        removeItemCallBack={removeItem}
        updatePriorityCallBack={updatePriority}
      />
    </div>
  );
}

export default Todo;
