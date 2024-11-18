import React, { useState, useEffect } from "react";
import "./App.css";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);


  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) setTodos(savedTodos);
  }, []);


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTask = () => {
    if (task.trim()) {
      setTodos([...todos, { id: Date.now(), text: task, completed: false }]);
      setTask("");
    }
  };

  const handleToggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const markAllCompleted = () => {
    setTodos(todos.map((todo) => ({ ...todo, completed: true })));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className={`todo-container ${darkMode ? "dark" : ""}`}>
      <h1 className="todo-title">Dynamic To-Do List</h1>

      <div className="todo-controls">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
          className="todo-input"
        />
        <button onClick={handleAddTask} className="todo-add-btn">
          Add
        </button>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="todo-toggle-theme"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div className="todo-filter">
        <button
          className={filter === "all" ? "active-filter" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "active" ? "active-filter" : ""}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={filter === "completed" ? "active-filter" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${
              todo.completed ? "todo-completed" : ""
            }`}
          >
            <span
              className="todo-text"
              onClick={() => handleToggleComplete(todo.id)}
            >
              {todo.text}
            </span>
            <button
              onClick={() => handleDeleteTask(todo.id)}
              className="todo-delete-btn"
            >
              ✖
            </button>
          </li>
        ))}
      </ul>

      <div className="todo-footer">
        <span>{todos.length} Total</span>
        <span>{activeCount} Active</span>
        <span>{completedCount} Completed</span>
        <button onClick={markAllCompleted} className="bulk-action-btn">
          Mark All Completed
        </button>
        <button onClick={clearCompleted} className="bulk-action-btn">
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export default TodoApp;
