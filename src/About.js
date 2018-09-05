import "./About.css";

import React from 'react';
import { Media } from 'react-md';

export default () => (
  <div className="About">
    <Media forceAspect={false} style={({ paddingBottom: "20%" })}>
      <img src="topbar.png" alt="EA GameJam 2018" />
    </Media>
    <p>
      Hello EAV,
    </p>
    <p>
      Show off Your Skills at the 3rd Annual EA Vancouver Game Jam!
    </p>
    <p>
      Do you have an exciting concept for a new IP? How about an innovative idea for one of our existing franchises? Now's the time to show us!
    </p>
    <h3>Overview</h3>
    <p>
      Game Jam is an opportunity for EAV employees to flex their creative muscles by working either individually or as part of a team to pitch new intellectual property, new game features or new technology/workflow/process.
      Game Jam participants will show off their creations and ideas at a science fair style presentation where all EAV employees will have a chance to vote for their favourite ideas.
      The finalists will have just over two weeks to hone their initial ideas and pitches before presenting to a judging panel at the Final event that will be held late November.
    </p>
    <h3>Game Jam 2017 Categories:</h3>
    <ol>
      <li><p>New Intellectual Property (New IP)</p></li>
      <li><p>New Game Features Or Improved Technology, Workflows, Process New Game Features</p></li>
    </ol>
    <blockquote>
      <p>
        * We also encourage participants to think of features that could compliment the new Player Network initiatives that are building momentum throughout EA.
        Pillars of the Player Network are as follows; Networked Social, Progression Support, Personalized Content, Identify the Player, Access Integration
      </p>
    </blockquote>
    <h3>Key Dates:</h3>
    <dl>
      <dt>October 12th</dt>
      <dd>Information Kick off Session</dd>
      <dt>November 1st</dt>
      <dd>Kick off Meeting for all registered Game Jammers</dd>
      <dt>November 2nd, 3rd</dt>
      <dd>Teamswork on their ideas and projects</dd>
      <dt>November 6th</dt>
      <dd>Teams setup their presentations</dd>
      <dt>November 7th</dt>
      <dd>Studio-wide "science fair" event</dd>
      <dt>November 30th</dt>
      <dd>Final Presentationsto Judges</dd>
    </dl>
    <h3>Manager Approval</h3>
    <p>
      All employees must have approval from their Direct manager in order to participate in this event before completing their registration via the online invite.
    </p>
    <p>
      Registration closes Friday, October 20th.
    </p>
    <p>
      Please reach out to the Game Jam Leadership team if you have any questions or concerns.
    </p>
    <p>
      Cheers,<br />
      The Game Jam Leadership Team
    </p>
  </div>
);