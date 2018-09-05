import "./ProjectCard.css";

import React, { Component } from 'react';
import { Card, CardTitle, CardText, Media, MediaOverlay, Button, CardActions, DialogContainer } from 'react-md';

export default class extends Component {
  state = { popupVisible: false }

  constructor() {
    super();
    this.hideConfirmPopup = this.hideConfirmPopup.bind(this);
  }

  hideConfirmPopup() {
    this.setState({ ...this.state, popupVisible: false })
  }

  render() {
    const { popupVisible } = this.state;
    const { work: { title, authors, category } } = this.props;

    return (
      <Card className="ProjectCard md-cell md-cell--6 md-cell--8-tablet">
        <Media>
          <img src="http://www.fifplay.com/img/public/fifa-mobile-tactics.jpg" alt="FIFA Tactics" />
          <MediaOverlay>
            <CardTitle title={title} subtitle={`by ${authors[0]} +${authors.length}`}>
              <Button className="md-cell--right" flat>{category}</Button>
            </CardTitle>
          </MediaOverlay>
        </Media>
        <CardActions expander>
          <Button className="md-cell-left" icon onClick={() => this.setState({ ...this.state, popupVisible: true })}>how_to_vote</Button>
        </CardActions>
        <CardText expandable>
          <h2>{title}</h2>
          <subtitle>by {authors.join(' ,')}</subtitle>
          <h3>Category</h3>
          <p>{category}</p>
          <h3>Description</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut eleifend odio.
      Vivamus quis quam eget augue facilisis laoreet. Aliquam egestas turpis pellentesque
      cursus porta. Vivamus nisl odio, maximus vel lacinia non, suscipit quis nibh. Sed et
      lacus tempor, interdum nisl ornare, feugiat arcu. Suspendisse aliquam malesuada dui,
      in dignissim velit maximus vitae. Cras ac mattis libero. Proin feugiat justo nec nisi
      sodales, et gravida augue faucibus. Maecenas quis porttitor nunc. Suspendisse congue
      ipsum arcu, id aliquam ante dignissim non. Donec maximus, sapien in faucibus molestie,
      eros nisi ornare neque, et vulputate augue velit vel ante. Phasellus rhoncus, elit
      cursus accumsan viverra, mi lectus dictum elit, non vehicula diam nunc non lectus.
      Sed elementum, risus eget fermentum accumsan, nunc ante commodo diam, eget pulvinar
      risus velit eu sapien. Nunc vitae pellentesque nisl.
                </p>
        </CardText>
        <DialogContainer
          id="confirmVote"
          visible={popupVisible}
          onHide={this.hideConfirmPopup}
          actions={[
            <Button flat onClick={this.hideConfirmPopup}>Not Now</Button>,
            <Button flat primary onClick={this.hideConfirmPopup}>Vote up !!</Button>
          ]}
        >
          <p>Do you want to vote <strong>{title}</strong> up?</p>
        </DialogContainer>
      </Card>
    );
  }
}