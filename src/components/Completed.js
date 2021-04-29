

import Todo from "./shared/Todo";
import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const Completed = () => {
  const { todo } = useContext(TodoContext);

  return (
    <div className="w-11/12 md:w-2/3 mx-auto mb-4 rounded-lg p-6 ">
      {todo.map((data) => (
        <div>
          {data.status === "Completed" && <Todo data={data} key={data.task} />}
        </div>
      ))}
    </div>
  );
};

export default Completed;
