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
import { logout, getName, getChipName } from "./user";

export default class extends Component {
  render() {
    const { visible, reload } = this.props;

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
              label={getName()}
              iconBefore
              component="li"
              className="SideMenu-account md-cell md-cell--12"
            >
              <Avatar random suffix={getName()}>
                {getChipName()}
              </Avatar>
            </IconSeparator>
            <Divider />
            <p>Welcome, {getName()}.</p>
            <p>
              You have <strong>3</strong> votes left.
            </p>
            <Button
              flat
              primary
              type="submit"
              onClick={() => {
                (async () => {
                  await logout();
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
