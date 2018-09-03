import React, { Component } from 'react';
import { Card, CardTitle, CardText, Media, MediaOverlay, Button, CardActions } from 'react-md';

export default class extends Component {
  render() {
    return (
      <Card className="md-block-centered">
        <Media>
          <img src="http://www.fifplay.com/img/public/fifa-mobile-tactics.jpg" alt="FIFA Tactics" />
          <MediaOverlay>
            <CardTitle title="FIFA Tactics" subtitle="by Dewey Hur">
              <Button className="md-cell--right" icon>favorite</Button>
            </CardTitle>
          </MediaOverlay>
        </Media>
        <CardActions expander>
          <Button className="md-cell-left" icon>how_to_vote</Button>
          <Button className="md-cell-left" icon>comment</Button>
        </CardActions>
        <CardText expandable>
          <h2>Description</h2>
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
      </Card>
    );
  }
}