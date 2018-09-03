import React, { Component } from 'react';
import ProjectCard from './ProjectCard';

import './Home.css';

export default class extends Component {
  render() {
    const cards = Array.from(new Array(4), (_, index) => <ProjectCard />);
    return (
      <div className="Home-intro">
        {cards}
      </div>
    );
  }
}
