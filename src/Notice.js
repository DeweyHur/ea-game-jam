import "./Notice.css";

import React from 'react';
import { Card, CardText } from 'react-md';
import TopBar from "./TopBar";

export default () => (
  <div className="Notice">
    <Card>
      <TopBar />
      <CardText>
        <h3>GAME JAM 2018 KICK-OFF IS HERE!</h3>
        <p>
          It's time! You are invited to the official Game Jam 2018 Kick-off!
      </p>
        <p>
          Come on down to the Bigger Picture at 3PM on Wednesday, November 14th to officially kick off the 2018 Game Jam at EAV! The Game Jam Leadership team will walk all participants through science fair logistics, table assignments, tips and tricks, judging criteria and much more! We will also have Bryan Hayes, UFC Creative Director, presenting EA Player Segmentation research which will assist you in finding a player motivation for your creations!
      </p>
        <p>
          <strong>There will also be Official Game Jam 2018 SWAG!!!</strong>
        </p>
        <p>
          If you have any questions, please email us at <a href="mailto:GameJamLeadership@ea.com">GameJamLeadership@ea.com</a> or leave a question in the Slack channel.
      </p>
        <h3>Game Jam 2018 Dates:</h3>
        <dl>
          <dt>November 14th</dt>
          <dd>Kick off Meeting for all registered Game Jammers</dd>
          <dt>November 15-16th</dt>
          <dd>Teams work on their ideas and projects</dd>
          <dt>November 19th</dt>
          <dd>Teams set up their presentations</dd>
          <dt>November 20th</dt>
          <dd>Studio-wide "science fair" event</dd>
          <dt>December 5th</dt>
          <dd>Final Presentations to Judges</dd>
        </dl>
        <p>
          Thanks,<br />
          The Game Jam Leadership Team
      </p>
      </CardText>
    </Card>
  </div>
);