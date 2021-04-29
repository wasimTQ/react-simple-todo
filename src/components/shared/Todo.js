import { useContext } from "react";
import { TodoContext } from "../../context/TodoContext";
import svg from "../../assets/shuffle.svg"

const Todo = ({ data }) => {
  const { todo, setTodo } = useContext(TodoContext);
  return (
    <div className="bg-gray-50 py-4 px-6 w-full mx-auto my-4 shadow-sm flex flex-col md:flex-row items-center justify-between rounded-lg ">
      <h2>
        {data.task} - {data.id}{" "}
      </h2>
      <div className="flex items-center mt-3 md:mt-0">
        <div className="mr-4">
          {data.status !== "Pending" && (
            <div
              className={
                (data.priority !== "low"
                  ? data.priority === "high"
                    ? "bg-red-200 text-red-500"
                    : "bg-green-200 text-green-700"
                  : "bg-yellow-200 text-yellow-500") +
                " px-4 py-1 rounded-full "
              }
            >
              {data.priority}{" "}
            </div>
          )}
        </div>
        {data.status !== "Completed" && (
          <div
            className="cursor-pointer bg-yellow-500 w-10 h-10 mr-3 rounded-full flex items-center justify-center text-white"
            onClick={() => {
              if (data.status === "Shifted") {
                let count = 0;
                todo.forEach((d) => {
                  if (d.status === "Pending" && d.priority === data.priority) {
                    count += 1;
                  }
                });
                if (data.priority === "high" && count >= 2) {
                  return;
                } else if (data.priority === "medium" && count >= 4) {
                  return;
                } else if (data.priority === "low" && count >= 6) {
                  return;
                }
              }
              setTodo(
                todo.map((d, index) =>
                  d.id === data.id
                    ? {
                        ...d,
                        status: d.status === "Pending" ? "Shifted" : "Pending",
                      }
                    : d
                )
              );
            }}
          >
            <img src={svg} className="w-6 text-white h-6" alt=""/>
          </div>
        )}
        {data.status === "Pending" && (
          <div
            className="cursor-pointer bg-green-500 w-10 h-10 mr-3 rounded-full flex items-center justify-center text-white"
            onClick={() =>
              setTodo(
                todo.map((d, index) =>
                  d.id === data.id ? { ...d, status: "Completed" } : d
                )
              )
            }
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
        )}
        <div
          className="cursor-pointer bg-red-500 w-10 h-10 rounded-full flex items-center justify-center text-white"
          onClick={() => setTodo(todo.filter((d, index) => d.id !== data.id))}
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        </div>
      </div>
    </div>
  );
};

export default Todo;
