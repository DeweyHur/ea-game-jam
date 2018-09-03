import React, { Component } from 'react';
import { TextField, Button } from '../node_modules/react-md';

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
    window.sessionStorage.setItem("EAGameJamAccount", this.state.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField id="floating-id" label="EA Account" type="email" placeholder="test@ea.com" className="md-cell md-cell--bottom" onChange={this.handleChange} />
        <TextField id="floating-password" label="Enter your password" type="password" className="md-cell md-cell--bottom" />
        <Button className="md-cell-left" type="submit">Log in</Button>
      </form>
    );
  }
}