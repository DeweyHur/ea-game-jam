import React, { Component } from 'react';
import { Toolbar, Button, Drawer } from 'react-md';
import ProjectCard from './ProjectCard';
import SideMenu from './SideMenu';

import './Home.css';

export default class extends Component {
  state = { visible: false }

  render() {
    const cards = Array.from(new Array(4), (_, index) => <ProjectCard />);
    const { account } = this.props;
    return (
      <div className="Home" id="drawer-dialog">
        <Toolbar colored
          nav={
            <Button icon
              onClick={() => this.setState({ visible: true })}>
              menu
            </Button>
          }
          title="EA GameJam Candidates"
        />
        <Drawer 
          type={Drawer.DrawerTypes.TEMPORARY}
          visible={this.state.visible}
          onVisibilityChange={visible => this.setState({ visible })}
          header={<SideMenu account={account} />}
          renderNode={document.getElementById('drawer-dialog')}
        />
        <header className="Home-header">
          <h1 className="Home-title">EA Game Projects</h1>
        </header>
        <div className="Home-intro">
          {cards}
        </div>
      </div>
    );
  }
}
