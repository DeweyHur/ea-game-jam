import "./Login.css";

import md5 from "crypto-js/md5";
import React, { Component } from "react";
import { Button, TextField, CardText, Card } from "react-md";
import { login, signup } from "./user";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { signingUp: true, id: "", name: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit() {
    const { reload } = this.props;
    const { signingUp, id, name, rawPassword } = this.state;
    const password = md5(rawPassword).toString();
    const alias = id.split("@")[0];
    if (signingUp) {
      await signup(alias, password, name);
    }
    await login(alias, password);        
    reload();
  }

  render() {
    const { signingUp } = this.state;

    const content = signingUp ? (
      <div id="floating-form" className="Login-form">
        <Card className="caution">
          <CardText>
            ⓘ If it's your first time here, please SIGN UP first with your EA
            Account! ⓘ
          </CardText>
        </Card>
        <Button
          flat
          primary
          swapTheming
          iconBefore={true}
          iconChildren="assignment"
          id="sign-up-button"
          onClick={() => this.setState({ ...this.state, signingUp: false })}
        >
          Do you want to log in?
        </Button>
        <TextField
          required
          id="floating-name"
          label="Enter your Name"
          className="name md-cell md-cell--bottom"
          onChange={name => this.setState({ ...this.state, name })}
        />
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
          onClick={() => (async () => await this.handleSubmit())()}
        >
          Sign up
        </Button>
      </div>
    ) : (
      <div id="floating-form" className="Login-form">
        <Card>
          <CardText>
            ⓘ If it's your first time here, please SIGN UP first with your EA
            Account, click below button! ⓘ
          </CardText>
        </Card>
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
          Back to sign up?
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
          <img src="ea-game-jam-online.png" alt="EA GameJam 2018" />
        </div>
        {content}
      </div>
    );
  }
}
