import "./SideMenu.css";

import React, { Component } from "react";
import {
  Collapse,
  Dialog,
  Button,
  Avatar,
  IconSeparator,
  Divider
} from "react-md";
import http from "./fetch";

export default class extends Component {
  render() {
    const { user, visible, reload } = this.props;

    return (
      <Collapse collapsed={!visible}>
        <Dialog
          id="account-preview"
          autopadContent={false}
          className="SideMenu badges__notifications__dialog"
          contentClassName="md-label badges__notifications__dialog__content"
        >
          <form>
            <IconSeparator
              label={user.name}
              iconBefore
              component="li"
              className="SideMenu-account md-cell md-cell--12"
            >
              <Avatar random suffix={user.name}>
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
            </IconSeparator>
            <Divider />
            <p>Welcome, {user.name}.</p>
            <p>
              You have <strong>3</strong> votes left.
            </p>
            <Button
              flat
              primary
              type="submit"
              onClick={() => {
                (async () => {
                  window.sessionStorage.removeItem("EAGameJamUser");
                  await http.POST("/user/logout");
                  reload();
                })();
              }}
            >
              Log Out
            </Button>
          </form>
        </Dialog>
      </Collapse>
    );
  }
}
