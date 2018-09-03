import "./SideMenu.css";

import React, { Component } from 'react';
import { Button, Avatar, IconSeparator } from 'react-md';

export default class extends Component {
  render() {
    const { account } = this.props;
    return (
      <form className="SideMenu">
        <IconSeparator label={account} iconBefore component="li" className="SideMenu-account md-cell md-cell--12">
          <Avatar random suffix={account} >
            {account.charAt(0).toUpperCase()}
          </Avatar>
        </IconSeparator>
        <hr />
        <p>
          Welcome, {this.props.account}
        </p>
        <Button flat primary 
          type="submit"
          onClick={() => window.sessionStorage.removeItem("EAGameJamAccount")}
        >
          Log Out
        </Button>
      </form>
    );
  }
}