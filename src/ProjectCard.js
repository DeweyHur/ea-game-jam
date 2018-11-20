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
  TextField,
  List,
  ListItem
} from "react-md";
import { getMyAlias, canVote } from "./user";
import http from "./fetch";
import { getAvatar } from "./util";

export default class extends Component {
  constructor(props) {
    super();
    this.state = { commentVisible: false, comments: [], work: props.work };
  }

  componentWillReceiveProps(props) {
    this.setState({ commentVisible: false, work: props.work });
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

  async deleteComment(commentid) {
    const { work: { _id } } = this.state;
    const comments = await http.DELETE(`/project/${_id}/comment/${commentid}`);
    this.setState({ ...this.state, commentVisible: true, comments });
  }

  async putComment() {
    const { work: { _id }, comment } = this.state;
    const comments = await http.PUT(`/project/${_id}/comment`, { text: comment });    
    this.setState({ ...this.state, commentVisible: true, comments, comment: "" });
  }

  render() {
    const { showDescription, showLikes } = this.props;
    const {
      comments = [],
      comment,
      commentVisible,
      work: {
        _id, title, authors, category, likes,
        image = `https://api.thecatapi.com/v1/images/search?category_ids=${Math.floor(Math.random() * 6) + 1}&format=src&mime_types=image/gif&api_key=71160d68-1a0e-4b9f-971f-ca1020ba4bce`
      }
    } = this.state;

    const likesStatus = _.isEmpty(likes) ? (
      <div />
    ) : (
        <Button className="likeStatus" onClick={showLikes}>
          Liked by {likes[0].name} {likes.length > 1 ? `and ${likes.length - 1} others` : ""}
        </Button>
      );

    const likedByMe = likes.some(like => like.alias === getMyAlias());
    const commentsArea = (commentVisible) ? (
      <List className="comments">
        {comments.map((comment, index) => {
          const deleteButton = (getMyAlias() === comment.name) ? (
            <Button icon onClick={() => (async () => this.deleteComment(comment._id))()}>delete_forever</Button>
          ) : <div />;
          return (
            <ListItem key={index} leftAvatar={getAvatar(comment.alias)} primaryText={comment.name} secondaryText={comment.text} threeLines>
              {deleteButton}
            </ListItem>
          );
        })}
      </List>
    ) : (<div />);

    return (
      <Card
        className="ProjectCard md-cell md-cell--6 md-cell--8-tablet"
        key={_id}
      >
        <Media>
          <img src={image} alt={title} />
          <MediaOverlay onClick={showDescription}>
            <CardTitle
              title={title}
              subtitle={`by ${authors[0]} ${(authors.length > 1) ? `+${authors.length - 1}` : ""}`}
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
            primary={commentVisible}
            iconBefore={true}
            iconChildren="comment"
            onClick={() => (async () => this.toggleComments())()}
          >
            {(commentVisible) ? "Hide comments" : "Load comments"}
          </Button>
          <Button
            className="md-cell--right"
            disabled={!canVote(_id)}
            iconBefore={true}
            iconChildren="how_to_vote"
            onClick={showDescription}
          >
            Vote
          </Button>
        </CardActions>
        { commentsArea }
        <CardText>
          <TextField id="leaveComment" label="Leave your comment"
            onChange={comment => this.setState({ ...this.state, comment })}
            value={comment}
            inlineIndicator={
              <Button icon className="text-fields__inline-btn" onClick={() => (async () => this.putComment())()}>send</Button>
            }>

          </TextField>
        </CardText>
      </Card>
    );
  }
}
