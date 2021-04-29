import { useContext, useEffect, useRef, useState } from "react";
import { TodoContext } from "../../context/TodoContext";

const options = ["high", "medium", "low"];

const InputField = () => {
  const { todo, setTodo, lastGeneratedId, setLastGeneratedId } = useContext(
    TodoContext
  );
  const input = useRef(null);
  const select = useRef(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
  }, [showAlert]);

  return (
    <form
      className="py-6 w-full m-5 md:flex justify-center items-center"
      onSubmit={async (e) => {
        e.preventDefault();
        if (input.current.value.length < 4) return;
        let count = 0;
        todo.forEach((data) => {
          if (
            data.status === "Pending" &&
            data.priority === select.current.value
          ) {
            count += 1;
          }
        });
        if (select.current.value === "high" && count >= 2) {
          setAlertMsg("Cannot add more than 2 tasks in high priority");
          setShowAlert(true);
          select.current.value = "medium";
          return;
        } else if (select.current.value === "medium" && count >= 4) {
          setAlertMsg("Cannot add more than 4 tasks in medium priority");
          setShowAlert(true);
          select.current.value = "low";
          return;
        } else if (select.current.value === "low" && count >= 6) {
          setAlertMsg("Cannot add more than 6 tasks in low priority");
          setShowAlert(true);
          return;
        }
        await setLastGeneratedId(lastGeneratedId + 1);
        await setTodo((todos) => [
          ...todos,
          {
            id: lastGeneratedId,
            task: input.current.value,
            status: "Pending",
            priority: select.current.value,
          },
        ]);
        input.current.value = "";
      }}
      action=""
    >
      {showAlert && (
        <div className="bg-red-500 fixed top-5 left-1/2 transform -translate-x-1/2 text-white text-xl px-6 py-3">
          {alertMsg}
        </div>
      )}
      <input
        type="text"
        ref={input}
        placeholder="Enter your todo here.."
        className="bg-gray-200 border-gray-700 border px-5 py-3 rounded-lg mr-4"
      />
      <div className="flex items-stretch mt-4 md:mt-0">
        <select
          ref={select}
          placeholder="select one priority"
          className="bg-gray-200 border-gray-700 border px-5 py-3 appearance-none rounded-lg mr-4"
        >
          {options.map((value) => (
            <option value={value}>{value} </option>
          ))}
        </select>
        <button className="bg-blue-600 text-white  px-5 py-2 rounded-lg">
          Add Todo
        </button>
      </div>
    </form>
  );
};

export default InputField;
