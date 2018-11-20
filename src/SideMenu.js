import "./SideMenu.css";

import React, { Component } from "react";
import {
  Collapse,
  Dialog,
  Button,
  IconSeparator,
  Divider
} from "react-md";
import { logout, getName, getMyVotes, getMyRemainingVoteCount, getMyAlias } from "./user";
import { getAvatar } from "./util";

export default class extends Component {
  state = { votes: [] };

  componentDidMount() {
    (async () => {
      const projects = await getMyVotes();
      this.setState({ ...this.state, votes: projects.map(vote => vote.title) });
    })();
  }

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
              {getAvatar(getMyAlias())}
            </IconSeparator>
            <Divider />
            <p>
              You have <strong>{getMyRemainingVoteCount()}</strong> votes left.
            </p>
            <Button
              flat
              primary
              type="submit"
              onClick={() => {
                (async () => {
                  try { await logout(); } catch (e) {}
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
