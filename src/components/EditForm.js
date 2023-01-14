import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";

library.add(faUser);

class EditForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span id={this.props.id}>
        <FontAwesomeIcon
          icon={faPenSquare}
          onClick={(event) => this.props.edit(event, this.props.id)}
        />
      </span>
    );
  }
}

export default EditForm;
