import "./ProjectCard.css";

import _ from "lodash";
import React, { Component } from "react";
import {
  Card,
  CardTitle,
  CardText,
  Media,
  MediaOverlay,
  Button,
  CardActions,
  DialogContainer,
  TextField,
  List,
  ListItem,
  Avatar
} from "react-md";
import { getMyAlias } from "./user";
import http from "./fetch";

export default class extends Component {
  constructor(props) {
    super();
    this.state = { voteVisible: false, infoVisible: false, commentVisible: false, comments: [], work: props.work };
  }

  componentWillReceiveProps(props) {
    this.setState({ voteVisible: false, infoVisible: false, commentVisible: false, work: props.work });
  }

  async toggleLike() {
    const {
      work: { _id, likes }
    } = this.state;
    if (likes.indexOf(getMyAlias()) === -1) {
      const work = await http.PUT(`/project/${_id}/like`);
      this.setState({ work });
    } else {
      const work = await http.DELETE(`/project/${_id}/like`);
      this.setState({ work });
    }
  }

  async toggleComments() {
    const { work: { _id }, commentVisible } = this.state;
    if (!commentVisible) {
      const comments = await http.GET(`/project/${_id}/comment`);
      this.setState({ ...this.state, comments, commentVisible: true });
    } else {
      this.setState({ ...this.state, commentVisible: false });
    }
  }

  async putComment() {
    const { work: { _id }, comment } = this.state;
    const comments = await http.PUT(`/project/${_id}/comment`, { text: comment });
    this.setState({ ...this.state, comments });
  }

  render() {
    const {
      voteVisible,
      infoVisible,
      commentVisible,
      comments = [],
      work: {
        _id, title, authors, category, likes, description,
        image = `https://api.thecatapi.com/v1/images/search?category_ids=${Math.floor(Math.random() * 6) + 1}&format=src&mime_types=image/gif&api_key=71160d68-1a0e-4b9f-971f-ca1020ba4bce`
      }
    } = this.state;

    const likesStatus = _.isEmpty(likes) ? (
      <div />
    ) : (
        <Button className="likeStatus">
          Liked by {likes[0]} {likes.length > 1 ? `and ${likes.length - 1} others` : ""}
        </Button>
      );

    const likedByMe = likes.indexOf(getMyAlias()) !== -1;

    return (
      <Card
        className="ProjectCard md-cell md-cell--6 md-cell--8-tablet"
        key={_id}
      >
        <Media>
          <img src={image} alt={title} />
          <MediaOverlay onClick={() => this.setState({ ...this.state, infoVisible: true })}>
            <CardTitle
              title={title}
              subtitle={`by ${authors[0]} +${authors.length}`}
            >
              <Button className="md-cell--right" flat>
                {category}
              </Button>
            </CardTitle>
          </MediaOverlay>
        </Media>
        {likesStatus}
        <CardActions>
          <Button
            className="md-cell--left"
            secondary={likedByMe}
            iconBefore={true}
            iconChildren={likedByMe ? "favorite" : "favorite_border"}
            onClick={() => (async () => this.toggleLike())()}
          >
            Like
          </Button>
          <Button
            className="md-cell--left"
            iconBefore={true}
            iconChildren="comment"
            onClick={() => (async () => this.toggleComments())()}
          >
            Comments
          </Button>
          <Button
            className="md-cell--right"
            iconBefore={true}
            iconChildren="how_to_vote"
            onClick={() => this.setState({ ...this.state, voteVisible: true })}
          >
            Vote
          </Button>
        </CardActions>
        <List className="comments">
          {comments.map((comment, index) => (
            <ListItem key={index} leftAvatar={
              <Avatar>{comment.name.charAt(0).toUpperCase()}</Avatar>
            } primaryText={comment.name} secondaryText={comment.text} threeLines>
              <Button icon>favorite_border</Button>
            </ListItem>
          ))}
        </List>
        <CardText>
          <TextField id="leaveComment" label="Leave your comment"
            onChange={comment => this.setState({ ...this.state, comment })}
            inlineIndicator={
              <Button icon className="text-fields__inline-btn" onClick={() => (async () => this.putComment())()}>send</Button>
            }>

          </TextField>
        </CardText>
        <DialogContainer
          id="projectInfo"
          visible={infoVisible}
          onHide={() => this.setState({ ...this.state, infoVisible: false })}
        >
          <h2>{title}</h2>
          <subtitle>by {authors.join(" ,")}</subtitle>
          <h3>Category</h3>
          <p>{category}</p>
          <h3>Description</h3>
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </DialogContainer>
        <DialogContainer
          id="confirmVote"
          visible={voteVisible}
          onHide={() => this.setState({ ...this.state, voteVisible: false })}
          actions={[
            <Button flat onClick={this.hideConfirmPopup}>
              Not Now
            </Button>,
            <Button flat primary onClick={this.hideConfirmPopup}>
              Vote up !!
            </Button>
          ]}
        >
          <p>
            Do you want to vote <strong>{title}</strong> up?
          </p>
        </DialogContainer>
      </Card>
    );
  }
}
