// App.js

import React, { Component } from "react";
import ReactDOM from "react-dom";

import Overview from "./Overview";
import uniqid from "uniqid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
library.add(faUser);

class App extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);

    this.state = {
      task: {
        text: "",
        id: uniqid(),
      },
      tasks: [],
    };
  }

  handleChange = (e) => {
    this.setState({
      task: {
        text: e.target.value,
        id: this.state.task.id,
      },
    });
  };

  handleDelete = (event, id_to_be_deleted) => {
    event.preventDefault();
    this.setState({
      tasks: this.state.tasks.filter((task) => {
        return task.id != id_to_be_deleted;
      }),
      task: {
        text: "",
        id: uniqid(),
      },
    });
  };

  handleEdit = (event, id_to_be_edited) => {
    event.preventDefault();
    const edit_form = document.querySelector(`#${id_to_be_edited}`);

    edit_form.innerHTML = `
    <form id="edit_form_${id_to_be_edited}">
          <label htmlFor="taskEdit">Edit task</label>
          <input
            value=${
              this.state.tasks.filter((task) => {
                return task.id == id_to_be_edited;
              })[0].text
            }
            type="text"
            name="taskEdit"
            required
          />
          <button type="submit">Edit Task</button>
        </form>`;

    const edit_form_listener = document.querySelector(
      `#edit_form_${id_to_be_edited}`
    );

    edit_form_listener.addEventListener("submit", (event) => {
      const formData = new FormData(event.target);
      const task_title = formData.get("taskEdit");
      const target_array = this.state.tasks;

      const target_index = () => {
        for (let i = 0; i < target_array.length; i++) {
          if (target_array[i].id == id_to_be_edited) {
            return i;
          }
        }
      };

      const copy_array = structuredClone(target_array);
      copy_array[target_index()].text = task_title;

      this.setState({
        tasks: copy_array,
      });

      // const JSX = (
      //   <FontAwesomeIcon
      //     icon={faPenSquare}
      //     onClick={(event) => this.handleEdit(event, id_to_be_edited)}
      //   />
      // );
      // ReactDOM.render(JSX, edit_form);

      // This will give warnings:
      // 1.
      // react_devtools_backend.js:4012 Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot
      // 2.
      // react_devtools_backend.js:4012 Warning: render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.

      event.preventDefault();
    });
  };

  onSubmitTask = (event) => {
    event.preventDefault();
    this.setState({
      tasks: this.state.tasks.concat(this.state.task),
      task: {
        text: "",
        id: uniqid(),
      },
    });
  };

  render() {
    const { task, tasks } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmitTask}>
          <label htmlFor="taskInput">Enter task</label>
          <input
            onChange={this.handleChange}
            value={task.text}
            type="text"
            id="taskInput"
          />
          <button type="submit">Add Task</button>
        </form>
        <Overview
          tasks={tasks}
          delete={this.handleDelete}
          edit={this.handleEdit}
        />
      </div>
    );
  }
}

export default App;
