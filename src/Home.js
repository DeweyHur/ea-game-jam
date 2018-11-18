import "./Home.css";

import _ from "lodash";
import React, { Component } from "react";
import ProjectCard from "./ProjectCard";
import { Avatar, Chip, Autocomplete } from "react-md";
import http from "./fetch";
import TopBar from "./TopBar";

export default class extends Component {
  state = { selectedStates: [], filteredStates: [] };

  setNextState = selectedStates => {
    this.setState({
      ...this.state,
      selectedStates,
      filteredStates: _.without(this.state.chips, selectedStates)
    });
  };

  async componentWillMount() {
    this.reload();
  }

  async reload() {
    try {
      const projects = await http.GET("/project");
      console.dir(projects);
      const chips = [
        ..._.flatMap(projects, work => [
          {
            category: "T",
            label: `Title: ${work.title}`,
            filter: item => item.title === work.title
          },
          ...work.authors.map(author => ({
            category: "A",
            label: `Author: ${author}`,
            filter: item => _.includes(item.authors, author)
          }))
        ]),
        ..._.keys(_.groupBy(projects, "category")).map(type => ({
          category: "C",
          label: `Category: ${type}`,
          filter: item => item.type === type
        }))
      ];
      this.setState({ ...this.state, projects, chips, filteredStates: chips });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const { selectedStates, filteredStates, projects } = this.state;

    if (projects === undefined) {
      return <div className="Home-intro">Loading...</div>;
    } else {
      const filtersByCategory = _.groupBy(selectedStates, "category");
      const cards = projects
        .filter(work =>
          _.values(filtersByCategory).every(filters =>
            filters.some(data => data.filter(work))
          )
        )
        .map((work, index) => (
          <ProjectCard work={work} />
        ));
      const chipItems = selectedStates.map(filter => (
        <Chip
          removable
          className="chip"
          key={filter.label}
          label={filter.label}
          onClick={() => this.setNextState(_.without(selectedStates, filter))}
          avatar={<Avatar>{filter.category}</Avatar>}
        />
      ));

      return (
        <div className="Home-intro">
          <TopBar />
          <div className="Home-filter">
            {chipItems}
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
          <div className="md-grid">{cards}</div>
        </div>
      );
    }
  }
}
