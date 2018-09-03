import React, { Component } from 'react';
import { NavigationDrawer } from 'react-md';
import ProjectCard from './ProjectCard';
import './App.css';

class App extends Component {
  render() {
    const cards = Array.from(new Array(4), (_, index) => <ProjectCard />);
    return (
      <NavigationDrawer
        drawerTitle="react-md with CRA"
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

export default App;

