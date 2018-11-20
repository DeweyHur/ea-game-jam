import "./Home.css";

import _ from "lodash";
import React, { Component } from "react";
import ProjectCard from "./ProjectCard";
import { Button, Card, CardText, DialogContainer, Avatar, Chip, Autocomplete, Media } from "react-md";
import http from "./fetch";
import TopBar from "./TopBar";
import { canVote, getMyRemainingVoteCount, invalidateVotes } from "./user";

export default class extends Component {
  state = { selectedStates: [], filteredStates: [] };

  setNextState = selectedStates => {
    this.setState({
      ...this.state,
      selectedStates,
      filteredStates: _.without(this.state.chips, selectedStates)
    });
  };

  constructor () {
    super ();
    this.hideProjectInfo = this.hideProjectInfo.bind(this);
  }

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

  hideProjectInfo() {
    this.setState({ ...this.state, projectInfo: undefined });
  }

  async voteUp(projectInfo) {
    const { _id } = projectInfo;
    await http.PUT(`/project/${_id}/vote`);
    invalidateVotes();
    this.hideProjectInfo();
  }

  render() {
    const { selectedStates, filteredStates, projects, projectInfo } = this.state;

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
        .map(work => (
          <ProjectCard work={work} showDescription={() => this.setState({ ...this.state, projectInfo: work })} />
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
      
      let canVoteHere = false;
      let infoPopup = (<div />);
      if (projectInfo) {
        const {
          title, authors, category, description, _id,
          image = `https://api.thecatapi.com/v1/images/search?category_ids=${Math.floor(Math.random() * 6) + 1}&format=src&mime_types=image/gif&api_key=71160d68-1a0e-4b9f-971f-ca1020ba4bce`
        } = projectInfo;
        canVoteHere = canVote(_id);
        let askToVote = canVoteHere ? (
          <Card>
            <CardText>
              <p>Do you want to vote to <strong>{title}</strong>? {getMyRemainingVoteCount()} tickets left.</p>
            </CardText>
          </Card>
        ) : (
          <Card>
            <CardText>
              <p>You already vote here.</p>
              </CardText>
          </Card>
        );
        infoPopup = (
          <Card>
            <CardText>
              <Media>
                <img src={image} alt={title} />
              </Media>
              <h2>{title}</h2>
              <address>by {authors.join(", ")}</address>
              <h3>Category</h3>
              <p>{category}</p>
              <h3>Description</h3>
              <div dangerouslySetInnerHTML={{ __html: description }}></div>
              { askToVote }
            </CardText>
          </Card>
        );
      }

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
          <DialogContainer
            id="projectInfo"
            visible={!!projectInfo}
            onHide={this.hideProjectInfo}
            initialFocus="projectInfo"
            actions={canVoteHere ? [
              <Button flat onClick={this.hideProjectInfo}>
                Not Now
              </Button>,
              <Button flat primary onClick={() => (async () => this.voteUp(projectInfo))()}>
                Vote up !!
              </Button>
            ] : []}            
          >
            {infoPopup}
          </DialogContainer>
        </div>
      );
    }
  }
}
