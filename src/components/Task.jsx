import React from "react";

const Task = (props) => {
  return (
    <li className="flex justify-between w-full">
      <div className="flex gap-4">
        <input
          type="checkbox"
          name="task"
          id="task"
          onChange={() => props.toggleTaskStatus(props.task.id)}
          checked={props.task.done}
        />
        <label htmlFor="task">{props.task.text}</label>
      </div>
      <div className="flex gap-4">
        <button onClick={() => props.updateTask(props.task.id)}>Update</button>
        <button onClick={() => props.deleteTask(props.task.id)}>Delete</button>
      </div>
    </li>
  );
};

export default Task;
