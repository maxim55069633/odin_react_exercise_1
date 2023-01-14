// Overview.js

import React from "react";

import EditForm from "./EditForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

library.add(faUser);

const Overview = (props) => {
  const { tasks } = props;

  return (
    <ul>
      {tasks.map((task, order_number) => {
        return (
          <li key={task.id}>
            {order_number + 1} {task.text}
            <EditForm id={task.id} edit={props.edit} />
            <FontAwesomeIcon
              icon={faTrash}
              onClick={(event) => props.delete(event, task.id)}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default Overview;
