import "./SideMenu.css";

import React, { Component } from 'react';
import { Collapse, Dialog, Button, Avatar, IconSeparator, Divider } from 'react-md';

export default class extends Component {

  render() {
    const { account, visible } = this.props;    

    return (
      <Collapse collapsed={!visible}>
        <Dialog
          id="account-preview"
          autopadContent={false}
          className="SideMenu badges__notifications__dialog"
          contentClassName="md-label badges__notifications__dialog__content"
        >
          <form>
            <IconSeparator label={account} iconBefore component="li" className="SideMenu-account md-cell md-cell--12">
              <Avatar random suffix={account} >
                {account.charAt(0).toUpperCase()}
              </Avatar>
            </IconSeparator>
            <Divider />
            <p>
              Welcome, {this.props.account}.
            </p>
            <p>
              You have <strong>3</strong> votes left.
            </p>
            <Button flat primary
              type="submit"
              onClick={() => window.sessionStorage.removeItem("EAGameJamAccount")}
            >
              Log Out
            </Button>
          </form>
        </Dialog>
      </Collapse>
    );
  }
}