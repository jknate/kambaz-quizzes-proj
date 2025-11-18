"use client";
import React, { useState } from "react";
import FormControl from "react-bootstrap/FormControl";

const HTTP_SERVER = "/api/proxy";

export default function WorkingWithArrays() {
  const API = `${HTTP_SERVER}/lab5/todos`;
  const [todo, setTodo] = useState({
    id: "1",
    title: "Task",
    description: "Task description",
    completed: false,
  });

  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>
      <h4>Retrieving Arrays</h4>
      <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
        Get Todos
      </a>
      <hr />

      <h4>Creating new Items in an Array</h4>
      <a id="wd-create-todo" className="btn btn-primary" href={`${API}/create`}>
        Create Todo
      </a>
      <hr />

      <h4>Retrieving an Item from an Array by ID</h4>
      <a
        id="wd-retrieve-todo-by-id"
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}`}
      >
        Get Todo by ID
      </a>
      <FormControl
        id="wd-todo-id"
        defaultValue={todo.id}
        className="w-50"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <hr />

      <h4>Removing from an Array</h4>
      <a
        id="wd-remove-todo"
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}/delete`}
      >
        Remove Todo with ID = {todo.id}
      </a>
      <FormControl
        defaultValue={todo.id}
        className="w-50"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <hr />

      <h4>Updating an Item in an Array</h4>
      <a
        id="wd-update-todo"
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}/title/${encodeURIComponent(todo.title)}`}
      >
        Update Todo
      </a>
      <FormControl
        defaultValue={todo.id}
        className="w-25 float-start me-2"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <FormControl
        defaultValue={todo.title}
        className="w-50 float-start"
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <br />
      <br />
      <hr />

      <h4>Updating Description and Completed</h4>
      <a
        id="wd-update-todo-description"
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}/description/${encodeURIComponent(
          todo.description
        )}`}
      >
        Update Description
      </a>
      <FormControl
        defaultValue={todo.description}
        className="w-50 float-start me-2"
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      />
      <label className="ms-2">
        <input
          id="wd-todo-completed"
          type="checkbox"
          className="form-check-input ms-2"
          checked={todo.completed}
          onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
        />
        Completed
      </label>
      <a
        id="wd-update-todo-completed"
        className="btn btn-secondary ms-2"
        href={`${API}/${todo.id}/completed/${todo.completed}`}
      >
        Update Completed
      </a>
      <hr />

      <h4>Filtering Array Items</h4>
      <a
        id="wd-retrieve-completed-todos"
        className="btn btn-primary"
        href={`${API}?completed=true`}
      >
        Get Completed Todos
      </a>
      <hr />
    </div>
  );
}
