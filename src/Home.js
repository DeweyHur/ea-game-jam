import './Home.css';

import _ from 'lodash';
import React, { Component } from 'react';
import ProjectCard from './ProjectCard';
import { Avatar, Chip, Autocomplete } from 'react-md';

const WorksData = [
  { title: 'Dragon Age: Castles', authors: ['Armando Antonnioni', 'Jethro Aquino', 'Ryan Ackert'], category: 'New IP' },
  { title: 'Hippo Tutu', authors: ['Jayme Kielo', 'Steven Gosling'], category: 'New IP' },
  { title: 'Pawstruck', authors: ['Tim Wang', 'Alvin Kwok', 'Alex Kolakowsk', 'Andrea Ma'], category: 'New IP' },
  { title: 'Patch 11', authors: ['Daniel Forero', 'Cory Bailey', 'Gavin Card', 'Ross Baker', 'Holly Babaran'], category: 'New Feature' },
  { title: 'REAplay', authors: ['Krista Parham', 'Will Wang', 'Dave Mcansh'], category: 'New Feature' },
  { title: 'bEA', authors: ['Euphemia Wong', 'Sean Brouwer'], category: 'New Feature' },
  { title: 'Star Wars: Gloom Walkers', authors: ['Jeremiah de Groot'], category: 'New Feature' },
  { title: 'HUT Live Draft', authors: ['Josh Threlfall', 'Christopher Anderson', 'Aleksander Lebada', 'Craig Penner'], category: 'New Feature' },
  { title: 'Star Wars: Underworld', authors: ['Alon Mizrahi', 'Brian Vidovic'], category: 'New Feature' },
  { title: 'Birdseye', authors: ['Leo Teng', 'Patrick C Lawrence', 'Stanislav Folov', 'Sohrab Zabetian'], category: 'New Feature' },
];

const ChipsData = [
  ..._.flatMap(WorksData, work => [
    { category: 'T', label: `Title: ${work.title}`, filter: item => item.title === work.title },
    ...work.authors.map(author => ({ category: 'A', label: `Author: ${author}`, filter: item => _.includes(item.authors, author) }))
  ]),
  ..._.keys(_.groupBy(WorksData, 'category')).map(type => ({ category: 'C', label: `Category: ${type}`, filter: item => item.type === type }))
];

export default class extends Component {
  state = { selectedStates: [], filteredStates: ChipsData };

  setNextState = (selectedStates) => {
    this.setState({
      ...this.state,
      selectedStates,
      filteredStates: _.without(ChipsData, selectedStates)
    });
  }

  render() {
    const { selectedStates, filteredStates } = this.state;

    const filtersByCategory = _.groupBy(selectedStates, 'category');
    const cards = WorksData
      .filter(work => _.values(filtersByCategory).every(filters => filters.some(data => data.filter(work))))
      .map((work, index) => <ProjectCard 
        image={`https://api.thecatapi.com/v1/images/search?category_ids=${Math.floor(Math.random() * 6) + 1}&format=src&mime_types=image/gif&api_key=71160d68-1a0e-4b9f-971f-ca1020ba4bce`} 
        work={work} 
      />);
    const chips = selectedStates.map(filter => <Chip removable
      className="chip"
      key={filter.label}
      label={filter.label}
      onClick={() => this.setNextState(_.without(selectedStates, filter))}
      avatar={<Avatar>{filter.category}</Avatar>}
    />);

    return (
      <div className="Home-intro">
        <div className="Home-filter">
          {chips}
          <Autocomplete
            id="states-autocomplete"
            label="Type Title, Author, or Category to search"
            data={filteredStates}
            dataLabel="label"
            dataValue="label"
            onAutocomplete={(_title, index, matches) => {
              const state = matches[index];
              const newStates = _.uniq([...selectedStates, state]);
              this.setNextState(newStates);
            }}
            clearOnAutocomplete
            deleteKeys="label"
          />
        </div>
        <div className="md-grid">
          {cards}
        </div>
      </div>
    );
  }
}
