import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import InputField from "./shared/InputField";
import Todo from "./shared/Todo";

const TodoContainer = ({ todos, isPriority, color }) => {
  return (
    <div className={"w-11/12 md:w-2/3 mx-auto  mb-4 rounded-lg p-6 " + color}>
      <h1 className="text-white capitalize text-2xl">{isPriority} Priority</h1>
      {todos.map((data) => (
        <div>
          {data.priority === isPriority && data.status === "Pending" && (
            <Todo data={data} key={data.task} />
          )}
        </div>
      ))}
    </div>
  );
};

const Home = () => {
  const { todo } = useContext(TodoContext);

  return (
    <div className="">
      <InputField />
      <TodoContainer todos={todo} isPriority="high" color="bg-red-400" />
      <TodoContainer todos={todo} isPriority="medium" color="bg-yellow-300" />
      <TodoContainer todos={todo} isPriority="low" color="bg-green-300" />
    </div>
  );
};

export default Home;
