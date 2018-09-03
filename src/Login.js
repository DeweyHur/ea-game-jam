import React, { Component } from 'react';
import { TextField, Button } from 'react-md';
import './Login.css';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(value) {
    this.setState({ value });
  }

  handleSubmit(event) {
    window.sessionStorage.setItem("EAGameJamAccount", this.state.value.split('@')[0]);
  }

  render() {
    return (
      <div className="Login">
        <h1 className="Login-header">EA GameJam 2018</h1>
        <form onSubmit={this.handleSubmit}>
          <TextField required
            id="floating-id"
            label="EA Account"
            type="email"
            placeholder="test@ea.com"
            className="username md-cell md-cell--bottom"            
            onChange={this.handleChange}
          />
          <TextField required
            id="floating-password"
            label="Enter your password"
            type="password"
            className="password md-cell md-cell--bottom"
          />
          <Button flat primary
            className="md-cell-center"
            type="submit"
          >
            Log in
          </Button>
        </form>
      </div>
    );
  }
}