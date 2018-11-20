import React, { Component } from "react";
import { CardText, Card, TextField, List, ListItem, Button } from "react-md";
import http from "./fetch";
import { getMyAlias } from './user';
import { getAvatar } from "./util";

const _id = "5befb2d61c9d440000862b8f";

export default class extends Component {
  state = { comments: [] }

  async deleteComment(commentid) {
    const comments = await http.DELETE(`/project/${_id}/comment/${commentid}`);
    this.setState({ ...this.state, commentVisible: true, comments });
  }

  async putComment() {
    const { comment } = this.state;
    const comments = await http.PUT(`/project/${_id}/comment`, { text: comment });
    this.setState({ ...this.state, commentVisible: true, comments, comment: "" });
  }

  componentDidMount() {
    (async () => {
      const comments = await http.GET(`/project/${_id}/comment`);
      this.setState({ ...this.state, comments });
    })();
  }

  render() {
    const { comment, comments } = this.state;
    return (
      <Card>
        <CardText>
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
        </CardText>
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