import React, { Component } from 'react';
import { Toolbar, Button, Drawer, ListItem, FontIcon } from 'react-md';
import CSSTransitionGroup from 'react-transition-group/CSSTransition';
import { Link, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import Home from './Home';
import About from './About';
import SideMenu from './SideMenu';

import './Home.css';

const Navs = [
  { to: "/about", label: "About", icon: "info" },
  { to: "/home", label: "Participants", icon: "home" },
]

class Main extends Component {
  state = { visible: false, nav: Navs[0] }

  render() {
    const { account, location } = this.props;
    const { nav } = this.state;
    return (
      <div className="Home" id="drawer-dialog">
        <Toolbar colored
          nav={
            <Button icon
              onClick={() => this.setState({ ...this.state, visible: true })}>
              menu
        </Button>
          }
          title={nav.label}
        />
        <CSSTransitionGroup
          component="div"
          transitionName="md-cross-fade"
          transitionEnterTimeout={300}
          transitionLeave={false}
          className="md-toolbar-relative md-grid"
        >
          <Switch key={location.pathname}>
            <Route exact path="/" component={About} />
            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />
          </Switch>
        </CSSTransitionGroup>
        <Drawer
          type={Drawer.DrawerTypes.TEMPORARY}
          visible={this.state.visible}
          onVisibilityChange={visible => this.setState({ ...this.state, visible })}
          header={<SideMenu account={account} />}
          renderNode={document.getElementById('drawer-dialog')}
          navItems={Navs.map(nav => {
            const { to, label, icon } = nav;
            return (
              <Route path={to}>
                {({ match }) =>
                  <ListItem
                    component={Link}
                    active={!!match}
                    to={to}
                    primaryText={label}
                    leftIcon={<FontIcon>{icon}</FontIcon>}
                    onClick={() => this.setState({ ...this.state, nav })}
                  />}
              </Route>
            );
          })}
        />
      </div>
    );
  }
}

export default withRouter(Main);