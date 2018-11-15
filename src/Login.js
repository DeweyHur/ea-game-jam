import React, { Component } from 'react';
import { TextField, Button } from 'react-md';
import RESTful from './fetch';
import './Login.css';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { signup: false, id: '', name: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const { signup, id, name } = this.state;
    const alias = id.split('@')[0];
    (async () => {
      if (signup) {
        try {
          const user = await RESTful.PUT(`/user/${alias}`, { name });
          window.sessionStorage.setItem("EAGameJamAccount", user.name);
        } catch (e) {
          window.sessionStorage.setItem("EAGameJamLoginError", `${id} is already registered. Choose an another one.`);
        }

      } else {
        try {
          const user = await RESTful.GET(`/user/${alias}`);
          window.sessionStorage.setItem("EAGameJamAccount", user.name);
        } catch (e) {
          window.sessionStorage.setItem("EAGameJamLoginError", 'No matched record. Sign up here.');
        }
      }
    })();
  }

  render() {
    const { signup } = this.state;

    const content = (signup) ? (
      <form id="floating-form" className="Login-form" onSubmit={this.handleSubmit}>
        <Button flat primary swapTheming
          iconBefore={true}
          iconChildren="assignment"
          id="sign-up-button"
          onClick={() => this.setState({ ...this.state, signup: false })}
        >
          Sign up?
        </Button>
        <TextField required
          id="floating-id"
          label="EA Account"
          type="email"
          placeholder="test@ea.com"
          className="username md-cell md-cell--bottom"
          onChange={id => this.setState({ ...this.state, id })}
        />
        <TextField required
          id="floating-name"
          label="Enter your Name"
          className="name md-cell md-cell--bottom"
          onChange={name => this.setState({ ...this.state, name })}
        />
        <Button flat primary
          id="floating-submit"
          className="login md-cell-center"
          type="submit"
        >
          Sign up
        </Button>
      </form>
    ) : (
        <form id="floating-form" className="Login-form" onSubmit={this.handleSubmit}>
          <Button flat primary
            iconBefore={true}
            iconChildren="assignment"
            id="sign-up-button"
            onClick={() => {
              this.setState({ ...this.state, signup: true })
            }}
          >
            Sign up?
       </Button>
          <TextField required
            id="floating-id"
            label="EA Account"
            type="email"
            placeholder="test@ea.com"
            className="username md-cell md-cell--bottom"
            onChange={id => this.setState({ ...this.state, id })}
          />
          <Button flat primary
            id="floating-submit"
            className="login md-cell-center"
            type="submit"
          >
            Log in
        </Button>
        </form>
      );

    const loginError = window.sessionStorage.getItem("EAGameJamLoginError");
    window.sessionStorage.setItem("EAGameJamLoginError", '');

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