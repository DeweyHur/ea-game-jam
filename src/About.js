import "./About.css";

import React from "react";
import { Card, CardText, List, ListItem, FontIcon } from "react-md";
import TopBar from "./TopBar";

export default () => (
  <div className="About">
    <TopBar />
    <Card className="AboutCard">
      <CardText>
        <h3>About us</h3>
        <p>Welcome to <strong>EA Game Jam Online</strong>!</p>
        <p>You can traverse all the project via web as well as giving like, leaving comments, and sharing dashboard having "How many likes each project has?" or "Who is hyped." during Science Fair. My desk will expose the dashboard all the time.</p>
        <h4>Menu</h4>
        <p>Click <FontIcon key="menu">menu</FontIcon> on upper left of screen to start the adventure !</p>
        <dl>
          <dt>About</dt><dd>This page</dd>
          <dt>Notice</dt><dd>The announcements from EA Game Jam Leadership Commitee</dd>
          <dt>EA Game Jam Candidates</dt><dd>Traverse all the awesome projects!</dd>
          <dt>Dashboard</dt><dd>Check it out the statistic of EA Game Jam Projects</dd>
        </dl>
        <p>Share your feeling and feedback. Feel free to reach me out!</p>
        <List>
          <ListItem primaryText="duheo@ea.com" leftIcon={
            <FontIcon key="email">email</FontIcon>
          } />
        </List>
      </CardText>
    </Card>
  </div>
)