import React, { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Task from "./components/Task";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [tasksArr, setTasksArr] = useState(() => {
    const saved = localStorage.getItem("taskstorage");
    const init = JSON.parse(saved);
    return init || [];
  });

  useEffect(() => {
    localStorage.setItem("taskstorage", JSON.stringify(tasksArr));
  }, [tasksArr]);

  // Create a new note
  function createTask() {
    let newTask = window.prompt("What is your task?");
    setTasksArr((oldTasksArr) => {
      return [...oldTasksArr, { text: newTask, id: uuidv4(), done: false }];
    });
  }
  // Update an existing note
  function updateTask(id) {
    let updatedTask = window.prompt("What is the updated task?");
    setTasksArr((oldTasksArr) => {
      return oldTasksArr.map((oldTask) =>
        oldTask.id === id ? { ...oldTask, text: updatedTask } : oldTask
      );
    });
  }

  // Delete a note
  function deleteTask(id) {
    setTasksArr((oldTasksArr) => {
      return oldTasksArr.filter((oldTask) => oldTask.id !== id);
    });
  }

  function toggleTaskStatus(id) {
    setTasksArr((oldTasksArr) => {
      return oldTasksArr.map((oldTask) =>
        oldTask.id === id ? { ...oldTask, done: !oldTask.done } : oldTask
      );
    });
  }

  return (
    <div className="flex justify-center">
      <div className="App border border-white p-16 w-1/2 flex flex-col gap-8">
        <h1 className="text-xl">To-do</h1>
        <ul className="flex gap-4 w-auto flex-col">
          {tasksArr.map((task, index) => {
            return (
              <Task
                task={task}
                key={task.id}
                deleteTask={deleteTask}
                updateTask={updateTask}
                toggleTaskStatus={toggleTaskStatus}
              />
            );
          })}
        </ul>
        <button className="px-8 py-6 border border-white" onClick={createTask}>
          Create task
        </button>
      </div>
    </div>
  );
}

export default App;
