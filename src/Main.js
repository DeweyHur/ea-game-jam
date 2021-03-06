import "./Home.css";

import React, { Component } from "react";
import {
  Badge,
  ListItem,
  FontIcon,
  NavigationDrawer,
  Button
} from "react-md";
import CSSTransitionGroup from "react-transition-group/CSSTransition";
import { Link, Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Notice from "./Notice";
import Dashboard from "./Dashboard";
import SideMenu from "./SideMenu";
import Guestbook from "./Guestbook";
import { getMyRemainingVoteCount, getMyAlias } from "./user";
import { getAvatar } from "./util";

const Navs = [
  { to: "/about", label: "About", icon: "info" },
  { to: "/notice", label: "Notice", icon: "assignment" },
  { to: "/home", label: "EA Game Jam Candidates", icon: "subscriptions" },
  { to: "/dashboard", label: "Dashboard", icon: "bar_chart" },
  { to: "/guestbook", label: "Guestbook", icon: "question_answer" }
];

export default class extends Component {
  state = { visible: false, nav: Navs[0] };

  componentDidMount() {
    this.badge = document.getElementById("account-badge-toggle");
  }

  componentDidUpdate(prevProps, prevState) {
    const { visible } = this.state;
    if (visible === prevState.visible) {
      return;
    }

    window[`${visible ? "add" : "remove"}EventListener`](
      "click",
      this.handleOutsideClick
    );
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleOutsideClick);
  }

  handleOutsideClick = e => {
    if (!this.badge || !this.badge.contains(e.target)) {
      this.setState({ ...this.state, visible: false });
    }
  };

  render() {
    const { reload } = this.props;
    const { nav, visible } = this.state;

    return (
      <div className="Home" id="drawer-dialog">
        <NavigationDrawer
          navStyle={{ textAlign: "left" }}
          navItems={Navs.map(nav => {
            const { to, label, icon } = nav;
            return (
              <Route path={to}>
                {({ match }) => (
                  <ListItem
                    component={Link}
                    active={!!match}
                    to={to}
                    primaryText={label}
                    leftIcon={<FontIcon>{icon}</FontIcon>}
                    onClick={() => this.setState({ ...this.state, nav })}
                  />
                )}
              </Route>
            );
          })}
          toolbarActions={
            <Badge
              secondary
              aria-haspopup
              badgeContent={getMyRemainingVoteCount()}
              id="account-badge-toggle"
            >
              <Button
                onClick={() =>
                  this.setState({ ...this.state, visible: !visible })
                }
              >
                {getAvatar(getMyAlias())}
              </Button>
              <SideMenu
                visible={visible}
                reload={reload}
                className="badges__notifications"
              />
            </Badge>
          }
          drawerTitle={`EA Game Jam Online`}
          mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
          tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT}
          desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT}
          toolbarTitle={nav.label}
          contentId="main-content"
          contentClassName="md-grid"
        >
          <CSSTransitionGroup
            component="div"
            transitionName="md-cross-fade"
            transitionEnterTimeout={300}
            transitionLeave={false}
            className="md-toolbar-relative md-grid"
          >
            <Switch key={nav.to}>
              <Route path="/about" component={About} />
              <Route path="/notice" component={Notice} />
              <Route path="/home" component={Home} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/guestbook" component={Guestbook} />
              <Redirect from="/" exact to="/about" />
            </Switch>
          </CSSTransitionGroup>
        </NavigationDrawer>
      </div>
    );
  }
}
