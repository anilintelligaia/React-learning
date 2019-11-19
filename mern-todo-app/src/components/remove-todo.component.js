import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import { withRouter } from "react-router-dom";

import {
  Route,
  Router,
  NavLink,
  HashRouter,
  BrowserRouter
} from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import axios from "axios";

import { format } from "path";
export default class RemoveTodo extends Component {
  constructor(props) {
    super(props);
  }

  NavToHom = () => {
    this.props.history.push("/");
  };

  submit = () => {
    confirmAlert({
      title: "Confirm to Delete Task",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            axios
              .get(
                "http://localhost:4000/todos/delete/" +
                  this.props.match.params.id
              )
              .then(response => {
                console.log(response);
                alert("Record Successfully Deleted");
                this.NavToHom();
              })
              .catch(function(error) {
                console.log(error);
              })
        },
        {
          label: "No",
          onClick: () => {
            alert("You Will be Redirecting to Task-list");
            this.NavToHom();
          }
        }
      ]
    });
  };

  render() {
    const mystyle = {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "20px",
      fontFamily: "Arial",
      margin: "20px"
    };
    return (
      <div className="container">
        <button style={mystyle} onClick={this.submit}>
          Delete Task
        </button>
        <button style={mystyle} onClick={this.NavToHom}>
          Cancel
        </button>
      </div>
    );
  }
}
