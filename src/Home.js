import React, { Component } from 'react';
import { NavigationDrawer } from 'react-md';
import ProjectCard from './ProjectCard';
import './Home.css';

export default class extends Component {
  render() {
    const cards = Array.from(new Array(4), (_, index) => <ProjectCard />);
    return (
      <NavigationDrawer
        drawerTitle={`Welcome, ${this.props.account}`}
        toolbarTitle="EA GameJam 2018"
      >
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">EA Game Projects</h1>
          </header>
          <div className="App-intro">
            {cards}
          </div>
        </div>
      </NavigationDrawer>
    );
  }
}
