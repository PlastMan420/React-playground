import React from "react";
import { FormEvent, useEffect, useRef, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

function Todo() {
  const [store, setStore] = useLocalStorage([{ name: "hello", id: 1 }]);
  const [counter, setCounter] = useState(2);

  const [state, setState] = useState(store);

  const css = "";
  const input = useRef<HTMLInputElement>(null);
  const deleteBtn = useRef<HTMLButtonElement>(null);

  // const container = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  // 	container.current!.style.width = "20vw";
  // }), [container];

  const list = state.map((x) => {
    return (
      <li key={x.id}>
        <div className="d-flex justify-content-between w-100">
          <p>{x.name}</p>
          <button
            onClick={(e) => removeItem(x.id)}
            value={x.id}
            ref={deleteBtn}
          >
            X
          </button>
        </div>
      </li>
    );
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (input.current == null || input.current.value.length < 1) {
      return;
    }

    let value = input.current.value ?? "";

    setCounter(counter + 1);

    const newRow = { name: value, id: counter };

    setState((prevState) => [...prevState, newRow]);

    setStore([...store, newRow]);
    input.current.value = "";
  }

  function removeItem(e: number) {
    const newState = state.filter((x) => x.id !== e);
    setState(newState);
    setStore(newState);
  }

  return (
    <React.Fragment>
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

        <div style={{ height: "50vh", overflowY: "scroll" }}>
          <ul>{list}</ul>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Todo;
