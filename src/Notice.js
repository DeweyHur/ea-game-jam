import "./Notice.css";

import React from 'react';
import { Card, CardText, DatePicker, TimePicker } from 'react-md';
import TopBar from "./TopBar";

export default () => (
  <div className="Notice">
    <Card>
      <TopBar />
      <CardText>
        <h3>AN INVITATION TO THE 2018 EAV GAME JAM COMPETITION!</h3>
        <p>
          EA Studio teams are built on fearless creativity, intense innovation and deep collaboration. Tomorrow at the Indoor Court at recrEAte, come support your EAV colleagues in showing off their new experiences, ideas, and innovations at the 2018 Game Jam competition! Vote for your favourite ideas! Grab some awesome swag! Hang out and ask questions! Get inspired!
        </p>
        <h4>FAQ</h4>
        <dl>
          <dt>How does voting works?</dt>
          <dd>Vote for up to <strong>3</strong> of your favourite New IPs and <strong>3</strong> New Features/Tech/Workflow/Process submissions.</dd>
          <dt>Where do I vote?</dt>
          <dd>All voters must be present at the fair. Pick up your voting card at the Entrance to the fair and drop it off at the Exit, to redeem an official item of Game Jam 2018 Swag. Swag items available while quantities last.</dd>
          <dt>Am I eligible to vote?</dt>
          <dd>All EAV RFT, TFT, and Contractors may vote for their favourite Game Jam submissions.</dd>
        </dl>
        <ul>
          <li><strong>When:</strong> 11AM - 2PM</li>
          <li><string>Where: </string> Indoor Court @ recrEAte</li>
        </ul>
        <h4>Game Jam 2018 Dates:</h4>


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
        <table>
          <thead>
            <th>Date</th>
            <th>From</th>
            <th>To</th>
            <th>Session</th>
            <th>Where</th>
          </thead>
          <tbody>
            <tr>
              <td><DatePicker defaultValue={new Date(2018, 11, 20)} /></td>
              <td><TimePicker defaultValue={new Date(2018, 11, 20, 11)} /></td>
              <td><TimePicker defaultValue={new Date(2018, 11, 20, 14)} /></td>
              <td>EAV Game Jam Fair</td>
              <td>@ Indoor Court</td>
            </tr>
            <tr>
              <td><DatePicker defaultValue={new Date(2018, 12, 5)} /></td>
              <td><TimePicker defaultValue={new Date(2018, 12, 5, 12)} /></td>
              <td><TimePicker defaultValue={new Date(2018, 12, 5, 15)} /></td>
              <td>EAV Game Jam Finals</td>
              <td>@ The Bigger Picture</td>
            </tr>
          </tbody>
        </table>
        <p>
          Thanks,<br />
          The Game Jam Leadership Team
      </p>
      </CardText>
    </Card>
    <Card>
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
        <table>
          <thead>
            <th>When</th>
            <th>Session</th>
          </thead>
          <tbody>
            <tr>
              <td><DatePicker defaultValue={new Date(2018, 11, 14)} /></td>
              <td>Kick off Meeting for all registered Game Jammers</td>
            </tr>
            <tr>
              <td><DatePicker defaultValue={new Date(2018, 11, 15)} /><DatePicker defaultValue={new Date(2018, 11, 16)} /></td>
              <td>Teams work on their ideas and projects</td>
            </tr>
            <tr>
              <td><DatePicker defaultValue={new Date(2018, 11, 19)} /></td>
              <td>Teams set up their presentations</td>
            </tr>
            <tr>
              <td><DatePicker defaultValue={new Date(2018, 11, 20)} /></td>
              <td>Studio-wide "science fair" event</td>
            </tr>
            <tr>
              <td><DatePicker defaultValue={new Date(2018, 12, 5)} /></td>
              <td>Final Presentations to Judges</td>
            </tr>
          </tbody>
        </table>
        <p>
          Thanks,<br />
          The Game Jam Leadership Team
      </p>
      </CardText>
    </Card>
  </div >
);