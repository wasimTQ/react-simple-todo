import "./App.css";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Home from "./components/Home";
import Shifted from "./components/Shifted";
import Completed from "./components/Completed";
import { TodoContext } from "./context/TodoContext";
import { useState, useMemo, useEffect } from "react";

function App() {
  const [todo, setTodo] = useState([]);
  const [lastGeneratedId, setLastGeneratedId] = useState(0);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const todoProvider = useMemo(
    () => ({ todo, setTodo, lastGeneratedId, setLastGeneratedId }),
    [todo, setTodo, lastGeneratedId, setLastGeneratedId]
  );
  useEffect(() => {
    if (isFirstRender) return;

    localStorage.setItem("todos", JSON.stringify(todo));
    localStorage.setItem("lastGeneratedId", JSON.stringify(lastGeneratedId));
  }, [todo, isFirstRender, lastGeneratedId]);

  useEffect(() => {
    setIsFirstRender(false);
    const todos = JSON.parse(localStorage.getItem("todos"));
    const lastGenerated = JSON.parse(localStorage.getItem("lastGeneratedId"));

    setTodo(todos ? todos : []);
    setLastGeneratedId(lastGenerated ? lastGenerated : 0);
  }, []);

  return (
    <Router>
      <header>
        <nav className="bg-gray-800 px-14 py-6 flex justify-center items-center text-white">
          <ul className="flex justify-center items-center">
            <li>
              <NavLink activeClassName="text-red-400" to="/">Todo Now</NavLink>
            </li>
            <li>
              <NavLink activeClassName="text-red-400" to="/shifted">Tomorrow</NavLink>
            </li>
            <li>
              <NavLink activeClassName="text-red-400" to="/completed">Completed</NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <TodoContext.Provider value={todoProvider}>
        <main className="overflow-x-hidden">
          <Route path="/" exact component={Home} />
          <Route path="/shifted" component={Shifted} />
          <Route path="/completed" component={Completed} />
        </main>
      </TodoContext.Provider>
    </Router>
  );
}

export default App;
