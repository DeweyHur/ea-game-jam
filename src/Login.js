import md5 from "crypto-js/md5";
import React, { Component } from "react";
import { Button, TextField } from "react-md";
import { login, signup } from "./user";

import "./Login.css";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { signup: false, id: "", name: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { reload } = this.props;
    const { signingUp, id, name, rawPassword } = this.state;
    const password = md5(rawPassword).toString();
    const alias = id.split("@")[0];
    (async () => {
      if (signingUp) {
        await signup(alias, password, name);
      } else {
        await login(alias, password);
      }
      reload();
    })();
  }

  render() {
    const { signingUp } = this.state;

    const content = signingUp ? (
      <div id="floating-form" className="Login-form">
        <Button
          flat
          primary
          swapTheming
          iconBefore={true}
          iconChildren="assignment"
          id="sign-up-button"
          onClick={() => this.setState({ ...this.state, signingUp: false })}
        >
          Sign up?
        </Button>
        <TextField
          required
          id="floating-id"
          label="EA Account"
          type="email"
          placeholder="test@ea.com"
          className="username md-cell md-cell--bottom"
          onChange={id => this.setState({ ...this.state, id })}
        />
        <TextField
          required
          id="floating-password"
          label="Password"
          type="password"
          className="password md-cell md-cell--bottom"
          onChange={rawPassword =>
            this.setState({ ...this.state, rawPassword })
          }
        />
        <TextField
          required
          id="floating-name"
          label="Enter your Name"
          className="name md-cell md-cell--bottom"
          onChange={name => this.setState({ ...this.state, name })}
        />
        <Button
          flat
          primary
          id="floating-submit"
          className="login md-cell-center"
          onClick={() => this.handleSubmit()}
        >
          Sign up
        </Button>
      </div>
    ) : (
      <div id="floating-form" className="Login-form">
        <Button
          flat
          primary
          iconBefore={true}
          iconChildren="assignment"
          id="sign-up-button"
          onClick={() => {
            this.setState({ ...this.state, signingUp: true });
          }}
        >
          Sign up?
        </Button>
        <TextField
          required
          id="floating-id"
          label="EA Account"
          type="email"
          placeholder="test@ea.com"
          className="username md-cell md-cell--bottom"
          onChange={id => this.setState({ ...this.state, id })}
        />
        <TextField
          required
          id="floating-password"
          label="Password"
          type="password"
          className="password md-cell md-cell--bottom"
          onChange={rawPassword =>
            this.setState({ ...this.state, rawPassword })
          }
        />
        <Button
          flat
          primary
          id="floating-submit"
          className="login md-cell-center"
          onClick={() => this.handleSubmit()}
        >
          Log in
        </Button>
      </div>
    );

    const loginError = window.sessionStorage.getItem("EAGameJamLoginError");
    window.sessionStorage.setItem("EAGameJamLoginError", "");

    return (
      <div className="Login">
        <p>{loginError}</p>
        <div className="Login-image">
          <img src="login.PNG" alt="EA GameJam 2018" />
        </div>
        {content}
      </div>
    );
  }
}
